from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from core.models import Product, Category, Vendor, CartOrder, CartOrderItems, ProductImages, ProductReview, Wishlist, Address
from taggit.models import Tag
from django.db.models import Avg
from core.forms import ProductReviewForm


# Create your views here.
def index(request):
    products = Product.objects.filter(product_status="published", featured=True).order_by("-id")
    context = {
        "products": products
    }
    return render(request, 'core/index.html', context)

def product_list_view(request):
    products = Product.objects.filter(product_status="published")
    context = {
        "products": products
    }
    return render(request, 'core/product-list.html', context)

def category_list_view(request):
    categories = Category.objects.all()

    context = {
        "categories" : categories
    }
    return render(request, 'core/category-list.html', context)

def category_product_list_view(request, cid):
    category = Category.objects.get(cid = cid)
    products = Product.objects.filter(product_status="published", category = category)

    context = {
        "category": category,
        "products": products
    }

    return render(request, 'core/category-product-list.html', context)

def vendor_list_view(request):
    vendors = Vendor.objects.all()
    context = {
        "vendors": vendors
    }
    return render(request, "core/vendor-list.html", context)

def vendor_detail_view(request, vid):
    vendor = Vendor.objects.get(vid = vid)
    products = Product.objects.filter(vendor = vendor, product_status="published")
    categories = Category.objects.all()
    context = {
        "vendor": vendor,
        "products": products,
        "categories": categories
    }
    return render(request, "core/vendor-detail.html", context )

def product_detail_view(request, pid):
    product = Product.objects.get(pid = pid)
    products = Product.objects.filter(category = product.category).exclude(pid = pid)
    reviews = ProductReview.objects.filter(product = product).order_by("-date")
    average_rating = ProductReview.objects.filter(product = product).aggregate(rating = Avg('rating'))
    p_images = product.p_images.all()

    #review form
    review_form = ProductReviewForm()

    context = {
        "product": product,
        "p_images": p_images,
        "reviews": reviews,
        "review_form": review_form,
        "average_rating": average_rating,
        "products": products
    }

    return render(request, 'core/product-detail.html', context)

def tag_list(request, tag_slug = None):
    products = Product.objects.filter(product_status = "published").order_by("-id")
    tag = None
    if tag_slug:
        tag = get_object_or_404(Tag, slug = tag_slug)
        products = products.filter(tags__in = [tag])

    context = {
        "products": products,
        "tag": tag
    }

    return render(request, "core/tag.html", context)

def ajax_add_review(request, pid):
    product = Product.objects.get(pid = pid)
    user = request.user

    review = ProductReview.objects.create(
        user = user,
        product = product,
        review = request.POST['review'],
        rating = request.POST['rating'],
    )

    context = {
        'user': user.username,
        'review': request.POST['review'],
        'rating': request.POST['rating'],
    }

    average_reviews = ProductReview.objects.filter(product = product).aggregate(rating = Avg("rating"))

    return JsonResponse(
            {
            'bool': True,
            'context': context,
            'average_reviews': average_reviews
        }
    )
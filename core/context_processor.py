from core.models import Product, Category, Vendor, CartOrder, CartOrderItems, ProductImages, ProductReview, Wishlist, Address

def default(request):
    categories = Category.objects.all()
    vendors = Vendor.objects.all()
    try:
        # address = Address.objects.get(user = request.user)
        pass
    except:
        address = None
    return {
        'categories': categories, 
        'vendors': vendors,
        # 'address': address,
    }


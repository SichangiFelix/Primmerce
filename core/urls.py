from django.urls import path
from core.views import index, category_list_view, product_list_view, category_product_list_view, vendor_list_view, vendor_detail_view, product_detail_view, tag_list, ajax_add_review, search_view

app_name = "core"

urlpatterns = [
    #Homepage
    path("", index, name='index'),
    path("products/", product_list_view, name='product-list'),
    path("product/<pid>", product_detail_view, name='product-detail'),

    #category
    path("category/", category_list_view, name='category-list'),
    path("category/<cid>/", category_product_list_view, name='category-product-list'),
    #vendor
    path("vendors/", vendor_list_view, name="vendor-list"),
    path("vendor/<vid>/", vendor_detail_view, name='vendor-detail'),
    #tags
    path("products/tag/<slug:tag_slug>/", tag_list, name="tags"),
    #Add review
    path("ajax-add-review/<pid>/", ajax_add_review, name="ajax-add-review"),

    #Search
    path("search/", search_view, name = "search")
    
]

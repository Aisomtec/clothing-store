from django.urls import path
from .views import product_list, product_detail_view

urlpatterns = [
    path("", product_list, name="product-list"),
    path("<slug:slug>/", product_detail_view, name="product-detail"),
]

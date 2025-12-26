from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# apps/products/views.py
@api_view(["GET"])
def product_list(request):
    category = request.GET.get("category")
    subcategory = request.GET.get("subcategory")

    products = Product.objects.filter(is_active=True)

    # 🟢 MAIN CATEGORY FILTER
    if category:
        products = products.filter(category__slug__iexact=category)

    # 🟣 SUBCATEGORY FILTER (for accessories / specific collections)
    if subcategory:
        products = products.filter(subcategory__slug__iexact=subcategory)

    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def product_detail_view(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductSerializer(product)
    return Response(serializer.data)
# apps/products/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name")
    subcategory = serializers.CharField(source="subcategory.name")
    image = serializers.SerializerMethodField()
    hover_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug",
            "price", "discount_price",
            "category", "subcategory",
            "image", "hover_image",
            "size", "fit", "colors",
            "in_stock", "is_active",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if obj.image else None

    def get_hover_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.hover_image.url) if obj.hover_image else None

from django.contrib import admin
from django.utils.html import format_html
from .models import Category, SubCategory, Product

# ---------------- CATEGORY ----------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


# ---------------- SUBCATEGORY ----------------
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "slug")
    search_fields = ("name", "category__name")
    prepopulated_fields = {"slug": ("name",)}
    list_filter = ("category",)


# ---------------- PRODUCT ----------------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "thumbnail",
        "name",
        "category",
        "subcategory",
        "price",
        "discount_price",
        "in_stock",
        "is_active",
    )

    list_filter = (
        "category",
        "subcategory",
        "in_stock",
        "is_active",
        "fit",
        "colors",
        "badge",
    )

    search_fields = ("name", "category__name", "subcategory__name")
    prepopulated_fields = {"slug": ("name",)}

    list_editable = ("in_stock", "is_active")

    fieldsets = (
        ("Basic Info", {
            "fields": ("name", "slug", "category", "subcategory", "badge")
        }),
        ("Pricing", {
            "fields": ("price", "discount_price")
        }),
        ("Product Options", {
            "fields": ("size", "fit", "colors")
        }),
        ("Media", {
            "fields": ("image", "hover_image")
        }),
        ("Status", {
            "fields": ("in_stock", "is_active")
        }),
    )

    def thumbnail(self, obj):
        if obj.image:
            return format_html("<img src={} width='50' style='border-radius:5px' />", obj.image.url)
        return "--"
    thumbnail.short_description = "Preview"

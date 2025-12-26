from django.db import models
from django.utils.text import slugify


# ---------------------------------
# CATEGORY
# ---------------------------------
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# ---------------------------------
# SUB CATEGORY
# ---------------------------------
class SubCategory(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="subcategories"
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField()

    class Meta:
        unique_together = ("category", "slug")
        verbose_name_plural = "Sub Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name} → {self.name}"


# ---------------------------------
# PRODUCT
# ---------------------------------

class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name="products")

    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # FILTER FIELDS (PLP)
    size = models.JSONField(default=list, blank=True)               # ["S","M","L"]
    fit = models.CharField(max_length=50, blank=True, null=True)    # Oversized, Regular...
    colors = models.JSONField(default=list, blank=True)             # ["Black","White","Red"]
    badge = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        choices=[("NEW","NEW"),("SALE","SALE")]
    )

    # IMAGES
    image = models.ImageField(upload_to="products/", null=True, blank=True)
    hover_image = models.ImageField(upload_to="products/", null=True, blank=True)

    # STATUS
    in_stock = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

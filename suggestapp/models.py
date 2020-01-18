from django.db import models

# Create your models here.
"""
Recipe: オレンジページ掲載のレシピ情報

    title: レシピ名
    url_id: URLのdetail部分のID ex)https://www.orangepage.net/recipes/detail_XXXXXX のXXXXXX部分
    step: 調理工程数
    calory: カロリー
    salt: 塩分量
"""
class Recipe(models.Model):
    title     = models.CharField(blank=False, null=False, max_length=100)
    url_id    = models.PositiveIntegerField(blank=False, null=False)
    step      = models.SmallIntegerField(blank=False, null=False)
    calory    = models.DecimalField(blank=False, null=False, max_digits=6, decimal_places=2)
    salt      = models.DecimalField(blank=False, null=False, max_digits=4, decimal_places=2)
    image_url = models.CharField(blank=True, null=True, max_length=500)

    def __str__(self):
        return self.title
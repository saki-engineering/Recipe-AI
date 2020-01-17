from django.shortcuts import render
from django.http.response import JsonResponse
import requests
from bs4 import BeautifulSoup as bs
from .models import Recipe

# Create your views here.
def index(request):
    return render(request, 'suggestapp/index.html')

def search(request, param):
    recipes = Recipe.objects.all()

    page_url = "https://www.orangepage.net/recipes/detail_" + str(recipes[0].url_id)
    res = requests.get(page_url, allow_redirects=False)
    bsObj = bs(res.text, "html.parser")

    image_url = bsObj.find("img", itemprop="image").get("src")

    ret = {"title": recipes[0].title, "url_id": recipes[0].url_id, "image_url": image_url}
    return JsonResponse(ret)

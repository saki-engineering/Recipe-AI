from django.shortcuts import render
from django.http.response import JsonResponse
import numpy as np
import random
import math
import requests
from bs4 import BeautifulSoup as bs
from .models import Recipe

# Create your views here.
def index(request):
    return render(request, 'suggestapp/index.html')

def search(request, param):
    #paramをnumpy配列に変換する
    user_ans = np.zeros(10)
    for i in reversed(range(10)):
        user_ans[i] = param % 10
        param = (param - user_ans[i])//10

    #正規化定数の定義
    NORMALIZE_STEP = 0.2
    NORMALIZE_CALORY = 0.2
    NORMALIZE_SALT = 0.2

    #ユーザー回答ベクトルとレシピベクトルの内積が一定値thresを超えたものの中からランダムにサジェスト献立を選定
    user_vector = np.array([user_ans[1] * NORMALIZE_STEP, user_ans[2] * NORMALIZE_CALORY, user_ans[3] * NORMALIZE_SALT], dtype=float)
    recipes = Recipe.objects.all()
    candicates = []
    thres = 0
    for recipe in recipes:
        menu_vector = np.array([recipe.step / 10, recipe.calory / 400, recipe.salt / 4], dtype=float)
        if np.dot(user_vector, menu_vector) >= thres:
            candicates.append(recipe)

    #recipes[index]がサジェストする献立
    index = math.ceil(random.random() * len(candicates))

    #画面に表示する料理画像のurlを取得
    page_url = "https://www.orangepage.net/recipes/detail_" + str(recipes[index].url_id)
    res = requests.get(page_url, allow_redirects=False)
    bsObj = bs(res.text, "html.parser")
    image_url = bsObj.find("img", itemprop="image").get("src")

    ret = {"title": recipes[index].title, "url_id": recipes[index].url_id, "image_url": image_url}
    return JsonResponse(ret)

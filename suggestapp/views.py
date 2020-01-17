from django.shortcuts import render
from django.http.response import JsonResponse
from .models import Recipe

# Create your views here.
def index(request):
    return render(request, 'suggestapp/index.html')

def search(request, param):
    recipes = Recipe.objects.all()
    ret = {"title": recipes[0].title, "url_id": recipes[0].url_id, "step": recipes[0].step, "calory": recipes[0].calory, "salt": recipes[0].salt}
    return JsonResponse(ret)

from django.urls import path
from . import views

app_name = 'suggestapp'
urlpatterns = [
    path('', views.index, name='index'),
    path('search/<int:param>/', views.search, name='search'),
]
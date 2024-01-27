from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("form", views.fill_in_form, name="fill_in_form"),
    path("search", views.search_result, name="search_result")
]
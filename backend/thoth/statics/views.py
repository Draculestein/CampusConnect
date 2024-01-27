from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'statics/index.html')

def fill_in_form(request):
    return render(request, 'statics/fill-in-sheet.html')

def search_result(request):
    return render(request, 'statics/result page 4.html')
from django.shortcuts import render
from .forms import UserRegisterForm
from django.views.decorators.csrf import csrf_protect

# Create your views here.
@csrf_protect
def register_view(request):

    if request.method == "Post":
        form = UserRegisterForm(request.POST or None)
        if form.is_valid():
            form.save()
        
    else:
        form = UserRegisterForm()

    context = {
        'form' : form,
    }
    return render(request, "userauths/sign-up.html", context)
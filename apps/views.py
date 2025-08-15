from django.contrib.auth.models import User
from django.views.generic import ListView, TemplateView, DetailView, CreateView

from apps.forms import UserRegisterForm
from apps.models import Product, Category

class IndexPage(ListView):
    queryset = Product.objects.all()
    template_name = 'crud/index.html'
    context_object_name = 'products'


    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['categories'] = Category.objects.all()
        return ctx


class ProductDetailPage(TemplateView):
    template_name = 'crud/product-detail.html'

class ProductsPage(ListView):
    queryset = Product.objects.all()
    template_name = 'crud/products.html'
    context_object_name = 'products'

class ProductsDetailPage(DetailView):
    model = Category
    template_name = 'crud/products.html'
    pk_url_kwarg = 'pk'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['products'] = Product.objects.filter(category_id=self.kwargs.get('pk'))
        return ctx


class CheckoutPage(ListView):
    queryset = Product.objects.all()
    template_name = 'crud/checkout.html'
    context_object_name = 'product'

class AboutPage(TemplateView):
    template_name = 'crud/about.html'


class RegisterView(CreateView):
    model = User
    form_class = UserRegisterForm
    template_name = 'crud/auth/register.html'

    def form_invalid(self, form):
        return super().form_invalid(form)

    def form_valid(self, form):
        return super().form_valid(form)





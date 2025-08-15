from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path

from apps.views import IndexPage, ProductDetailPage, ProductsPage, CheckoutPage, ProductsDetailPage, AboutPage, RegisterView

urlpatterns = [
    path('', IndexPage.as_view(), name='index-page'),
    path('product-detail', ProductDetailPage.as_view(), name='product-detail-page'),
    path('products', ProductsPage.as_view(), name='products-page'),
    path('chekout', CheckoutPage.as_view(), name='checkout-page'),
    path('products/<int:pk>', ProductsDetailPage.as_view(), name='category-detail-page'),
    path('about', AboutPage.as_view(), name='about-page'),

    path('login', LoginView.as_view(template_name='crud/auth/login.html', next_page='index-page', redirect_authenticated_user=True), name='login-page'),
    path('register', RegisterView.as_view(), name='register-page'),
    path('log-out', LogoutView.as_view(next_page='login-page'), name='log-out')
]
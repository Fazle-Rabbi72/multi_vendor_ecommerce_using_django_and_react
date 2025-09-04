from django.urls import path

from userauths import views as userauths_views
from rest_framework_simplejwt.views import TokenRefreshView
from store import views as store_views

urlpatterns =[
    path('user/token/',userauths_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/',TokenRefreshView.as_view()),
    path('user/register/',userauths_views.RegisterView.as_view()),
    path('user/password-reset/<email>/',userauths_views.PasswordRestEmailVerify.as_view()),
    path('user/password-change/',userauths_views.PasswordChangeView.as_view(), name='password_change'),
    
    #Store Endpoints
    path('category/',store_views.CategoryListAPIView.as_view()),
    path('products/',store_views.ProductListAPIView.as_view()),
    path('products/<slug>/',store_views.ProductDetailAPIView.as_view()),
    path('cart-view/',store_views.CartAPIView.as_view()),
    path('cart-list/<str:cart_id>/<int:user_id>/',store_views.CartListAPIView.as_view()),
    path('cart-list/<str:cart_id>/',store_views.CartListAPIView.as_view()),
    path('cart-detail/<str:cart_id>/',store_views.CartDetailAPIView.as_view()),
    path('cart-detail/<str:cart_id>/<int:user_id>/',store_views.CartDetailAPIView.as_view()),
    path('cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>/',store_views.CartDeleteAPIView.as_view()),
    path('cart-delete/<str:cart_id>/<int:item_id>/',store_views.CartDeleteAPIView.as_view()),
    path('create-order/',store_views.CreateOrderAPIView.as_view()),
    path('checkout/<order_oid>/',store_views.CheckoutAPIView.as_view()),
    
]
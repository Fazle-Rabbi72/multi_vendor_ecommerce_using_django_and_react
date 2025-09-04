from django.shortcuts import render

from store.models import Category,Product,Tax,Color,Size,Gallery,Specification,ProductFaq,Review,Wishlist,Cart,CartOrder,CartOrderItem,Coupon,Notification
from userauths.models import User
from store.serializers import ProductSerializer,CategorySerializer,CartSerializer,CartOrderSerializer

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from decimal import Decimal
from rest_framework.response import Response


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes =[AllowAny]

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    
    def get_object(self):
        slug=self.kwargs.get('slug')
        return Product.objects.get(slug=slug)
    
class CartAPIView(generics.ListCreateAPIView):
    queryset=Cart.objects.all()
    serializer_class=CartSerializer
    permission_classes=[AllowAny]
    
    def create(self, request, *args, **kwargs):
        payload=request.data
        
        product_id=payload['product_id']
        user_id=payload['user_id']
        quantity=payload['quantity']
        price=payload['price']
        shipping_amount=payload['shipping_amount']
        country=payload['country']
        size=payload['size']
        color=payload['color']
        cart_id=payload['cart_id']
        
        product=Product.objects.get(id=product_id)
        if user_id != "undefined":
            user=User.objects.get(id=user_id)
        else:
            user=None
        
        tax = Tax.objects.filter(country=country).first()
        if tax:
            tax_rate = tax.rate / 100
        else:
            tax_rate = 0
            
        cart=Cart.objects.filter(cart_id=cart_id, product=product).first()
        if cart:
            cart.product=product
            cart.user=user
            cart.quantity=quantity
            cart.price=price
            cart.sub_total=Decimal(price)*int(quantity)
            cart.shipping_amount=Decimal(shipping_amount)*int(quantity)
            cart.tax_fee=int(quantity)*Decimal(tax_rate)
            cart.country=country
            cart.size=size
            cart.color=color
            cart.cart_id=cart_id
            
            service_fee_percentage=20/100
            cart.service_fee=Decimal(service_fee_percentage)*cart.sub_total
            
            cart.total=cart.sub_total+cart.shipping_amount+cart.service_fee+cart.tax_fee
            
            cart.save()
            
            return Response({"message":"Cart Updated Successfully"},status=status.HTTP_200_OK)
        else:
            cart=Cart()
            cart.product=product
            cart.user=user
            cart.quantity=quantity
            cart.price=price
            cart.sub_total=Decimal(price)*int(quantity)
            cart.shipping_amount=Decimal(shipping_amount)*int(quantity)
            cart.tax_fee=int(quantity)*Decimal(tax_rate)
            cart.country=country
            cart.size=size
            cart.color=color
            cart.cart_id=cart_id
            
            service_fee_percentage=20/100
            cart.service_fee=Decimal(service_fee_percentage)*cart.sub_total
            
            cart.total=cart.sub_total+cart.shipping_amount+cart.service_fee+cart.tax_fee
            
            cart.save()
            
            return Response({"message":"Cart Created Successfully"},status=status.HTTP_201_CREATED)


class CartListAPIView(generics.ListAPIView):
    serializer_class=CartSerializer
    permission_classes=[AllowAny]
    queryset=Cart.objects.all()
    
    def get_queryset(self):
        cart_id=self.kwargs.get('cart_id')
        user_id=self.kwargs.get('user_id')
        
        if user_id is not None:
            user=User.objects.get(id=user_id)
            querysert=Cart.objects.filter(user=user ,cart_id=cart_id)
        else:
            querysert=Cart.objects.filter(cart_id=cart_id)
            
        return querysert  
    
class CartDetailAPIView(generics.RetrieveAPIView):
    serializer_class=CartSerializer
    permission_classes=[AllowAny]
    lookup_field='cart_id'
    
    def get_queryset(self):
        cart_id=self.kwargs.get('cart_id')
        user_id=self.kwargs.get('user_id')
        
        if user_id is not None:
            user=User.objects.get(id=user_id)
            querysert=Cart.objects.filter(user=user ,cart_id=cart_id)
        else:
            querysert=Cart.objects.filter(cart_id=cart_id)
            
        return querysert 
     
    def get(self, request, *args, **kwargs):
        queryset=self.get_queryset()
        
        
        total_shipping =Decimal(0.00)
        total_tax =Decimal(0.00)
        total_service_fee=Decimal(0.00)
        total_sub_total=Decimal(0.00)
        total_total=Decimal(0.00)
        
        for cart_item in queryset:
            total_shipping+=float(self.calculate_shipping(cart_item))
            total_tax+=float(self.calculate_tax(cart_item))
            total_service_fee+=float(self.calculate_service_fee(cart_item))
            total_sub_total+=float(self.calculate_sub_total(cart_item))
            total_total+=float(self.calculate_total(cart_item)) 
        
        data ={
            'shipping':total_shipping,
            'tax':total_tax,
            'service_fee':total_service_fee,
            'sub_total':total_sub_total,
            'total':total_total
        }
        
        return Response(data)
    
    def calculate_shipping(self,cart_item):
        return cart_item.shipping_amount

    def calculate_tax(self,cart_item):
        return cart_item.tax_fee
    
    def calculate_service_fee(self,cart_item):
        return cart_item.service_fee
    
    def calculate_sub_total(self,cart_item):
        return cart_item.sub_total
    
    def calculate_total(self,cart_item):
        return cart_item.total

class CartDeleteAPIView(generics.DestroyAPIView):
    serializer_class=CartSerializer
    lookup_field='cart_id'
    
    def get_queryset(self):
        cart_id=self.kwargs.get('cart_id')
        item_id=self.kwargs.get('item_id')
        user_id=self.kwargs.get('user_id')
        
        if user_id:
            user=User.objects.get(id=user_id)
            cart=Cart.objects.filter(id=item_id, user=user,cart_id=cart_id)
        else:
            cart=Cart.objects.filter(id=item_id,cart_id=cart_id)
            
        return cart

class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class=CartOrderSerializer
    queryset=CartOrder.objects.all()
    permission_classes=[AllowAny]
    
    def create(self,request):
        payload=request.data
        
        full_name=payload['full_name']
        email=payload['email']
        mobile=payload['mobile']
        address=payload['address']
        city=payload['city']
        state=payload['state']
        country=payload['country']
        cart_id=payload['cart_id']
        user_id=payload['user_id']
        
        if user_id !=0:
            user=User.objects.get(id=user_id)
        else:
            user=None
        
        cart_items=Cart.objects.filter(cart_id=cart_id)
        
        total_shipping=Decimal(0.00)
        total_tax=Decimal(0.00)
        total_service_fee=Decimal(0.00)
        total_sub_total=Decimal(0.00)
        total_initial_total=Decimal(0.00)
        total_total=Decimal(0.00)
        
        order=CartOrder.objects.create(
            buyer=user,
            full_name=full_name,
            email=email,
            mobile=mobile,
            address=address,
            city=city,
            state=state,
            country=country,
        )
        
        for c in cart_items:
            CartOrderItem.objects.create(
                order=order,
                product=c.product,
                vendor=c.product.vendor,
                quantity=c.quantity,
                price=c.price,
                sub_total=c.sub_total,
                shipping_amount=c.shipping_amount,
                service_fee=c.service_fee,
                tax_fee=c.tax_fee,
                total=c.total,
                size=c.size,
                color=c.color,
                initial_total=c.total,     
            )
            
            total_shipping+=Decimal(c.shipping_amount)
            total_tax+=Decimal(c.tax_fee)
            total_service_fee+=Decimal(c.service_fee)
            total_sub_total+=Decimal(c.sub_total)
            total_initial_total+=Decimal(c.total)
            total_total+=Decimal(c.total)
            
            order.vendor.add(c.product.vendor)
            
        order.sub_total=total_sub_total
        order.shipping_amount=total_shipping
        order.service_fee=total_service_fee
        order.initial_total=total_initial_total
        order.tax_fee=total_tax
        order.total=total_total
        order.save()
        
        
            
        return Response({'message':'Order Created Successfully','order_oid':order.oid},status=status.HTTP_201_CREATED)

class CheckoutAPIView(generics.RetrieveAPIView):
    serializer_class=CartOrderSerializer
    lookup_field='order_oid'
    
    def get_object(self):
        order_oid=self.kwargs.get('order_oid')
        order=CartOrder.objects.get(oid=order_oid)
        return order
                
            
        
        
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from userauths.models import User,Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny

from userauths.serializer import RegisterSerializer,MyTokenObtainPairSerializer,UserSerializer

import shortuuid



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    


class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    permission_classes=(AllowAny,)
    serializer_class=RegisterSerializer

def generate_otp():
    uuid_key=shortuuid.uuid()
    unique_key=uuid_key[:6]
    return unique_key
    
class PasswordRestEmailVerify(generics.RetrieveAPIView):
    permission_classes=(AllowAny,)
    serializer_class=UserSerializer
    
    def get_object(self):
        email=self.kwargs['email']
        user=User.objects.get(email=email)
        
        if user:
            user.otp=generate_otp()
            user.save()
            uidb64=user.pk
            otp=user.otp
            Link=f"http://localhost:5173/create-new-password?otp={otp}&uidb64={uidb64}"
            print("Link ======",Link)
        return user

class PasswordChangeView(generics.CreateAPIView):
    permission_classes=(AllowAny,)
    serializer_class=UserSerializer
    
    def create(self, request, *args, **kwargs):
        payload = request.data
        otp=payload['otp']
        uidb64=payload['uidb64']
        password=payload['password']
        
        user = User.objects.get(id=uidb64, otp=otp)
        if user:
            user.set_password(password)
            user.otp=""
            user.save()
            return Response({"massage":"Password changed Successfully"},status=status.HTTP_201_CREATED)
        else:
            return Response({"massage":"User Does not exist"},status=status.HTTP_404_NOT_FOUND)
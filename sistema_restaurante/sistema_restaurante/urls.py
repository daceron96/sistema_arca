"""sistema_restaurante URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from product.urls import product_patterns
from core.urls import core_patterns
from work_order.urls import work_order_patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    #path core
    path('', include(core_patterns)),
    
    #path product
    path('product/', include(product_patterns)),

    #path work_order
    path('order/', include(work_order_patterns)),
    
   
]

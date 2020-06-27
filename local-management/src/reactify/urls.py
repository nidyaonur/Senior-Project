"""reactify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from rest_framework.authtoken import views
urlpatterns = [
    path('',include('frontend.urls')),
    #path('', TemplateView.as_view(template_name='react.html')),
    re_path(r'^subscribers/', TemplateView.as_view(template_name='react.html')),
    re_path(r'^chats/', TemplateView.as_view(template_name='react.html')),
    path('admin/', admin.site.urls),
    #path('api/posts/', include('posts.urls')),
    #path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    #path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
    #path('api/subscribers/', include('subscribers.urls')),
    url(r'^api/subscribers/', include(('subscribers.api.urls','subscribers.api'), namespace='subscribers-api')),
    url(r'^api/chat/', include(('chat.api.urls','chat.api'), namespace='chat-api')),
    path('api-token-auth/',views.obtain_auth_token,name='api-token-auth'),
    path('chat/', include('chat.urls')),
    path('api/auth/',include(('accounts.api.urls','accounts.api'), namespace='accounts-api')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.urls import path
from . import views

urlpatterns = [
    path('chat-message/', views.chat_message, name='chat_message'),
    path('send-message/', views.send_message , name ="send_message"),
]
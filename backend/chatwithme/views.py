from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Message, Room
from django.http import JsonResponse, HttpResponse

@api_view(['GET'])
def chat_message(request):
    data_message = Message.objects.all().values()
    return JsonResponse({'message': list(data_message)})

@api_view(['POST'])
def send_message(request):
    try:
        value = request.data.get('message', '')
        user = request.data.get('username', '')
        room = request.data.get('room_id', '')

        new_message = Message.objects.create(value= value , user = user , room = room)
        new_message.save()
        return HttpResponse('Message envoyé avec succès')
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})
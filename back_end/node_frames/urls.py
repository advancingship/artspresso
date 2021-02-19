from django.urls import path
from . import views

urlpatterns = [
    # ex: /node_frames/
    path('', views.index, name='index'),
    # ex: /node_frames/5/
    
    path('<int:node_frame_id>/', views.detail, name='node-frame-detail'),
    path('x/<int:node_frame_id>/', views.detail, name='detail'),    

    path('add/', views.NodeFrameCreate.as_view(), name='node-frame-add'),
    path('<int:pk>/update', views.NodeFrameUpdate.as_view(), name='node-frame-update'),
    path('<int:pk>/delete/', views.NodeFrameDelete.as_view(), name='node-frame-delete'),    
]

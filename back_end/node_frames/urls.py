from django.conf.urls import include, url
from django.views.generic import DetailView, ListView
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

    #ex: /frames/1/delete/
    path('<int:pk>/delete/', views.delete, name='node-frame-delete'),
    #path('new/', views.NodeFrameCreate.as_view(), name='node-frame-add'),

    #works
    path('new/', views.new, name='node-frame-new'),

    #object of type NodeFrame is not JSON serializable
    path('make/', views.make, name='node-frame-make'),    
]

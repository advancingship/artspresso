from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from node_frames.models import NodeFrame
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.core import serializers


class NodeFrameCreate(CreateView):
    model = NodeFrame
    fields = ['name']

    
class NodeFrameUpdate(UpdateView):
    model = NodeFrame
    fields = ['name']

    
class NodeFrameDelete(DeleteView):
    model = NodeFrame
    success_url = reverse_lazy('node-frame-list')
    
@api_view(["GET","POST"])
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def index(request):
    latest_node_frame_list = NodeFrame.objects.all()[:5]
    context = {'latest_node_frame_list': latest_node_frame_list}
    content = {"message": "hello content"}
    return JsonResponse(serializers.serialize('json', latest_node_frame_list), safe=False)
    #return render(request, 'node_frames/index.html', context)


def detail(request, node_frame_id):
    try:
        node_frame = NodeFrame.objects.get(pk=node_frame_id)
    except NodeFrame.DoesNotExist:
        raise Http404("NodeFrame does not exist")
    return render(request, 'node_frames/detail.html', {'node_frame': node_frame})

from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse, HttpResponseServerError

from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from node_frames.models import NodeFrame
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json


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
    latest_node_frame_list = NodeFrame.objects.all().order_by("-id")[:10]
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

# @csrf_protect
# needed to ensure that JSON post requests work
			#node_frame = dict(json_data['node_frame'])
			#name = node_frame['name']
@csrf_exempt
def new(request):
	if True | ( request.method == 'POST' ):
		json_data = json.loads(request.body.decode('utf-8'))
		try:
                    node_name = json_data['name']
                    p = NodeFrame(name=node_name)
                    p.save()
                    got = NodeFrame.objects.all().filter(pk=p.pk)
		except KeyError:
			return HttpResponseServerError("Malformed Data, missing key")
		return JsonResponse(serializers.serialize('json', got), safe=False)

	else:
		return HttpResponse("Only JSON post accepted", status=404)
            
@csrf_exempt
def make(request):
	if True | ( request.method == 'POST' ):
		json_data = json.loads(request.body.decode('utf-8'))
		try:
                    node_name = json_data['name']
                    p = NodeFrame(name=node_name)
                    p.save()
                    got = NodeFrame.objects.all().filter(pk=p.pk)
		except KeyError:
			return HttpResponseServerError("Malformed Data, missing key")
		return JsonResponse(json.dumps(p))

	else:
		return HttpResponse("Only JSON post accepted", status=404)

@csrf_exempt
def delete(request, pk):
	if True | ( request.method == 'POST' ):

		try:
                    p = NodeFrame(pk=pk)
                    p.delete()
		except KeyError:
			return HttpResponseServerError("Malformed Data, missing key")
		return JsonResponse({"code": 200, "msg": "successful delete"})

	else:
		return JsonResponse({"Only JSON post accepted"}, status=404)


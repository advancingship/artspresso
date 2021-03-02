from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse, HttpResponseServerError

from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from node_frames.models import NodeFrame, Arc
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.core import serializers
from rest_framework.serializers import ModelSerializer
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json
from pprint import pprint


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

@csrf_exempt
def new(request):
    if True | ( request.method == 'POST' ):
        json_data = json.loads(request.body.decode('utf-8'))
        try:
                    node_name = json_data['name']
                    p = NodeFrame(name=node_name)
                    p.save()

                    got = NodeFrame.objects.filter(pk=p.pk)
        except KeyError:
            return HttpResponseServerError("Malformed Data, missing key")
        return JsonResponse(serializers.serialize('json', got), safe=False)

    else:
        return HttpResponse("Only JSON post accepted", status=404)
            
@csrf_exempt
def update(request, pk):
    if True | ( request.method == 'PUT' ):
        json_data = json.loads(request.body.decode('utf-8'))
        try:
                    keep = ['name', 'content']
                    update_kept = {k: json_data.get(k) for k in keep}
                    p = NodeFrame.objects.get(pk=pk)

                    for k , v in update_kept.items():
                        if v:
                            setattr(p, k, v)

                    p.save()

                    got = [NodeFrame.objects.get(pk=pk)]
        except KeyError:
            return HttpResponseServerError("Malformed Data, missing key")
                #return JsonResponse({"code": 200, "msg": "successful update"}) 
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
                    got = NodeFrame.objects.get(pk=p.pk)
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

@csrf_exempt
def new_arc(request):
    if True | ( request.method == 'POST' ):
        json_data = json.loads(request.body.decode('utf-8'))
        try:
                    source=json_data['source']
                    sense=json_data['sense']
                    sink=json_data['sink']
                    p = Arc(source_id=source, sense_id=sense, sink_id=sink)
                    print("NEW ARC")
                    print(source)
                    print(sense)
                    print(sink)
                    print(serializers.serialize('json',[p]))
                    p.save()

                    got = Arc.objects.filter(pk=p.pk)
        except KeyError:
            return HttpResponseServerError("Malformed Data, missing key")
        return JsonResponse(serializers.serialize('json', got), safe=False)

    else:
        return HttpResponse("Only JSON post accepted", status=404)
            
@csrf_exempt
def update_arc(request, pk):
    if True | ( request.method == 'PUT' ):
        json_data = json.loads(request.body.decode('utf-8'))
        try:
                    keep = ['source', 'sense', 'sink']
                    update_kept = {k: json_data.get(k) for k in keep}

                    p = Arc.objects.get(pk=pk)

                    for k , v in update_kept.items():
                        if v:
                            setattr(p, k, v)

                    p.save()

                    got = [Arc.objects.get(pk=pk)]

        except KeyError:
            return HttpResponseServerError("Malformed Data, missing key")
        return JsonResponse(serializers.serialize('json', got), safe=False)
    else:
        return HttpResponse("Only JSON post accepted", status=404)
            
@csrf_exempt
def delete_arc(request, pk):
    if True | ( request.method == 'POST' ):

        try:
                    p = Arc(pk=pk)
                    p.delete()
        except KeyError:
            return HttpResponseServerError("Malformed Data, missing key")
        return JsonResponse({"code": 200, "msg": "successful delete"})

    else:
        return JsonResponse({"Only JSON post accepted"}, status=404)

class ArcSerializer(ModelSerializer):
    class Meta:
        model = Arc
        depth = 3
        fields = '__all__'

def return_full_arc(request, pk):
    arc = Arc.full_arc(pk);
    arc_serializer = ArcSerializer(arc)
    serializer = arc_serializer
    pprint(arc)
    return JsonResponse(serializer.data, safe=False)

def return_full_arc_2():
    return None

def debuggo(request, pk):
    return return_full_arc(request, pk)
    #return_full_arc_2()

#debuggo(None, 17890)

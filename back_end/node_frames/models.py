from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.db import connection

class NodeFrame(models.Model):
    name = models.CharField(max_length=72)
    content = models.TextField()
    creation_datetime = models.DateTimeField(auto_now_add=True, editable=False)
    modification_datetime = models.DateTimeField(auto_now=True)
    

    def get_absolute_url(self):
        return reverse("detail", kwargs={"pk", self.pk})

    def __str__(self):
        return self.name

def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]



class Arc(models.Model):
    source = models.ForeignKey(NodeFrame, on_delete=models.CASCADE)
    sense = models.ForeignKey(NodeFrame, on_delete=models.SET_NULL, related_name="senses", null=True)
    sink = models.ForeignKey(NodeFrame, on_delete=models.SET_NULL, related_name="sinks", null=True)
    creation_datetime = models.DateTimeField(auto_now_add=True, editable=False)
    modification_datetime = models.DateTimeField(auto_now=True)

    @classmethod
    def full_arc(cls, pk):
        with connection.cursor() as cursor:
            node_fields = [f.name for f in NodeFrame._meta.fields]
            node_prefixes = ['source_', 'sense_', 'sink_']
            nodes_prefixed = [p + f for p in node_prefixes for f in node_fields]
            fields_as = ', '.join([p + '.' + f + ' as ' + p + f for p in node_prefixes for f in node_fields])
            query = "select " + fields_as + " from node_frames_arc a " \
                                            "left join node_frames_nodeframe as source_ on a.source_id=source_.id " \
                                            "left join node_frames_nodeframe sense_ on a.sense_id=sense_.id " \
                                            "left join node_frames_nodeframe sink_ on a.sink_id=sink_.id " \
                                            "where a.id=" + str(pk)
            cursor.execute(query)
            dictfetch = dictfetchall(cursor)
            d = dictfetch[0]
            source = NodeFrame(id=d['source_id'], name=d['source_name'], content=d['source_content'],
                               creation_datetime=d['source_creation_datetime'],
                               modification_datetime=d['source_modification_datetime'])
            sense = NodeFrame(id=d['sense_id'], name=d['sense_name'], content=d['sense_content'],
                               creation_datetime=d['sense_creation_datetime'],
                               modification_datetime=d['sense_modification_datetime'])
            sink = NodeFrame(id=d['sink_id'], name=d['sink_name'], content=d['sink_content'],
                               creation_datetime=d['sink_creation_datetime'],
                               modification_datetime=d['sink_modification_datetime'])
            return Arc(source=source, sense=sense, sink=sink)

from django.db import models
from django.urls import reverse
from django.db import connection


class NodeFrame(models.Model):
    name = models.CharField(max_length=72, null=True)
    content = models.TextField(null=True)
    creation_datetime = models.DateTimeField(auto_now_add=True, editable=False)
    modification_datetime = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return reverse("detail", kwargs={"pk", self.pk})

    def __str__(self):
        return self.name



def map_fetch_all(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


class Arc(models.Model):
    source = models.ForeignKey(NodeFrame, on_delete=models.CASCADE, related_name="arcs")
    sense = models.ForeignKey(NodeFrame, on_delete=models.CASCADE, related_name="senses", null=True)
    sink = models.ForeignKey(NodeFrame, on_delete=models.SET_NULL, related_name="sinks", null=True)
    creation_datetime = models.DateTimeField(auto_now_add=True, editable=False)
    modification_datetime = models.DateTimeField(auto_now=True)

    #return arcs stemming from source or from associates thereof
    @classmethod
    def get_associates(cls, pk):
        with connection.cursor() as cursor:
            arc_fields = ['id', 'source_id', 'sense_id', 'sink_id', 'creation_datetime', 'modification_datetime']
            arc_fields_string = ', '.join(arc_fields)
            arc_prefix = 'na.'
            arc_fields_prefixed = ', '.join([arc_prefix + f for f in arc_fields])
            query_string = '''WITH RECURSIVE
            top_arcs({0}) as (
                select {0} from node_frames_arc where source_id={1}
              union
                select {2} from top_arcs ta, node_frames_arc na 
                where na.source_id=ta.sense_id or na.source_id=ta.sink_id)
            select * from top_arcs a
            '''
            query = query_string.format(arc_fields_string, str(pk), arc_fields_prefixed)
            cursor.execute(query)
            result_maps = map_fetch_all(cursor)
            arcs = [Arc(id=r['id'], source_id=r['source_id'], sense_id=r['sense_id'], sink_id=r['sink_id'],
                        creation_datetime=r['creation_datetime'], modification_datetime=r['modification_datetime']
                        ) for r in result_maps]
            return arcs

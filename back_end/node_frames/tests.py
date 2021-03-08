import pytest
from node_frames.models import NodeFrame, Arc

@pytest.mark.django_db()
def test_get_associates():
    node_frame_a = NodeFrame(name="the name", content="the content")

    node_frame_a.save()
    noun_a = NodeFrame(name="noun_a")
    noun_b = NodeFrame(name="noun_b")
    noun_c = NodeFrame(name="noun_c")
    noun_d = NodeFrame(name="noun_d")
    bad_noun_a = NodeFrame(name="bad_noun_a")
    bad_noun_b = NodeFrame(name="bad_noun_b")

    have_quality = NodeFrame(name="have_quality")
    verb_a = NodeFrame(name="verb_a")
    verb_b = NodeFrame(name="verb_b")
    have_quantity = NodeFrame(name="have_quantity")
    quality_a = NodeFrame(name="quality_a")
    quality_b = NodeFrame(name="quality_b")
    quantity_a = NodeFrame(name="2")
    bad_verb_a = NodeFrame(name="bad_verb_a")
    bad_verb_b = NodeFrame(name="bad_verb_b")

    #arcs descending from noun_a or sinks thereof
    arc_a = Arc(source=noun_a, sense=verb_a, sink=noun_b)
    arc_b = Arc(source=verb_a, sense=have_quality, sink=quality_a)
    arc_c = Arc(source=noun_a, sense=verb_b, sink=noun_c)
    arc_d = Arc(source=verb_b, sense=have_quality, sink=quality_b)
    arc_e = Arc(source=verb_b, sense=have_quantity, sink=quantity_a)
    arc_f = Arc(source=noun_b, sense=verb_b, sink=noun_d)
    #arcs not descending from noun_a
    bad_arc_a = Arc(source=bad_noun_a, sense=bad_verb_a, sink=bad_noun_b)
    bad_arc_b = Arc(source=bad_noun_b, sense=bad_verb_b, sink=bad_noun_a)
    bad_arc_c = Arc(source=bad_noun_b, sense=verb_b, sink=noun_a)

    test_models = [noun_a, noun_b, noun_c, noun_d,
                   quality_a, quality_b, quantity_a,
                   verb_a, verb_b, have_quality, have_quantity,
                   arc_a, arc_b, arc_c, arc_d, arc_e, arc_f,
                   bad_noun_a, bad_noun_b,
                   bad_verb_a, bad_verb_b,
                   bad_arc_a, bad_arc_b, bad_arc_c]

    #all pks are set
    for o in test_models:
        o.save()
        assert(o.pk > 0)

    result = Arc.get_associates(noun_a.pk)

    #all result arcs are related
    good_pks = [o.id for o in [noun_a, noun_b, noun_c, noun_d, arc_a, arc_b, arc_c, arc_d, arc_e, arc_f]]
    for arc in result:
        assert(arc.id in good_pks)

    result_pks = [r.id for r in result]

    #no result arcs are unrelated
    assert (bad_arc_a.id not in result_pks)
    assert (bad_arc_b.id not in result_pks)
    assert(bad_arc_c.id not in result_pks)

    #no repeated arcs in result
    assert(len(result_pks) == len(set(result_pks)))
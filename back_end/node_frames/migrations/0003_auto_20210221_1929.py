# Generated by Django 3.1.6 on 2021-02-21 19:29

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('node_frames', '0002_auto_20210221_1923'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nodeframe',
            name='creation_datetime',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]

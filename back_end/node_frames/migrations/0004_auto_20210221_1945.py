# Generated by Django 3.1.6 on 2021-02-21 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('node_frames', '0003_auto_20210221_1929'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nodeframe',
            name='creation_datetime',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]

# Generated by Django 3.1.6 on 2021-03-22 18:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('node_frames', '0006_auto_20210322_1759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='arc',
            name='sense',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='senses', to='node_frames.nodeframe'),
        ),
    ]

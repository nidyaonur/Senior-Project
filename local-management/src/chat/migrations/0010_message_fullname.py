# Generated by Django 2.1.5 on 2020-04-17 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0009_auto_20200417_0208'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='fullname',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]

# Generated by Django 2.1.5 on 2020-04-12 08:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_auto_20200411_1005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='subscribers.Subscriber', to_field='username'),
        ),
    ]

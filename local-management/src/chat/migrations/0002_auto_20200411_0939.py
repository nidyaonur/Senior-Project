# Generated by Django 2.0.6 on 2020-04-11 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topic',
            name='id',
        ),
        migrations.AlterField(
            model_name='topic',
            name='name',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
# Generated by Django 2.1.5 on 2020-04-12 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscribers', '0005_auto_20200412_0839'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriber',
            name='username',
            field=models.CharField(blank=True, default='user', max_length=50, unique=True),
            preserve_default=False,
        ),
    ]

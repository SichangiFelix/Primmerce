# Generated by Django 4.2.6 on 2023-10-06 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.CharField(max_length=300, null=True),
        ),
    ]

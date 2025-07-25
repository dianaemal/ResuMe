# Generated by Django 5.2.1 on 2025-06-26 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="resume",
            name="template",
            field=models.CharField(
                choices=[
                    ("template1", "Classic"),
                    ("template2", "Modern"),
                    ("template3", "Professional"),
                    ("template4", "Creative"),
                    ("template5", "Minimalist"),
                ],
                default="template1",
                max_length=20,
            ),
        ),
    ]

from rest_framework import serializers 
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import Resume, ContactInfo, WorkExperience, ExperienceDescription, Education, Languages,Summary,Skills
User = get_user_model()
class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields=['id', 'email', 'username', 'password']
        
class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()

    class Meta:
        model = WorkExperience
        fields = [
            'id',
            'position',
            'employer',
            'location',
            'start_month',
            'start_year',
            'end_month',
            'end_year',
            'still_working',
            'description'
            
            
        ]
        read_only_fields = ['description']
        
    def get_description(self, obj):
        description = ExperienceDescription.objects.filter(work = obj).first()
        if description:
            return ExperienceDesSerializer(description).data
        else:
            return None

class ExperienceDesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceDescription
        fields = '__all__'

class Educationserializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Languages
        fields = '__all__'

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'
class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    #contactInfo = serializers.SerializerMethodField()
    class Meta:
        model = Resume
        fields = ['title', 'id', 'user']
        #read_only_fields  = ['contactInfo']

    #def get_contactInfo(self, obj):
        #contact = ContactInfo.objects.filter(resume=obj)
       # return ContactInfoSerializer(contact, many=True).data


from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.contrib.auth import get_user_model 
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Resume, ContactInfo, WorkExperience, ExperienceDescription, Education, Languages,Summary,Skills
from .serializers import ResumeSerializer, ContactInfoSerializer, Educationserializer, ExperienceDesSerializer, WorkExperienceSerializer, LanguagesSerializer, SkillsSerializer, SummarySerializer
import json
import requests
import os


class ResumeList(APIView):

    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        print("Authorization header:", request.META.get('HTTP_AUTHORIZATION'))
        resumes = Resume.objects.all()
        serializer = ResumeSerializer(resumes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
       
        print("User:", request.user)
        serializer = ResumeSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            #User = get_user_model()
           # admin_user = User.objects.get(is_superuser=True)
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ResumeDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self, pk):
        try:
            return Resume.objects.get(id=pk)
        except Resume.DoesNotExist:
            raise Http404
        
  
    def get(self, request, pk):
        resume = self.get_obj(pk)
        serializer = ResumeSerializer(resume)
        return Response(serializer.data)
    
    def put(self, request, pk):
        resume = self.get_obj(pk)
        serializer = ResumeSerializer(resume, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        resume = self.get_obj(pk)
        resume.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ContactDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self, pk):
        try:
            return ContactInfo.objects.get(resume = pk)
        except ContactInfo.DoesNotExist:
            raise Http404
        
    def get(self, request, pk):
        contact = self.get_obj(pk)
        serializer = ContactInfoSerializer(contact)
        return Response(serializer.data)
    
    def post(self, request, pk):
        try:
            resume = Resume.objects.get(id = pk)
        except Resume.DoesNotExist:
            raise Http404
        
        serializer = ContactInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(resume=resume)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        contact = ContactInfo.objects.get(resume = pk)
        serializer = ContactInfoSerializer(contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        contact = self.get_obj(pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EducationDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self, pk, E_id):
        try:
            return Education.objects.get(resume = pk, id = E_id)
        except Education.DoesNotExist:
            return Http404
        
    def get (self,request, pk, E_id = None):
        if E_id:

            education = self.get_obj(pk, E_id)
            serializer = Educationserializer(education)
            return Response(serializer.data)
        else:
            try:
                educationList = Education.objects.filter(resume=pk)
            

                serializer = Educationserializer(educationList, many=True)
                return Response(serializer.data)
            except Education.DoesNotExist:
            
                return Response([])
    
    def post(self, request, pk):
        try:
           resume = Resume.objects.get(id = pk)
        except Resume.DoesNotExist:
            Http404
           
       
        serializer = Educationserializer(data = request.data)
        if serializer.is_valid():
            serializer.save(resume = resume)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, E_id):
        education = self.get_obj(pk, E_id)
        serializer = Educationserializer(education, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request, pk, E_id):
        education = self.get_obj(pk, E_id)
        if education:
            education.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Education not found."}, status=status.HTTP_404_NOT_FOUND)

class WorkDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self, pk, W_id):
        try:
            work = WorkExperience.objects.get(resume = pk, id = W_id)
            return work
        except WorkExperience.DoesNotExist:
            return Http404
    def get(self, request, pk, W_id = None):
        if W_id:
            work = self.get_obj(pk, W_id)
            serializer = WorkExperienceSerializer(work)
            return Response(serializer.data)
        else:
            try:
                works = WorkExperience.objects.filter(resume = pk)
                serializer = WorkExperienceSerializer(works, many=True)
                return Response(serializer.data)
            except WorkExperience.DoesNotExist:
                return Response([])
    def post(self, request, pk):
        try: 
            resume = Resume.objects.get(id = pk)
        except Resume.DoesNotExist:
            return Http404
        serializer = WorkExperienceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(resume = resume)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, W_id):
        work = self.get_obj(pk, W_id)
        serializer = WorkExperienceSerializer(work, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, W_id):
        work = self.get_obj(pk, W_id)
        if work:
            work.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Work experience not found."}, status=status.HTTP_404_NOT_FOUND)
        
class DescriptionDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self, W_id):
        try:
            description = ExperienceDescription.objects.get(work = W_id)
            return description
        except ExperienceDescription.DoesNotExist:
            raise Http404("Description not found")
        
    def get(self, request, pk, W_id):
        work = self.get_obj(W_id)
        serializer = ExperienceDesSerializer(work)
       
        return Response(serializer.data)
    
    def post(self, request, pk,  W_id):
        try:
            work = WorkExperience.objects.get(resume = pk, id = W_id)
        except WorkExperience.DoesNotExist:
            return Http404

        serializer = ExperienceDesSerializer(data = request.data)
       
        if serializer.is_valid():
            serializer.save(work = work)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, W_id):
        description = self.get_obj(W_id)
        serializer = ExperienceDesSerializer(description, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class SkillsDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self, pk):
        try:
            return Skills.objects.get(resume=pk)
        except Skills.DoesNotExist:
            raise Http404
        
    def post(self, request, pk):
        try:
            resume = Resume.objects.get(id = pk)
        except Resume.DoesNotExist:
            raise Http404("Description not found")
        serializer = SkillsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(resume = resume)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, pk):
        skills = self.get_obj(pk)
        serializer = SkillsSerializer(skills)
        return Response(serializer.data)
    def put(self, request, pk):
        skills = self.get_obj(pk)
        serializer = SkillsSerializer(skills, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        skills = self.get_obj(pk)
        if skills:
            skills.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Work experience not found."}, status=status.HTTP_404_NOT_FOUND)
        

class SummaryDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get_obj(self, pk):
        try:
            summary = Summary.objects.get(resume=pk)
            return summary
        except Summary.DoesNotExist:
           raise Http404

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(id = pk)

        except Resume.DoesNotExist:
            raise Http404

        serializer = SummarySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(resume = resume)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk):
        summary = self.get_obj(pk)
        serializer = SummarySerializer(summary, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def get(self,request, pk):
        summary = self.get_obj(pk)
        serializer = SummarySerializer(summary)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        summary = self.get_obj(pk)
        if summary:
            summary.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Work experience not found."}, status=status.HTTP_404_NOT_FOUND)

class AllResumeData(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            resume = Resume.objects.get(id=pk)
            contactInfo = ContactInfo.objects.get(resume = pk)
            contactSerializer = ContactInfoSerializer(contactInfo).data
        except ContactInfo.DoesNotExist:
            contactSerializer = None
        except Resume.DoesNotExist:
            return Response({"error": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)
     
        workExperience = WorkExperience.objects.filter(resume = pk)
        workSerializer = WorkExperienceSerializer(workExperience, many=True).data

        education = Education.objects.filter(resume = pk)
        educationSerializer = Educationserializer(education, many=True).data

        try:
            skills = Skills.objects.get(resume=pk)
            skillsSerializer = SkillsSerializer(skills).data
        except Skills.DoesNotExist:
            skillsSerializer = None

        try:
            summary = Summary.objects.get(resume=pk)
            summarySerializer = SummarySerializer(summary).data
        except Summary.DoesNotExist:
            summarySerializer = None
            

        resume_data ={
            
            "contactInfo": contactSerializer,
            "workExperience": workSerializer,
            "education": educationSerializer,
            "skills": skillsSerializer,
            "summary": summarySerializer,
            "template": resume.template
        }
        return Response(resume_data)

        
  
class ChatWithGPT(APIView):
    permission_classes = [AllowAny]
  
    def post(self, request):
        try:
            # Get API key from environment variable
            groq_api_key = os.getenv('GROQ_API_KEY')
            if not groq_api_key:
                return JsonResponse({'error': 'Groq API key not configured'}, status=500)
            
            # Use DRF's request.data for JSON body
            user_message = request.data.get('message', '')
         
            if not user_message:
                return JsonResponse({'error': 'Message is required'}, status=400)

            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    'Authorization': f'Bearer {groq_api_key}',
                    'Content-Type': 'application/json'
                },
               data=json.dumps({
                    "model": "meta-llama/llama-4-scout-17b-16e-instruct",  # You can also try llama3-70b-8192 or mixtral-8x7b-32768
                    "messages": [
                   {
                        "role": "user",
                        "content": user_message
                    }
                ],
                    "temperature": 0.7,
                    "max_tokens": 300
            }))
            
           
            # Check if the request was successful
            if response.status_code != 200:
                return JsonResponse({'error': f'Groq API error: {response.status_code}'}, status=500)

            response_data = response.json()

            # Groq returns a list of dicts with 'choices'
            print(response_data)
            print(response_data['choices'][0]['message']['content'])
            print(response.status_code)
           
            get_reply = response_data['choices'][0]['message']['content']
            return JsonResponse({'reply': get_reply})
            

        except Exception as e:
            
            return JsonResponse({'error': str(e)}, status=500)

   



    

        




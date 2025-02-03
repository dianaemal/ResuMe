from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.contrib.auth.models import User
from .models import Resume, ContactInfo, WorkExperience, ExperienceDescription, Education, Languages,Summary,Skills
from .serializers import ResumeSerializer, ContactInfoSerializer, Educationserializer, ExperienceDesSerializer, WorkExperienceSerializer, LanguagesSerializer, SkillsSerializer, SummarySerializer


class ResumeList(APIView):

    def get(self, request):
        resumes = Resume.objects.all()
        serializer = ResumeSerializer(resumes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ResumeSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            admin_user = User.objects.get(is_superuser=True)
            serializer.save(user=admin_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ResumeDetails(APIView):
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
    def get(self, request, pk):

        constactInfo = ContactInfo.objects.get(resume = pk)
        workExperience = WorkExperience.objects.filter(resume = pk)
        education = Education.objects.filter(resume = pk)
        skills = Skills.objects.get(resume = pk)
        summary = Summary.objects.get(resume = pk)

        contactSerializer = ContactInfoSerializer(constactInfo).data
        workSerializer = WorkExperienceSerializer(workExperience, many=True).data
        educationSerializer = Educationserializer(education, many=True).data
        skillsSerializer = SkillsSerializer(skills).data
        summarySerializer = SummarySerializer(summary).data

        resume_data ={
            "contactInfo": contactSerializer,
            "workExperience": workSerializer,
            "education": educationSerializer,
            "skills": skillsSerializer,
            "summary": summarySerializer
        }
        return Response(resume_data)

        
        




    

        




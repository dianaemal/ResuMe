from django.db import models
from django.contrib.auth.models import User

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    title = models.CharField(max_length=100)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True )
    def __str__(self):
        return self.title

class ContactInfo(models.Model):
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE, default=None, null=True)
    f_name = models.CharField(max_length=255)
    l_name = models.CharField(max_length=255, default="")
    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=15, null=True)
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.f_name
    

class WorkExperience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, default=None, null=True)
    position = models.CharField(max_length=100, null=True)
    employer = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=100, null=True)
    start_month = models.CharField(max_length= 20, null=True)
    start_year = models.CharField(max_length= 20, null=True)
    end_month = models.CharField(max_length=100, null=True, blank=True)
    end_year = models.CharField(max_length= 20, null=True)
    still_working = models.BooleanField(default=False)

    def __str__(self):
        return self.position
    
class ExperienceDescription(models.Model):
    work = models.ForeignKey(WorkExperience, on_delete=models.CASCADE, default=None, null=True)
    description = models.TextField(null=True)


class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, default=None, null=True)
    school_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, null=True)
    degree = models.CharField(max_length=100)
    study_feild = models.CharField(max_length=100, null=True)
    start_month = models.CharField(max_length= 20, null=True)
    start_year = models.CharField(max_length=20, null=True)
    graduation_month = models.CharField(max_length= 20, null=True)
    graduation_year = models.CharField(max_length=20, null=True)


    def __str__(self):
        return self.degree
    
class Languages(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, default=None, null=True)
    language = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.language
    
class Skills(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, default=None, null=True)
    skills = models.TextField(null=True)

    def __str__(self):
        return f"{self.skills[:50]}..."


class Summary(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, default=None, null=True)
    summary = models.TextField()

    def __str__(self):
        return f"{self.summary[:50]}..."


    



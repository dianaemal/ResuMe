from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


## we want to create costum user accounts and to do that we need to tell django
# how to create user accounts:
class UserAccountManager(BaseUserManager):
    # this function create a user:
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must hand an email address.')
        
        # we normalize email so that EMAIl@OUTLOOK and email@outlook wont be considered different users:
        email = self.normalize_email(email)
        # we create a user instance using the model UserAccount:
        user = self.model(email=email, username=username)
        # encrypts the password using Django’s hashing system because saving the actual one is unsafe:
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, username, password=None):
        if not email:
            raise ValueError('Users must hand an email address.')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user

    
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=225)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    # Defines email as the unique identifier instead of a username:
    USERNAME_FIELD = 'email'
    # defines other required fields line username:
    REQUIRED_FIELDS = ['username']
    # links the custom manager to the model. Without this, Django won’t know how to create users:
    objects = UserAccountManager()
    def get_full_name(self):
        return (self.username)
    def get_short_name(self):
        return (self.username)
    def __str__(self):
        return self.email
    

class Resume(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resumes')
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


    



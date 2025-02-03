from django.urls import path
from . import views

urlpatterns = [
    path('api/resumes/', views.ResumeList.as_view()),
    path('api/resumes/<int:pk>', views.ResumeDetails.as_view()),
    path('api/resumes/<int:pk>/contact-info', views.ContactDetails.as_view()),
    path('api/resumes/<int:pk>/education', views.EducationDetails.as_view()),
    path('api/resumes/<int:pk>/education/<int:E_id>', views.EducationDetails.as_view()),
    path('api/resumes/<int:pk>/work', views.WorkDetails.as_view()),
    path('api/resumes/<int:pk>/work/<int:W_id>', views.WorkDetails.as_view()),
    path('api/resumes/<int:pk>/work/<int:W_id>/description', views.DescriptionDetails.as_view()),
    path('api/resumes/<int:pk>/skills', views.SkillsDetails.as_view()),
    path('api/resumes/<int:pk>/summary', views.SummaryDetails.as_view()),
    path('api/resumes/<int:pk>/all', views.AllResumeData.as_view())

    
    
]
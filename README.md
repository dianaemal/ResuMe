# Resume Builder

A modern, professional resume builder application built with Django and React.

## Features

- Create professional resumes with multiple templates
- ATS-friendly resume formats
- Real-time preview and editing
- PDF export functionality
- User authentication and profile management
- AI-powered resume suggestions

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume_builder
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp ../.env.example ../.env
   
   # Edit the .env file with your actual values
   nano ../.env
   ```

5. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Install Node.js dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the React development server**
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Keys
GROQ_API_KEY=your_groq_api_key_here

# Django Settings
DEBUG=True
SECRET_KEY=your_django_secret_key_here

# Email Settings
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_email_password_here

# Frontend API URL
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

### Required API Keys

- **GROQ_API_KEY**: Get your API key from [Groq](https://console.groq.com/)
- **SECRET_KEY**: Generate a Django secret key (you can use `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`)

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Create an account or log in
3. Start building your resume by selecting a template
4. Fill in your information section by section
5. Preview and download your resume as PDF

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already included in `.gitignore`
- Use strong, unique passwords for production
- Consider using environment-specific settings for production deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 

import './App.css';
import Header from './components/Header';
import HomePage from './components/Hompage';
import Title from './pages/Title';
import ContactInfo from './pages/ContactInfo';
import Education from './pages/Education';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EducationView from './pages/EducationView';
import EducationEdit from './pages/EducationEdit';
import WorkView from './pages/WorkView';
import Work from './pages/Work';
import WorkDescription from './pages/WorkDescription';
import EditDescription from './pages/EditDescription';
import WorkEdit from './pages/WorkEdit';
import Skills from './pages/Skills';
import Summary from './pages/Summary';
import Resume from './pages/Resume';
import SignUp from './pages/Register';
import LogIn from './pages/Login';
import ProtectedRoute from './ProtectedRout';
import LogOut from './pages/Logout';

function App() {
  return (

     <Router>
      <Header/>
     <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/register" element={<SignUp/>}/>
       <Route path="/login" element={<LogIn/>}/>
       <Route path="/title" element={<ProtectedRoute><Title/></ProtectedRoute>}/>
       <Route path="/title/:id" element={<ProtectedRoute><Title/></ProtectedRoute>}/>
       <Route path="/contact-info" element={<ProtectedRoute><ContactInfo /></ProtectedRoute>}/>
       <Route path="/educationForm" element={<ProtectedRoute><Education/></ProtectedRoute>}/>
       <Route path="/education" element={<ProtectedRoute><EducationView/></ProtectedRoute>}/>
       <Route path="/edit-education" element={<ProtectedRoute><EducationEdit/></ProtectedRoute>}/>
       <Route path="/work-experience" element={<ProtectedRoute><WorkView/></ProtectedRoute>}/>
       <Route path="/work-experienceForm" element={<ProtectedRoute><Work/></ProtectedRoute>}/>
       <Route path="/work-description" element={<ProtectedRoute><WorkDescription/></ProtectedRoute>}/>
       <Route path="/edit-description" element={<ProtectedRoute><EditDescription/></ProtectedRoute>}/>
       <Route path="/edit-workExperience" element={<ProtectedRoute><WorkEdit/></ProtectedRoute>}/>
       <Route path="/skills" element={<ProtectedRoute><Skills/></ProtectedRoute>}/>
       <Route path="/summary" element={<ProtectedRoute><Summary/></ProtectedRoute>}/>
       <Route path="/resume" element={<ProtectedRoute><Resume/></ProtectedRoute>}/>
       <Route path="/logout" element={<ProtectedRoute><LogOut/></ProtectedRoute>}/>
       
       
       
       {/* You can add more routes for other pages */}
     </Routes>
   </Router>
  );
}

export default App;

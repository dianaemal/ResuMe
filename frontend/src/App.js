
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

function App() {
  return (

     <Router>
      <Header/>
     <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/title" element={<Title/>}/>
       <Route path="/title/:id" element={<Title/>}/>
       <Route path="/contact-info" element ={<ContactInfo/>}/>
       <Route path="/contact-info/:urlId" element={<ContactInfo />} />
       <Route path="/educationForm" element={<Education/>}/>
       <Route path="/education" element={<EducationView/>}/>
       <Route path="/edit-education" element={<EducationEdit/>}/>
       <Route path="/work-experience" element={<WorkView/>}/>
       <Route path="/work-experienceForm" element={<Work/>}/>
       <Route path="/work-description" element={<WorkDescription/>}/>
       <Route path="/edit-description" element={<EditDescription/>}/>
       <Route path="/edit-workExperience" element={<WorkEdit/>}/>
       <Route path="/skills" element={<Skills/>}/>
       <Route path="/summary" element={<Summary/>}/>
       <Route path="/resume" element={<Resume/>}/>
       <Route path="/register" element={<SignUp/>}/>
       <Route path="/login" element={<LogIn/>}/>
       
       {/* You can add more routes for other pages */}
     </Routes>
   </Router>
  );
}

export default App;

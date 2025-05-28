import react from 'react';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import ReactQuill from 'react-quill';
import ResumePreview from './ResumePreview';
import 'react-quill/dist/quill.snow.css';
function EditDescription(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
    
    const [workDescription, setDescription] = useState(null);
    console.log(workDescription)
    useEffect(()=>{
        if (resumeId && workId){

            axiosInstance.get(`/api/resumes/${resumeId}/work/${workId}/description`)
            .then((res)=>{
                if (res.status === 200 || res.status === 201){
                    if (res.data){
                        setDescription(res.data.description);
                    }
                }
            })
            .catch((error) => console.error('Error fetching resume:', error));

            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work/${workId}/description`)
            .then((res)=>{
                if(res.ok){
                    return res.json();
                }
            })
            .then((data)=>{
                setDescription(data.description);
            })
            .catch((error) => console.error('Error fetching resume:', error));*/
        }

    }, [resumeId, workId])
    

    const handleSubmit = async()=>{

        const response = await axiosInstance.put(`/api/resumes/${resumeId}/work/${workId}/description`, { description: workDescription })
        if (response.status === 200 || response.status === 201){
            navigate(`/work-experience`, { state: { id: resumeId } });
        }
        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work/${workId}/description`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({ description: workDescription })
        })
        if(response.ok){
            
            navigate(`/work-experience`, { state: { id: resumeId } });
        }*/


        
    }
    const navigate = useNavigate();

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['undo', 'redo'],
        ],
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      };



    return (
       <div className='gridContainer'>
                   <div className='progression'></div>
               <div style={{width: '600px', }}>
               <form onSubmit={(e)=>{
                   e.preventDefault();
                   handleSubmit();
               }}>
                   <h3 >Write discription for your job:</h3>
                   <div style={{marginTop: '20px'}}>
                   <ReactQuill className="my-editor"
                       
                       
                       value={workDescription}
                       onChange={(value)=> {
                           if (value === '<p><br></p>'){
                               setDescription('')
                           }
                           else{
                               setDescription(value)
                           }
                       }}
                           
                           
                   />
                   </div>
                   <div  style={{  position: 'relative', marginTop: '20px'}}>
                   <button style={{right: '0', position: 'absolute'}} className='button4' type="submit">Next</button>
                   </div>
               </form>
       
               </div>
               <div className='resumePreview'>
                   <ResumePreview prop={{description: workDescription, identity: 'exp', workId: workId, id:resumeId}}/>
               </div>
               </div>
           )
       
}
export default EditDescription;

import React from 'react';

export default function TemplateModernSidebar({ resume, workList, educationList, forwardedRef }) {
  return (
    <div className="resume-template" ref={forwardedRef} style={{
      width: '8.5in',
      height: '11in',
      backgroundColor: '#fff',
      padding: '1.1in 0.7in',
      paddingTop: '1.2in',
      fontFamily: ' Avenir, sans-serif',
      fontSize: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0mm',
      color: '#666',
      border: '2px solid #ddd',
    }}>

         {/* Name */}
         <div style={{ borderBottom: '1px solid #616A6B', borderTop: '1px solid #616A6B', padding: '35px', marginTop: '-50px' }}>
         
          <h1 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginTop: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#494F4F',
            textAlign: 'center'
          }}>
            {(resume.contactInfo?.f_name || 'First') + ' ' + (resume.contactInfo?.l_name || 'Last')}
          </h1>
        </div>

    <div style={{display: 'flex', gap: '20px', marginTop: '0mm'}}>

      {/* Left Sidebar */}
         
      <div style={{paddingTop: '15mm', width: '39%', display: 'flex', flexDirection: 'column', gap: '25px', borderRight: '1px solid #616A6B'}}>
        {/* Contact */}
        <Section title="Contact">
          {resume.contactInfo?.email && <div>✉️ {resume.contactInfo.email}</div>}
          {resume.contactInfo?.phone_number && <div>📞 {resume.contactInfo.phone_number}</div>}
          {resume.contactInfo?.city && <div>📍 {resume.contactInfo.city}</div>}
        
        </Section>

         {/* Education */}
         <Section title="Education">
          {educationList.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>
                {edu.degree} in {edu.study_feild || 'Field'}
              </div>
              <div style={{ fontSize: '13px', color: '#666' }}>
                {edu.school_name}, {edu.location || ''} | {edu.start_year} - {edu.graduation_year}
              </div>
              {edu.gpa && <div style={{ fontSize: '13px', color: '#999' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Skills">
         <div dangerouslySetInnerHTML={{ __html: resume.skills?.skills}}/>
        </Section>

       
      </div>

      {/* Main Content */}
      <div style={{ paddingTop: '15mm', display: 'flex', flexDirection: 'column', gap: '22px', width: '61%'}}>
          
        
        

        {/* Summary */}
        <Section title="Summary">
          <div dangerouslySetInnerHTML={{ __html: resume.summary?.summary}}/>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          {workList.map((job, idx) => (
            <div key={idx} style={{ marginBottom: '16px' }}>
              <div style={{ color: '#494F4F', fontWeight: 'bold', fontSize: '15px' }}>
                {job.position || 'Job Title'} <div style={{ color: '#616A6B' }}> {job.employer}</div>
              </div>
              <div style={{ fontSize: '13px', color: '#666' }}>
                {job.location || 'Location'} | {job.start_month || ''} {job.start_year} - {job.end_month || ''} {job.end_year || (job.is_current ? 'Present' : '')}
              </div>
              <div style={{ marginTop: '10px', paddingLeft: '18px', lineHeight: 1.6, fontSize: '14px' }}>
                <div dangerouslySetInnerHTML={{ __html: job.description?.description}}/>
              </div>
            </div>
          ))}
        </Section>

       
      </div>
      </div>
    </div>
  );
}

// Reusable Section Component
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 style={{
        fontSize: '17px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#494F4F',
        marginBottom: '6px',
        letterSpacing: '2px'
      }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

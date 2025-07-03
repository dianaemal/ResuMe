import React from 'react';

export default function TeTemplateTimeline({ resume, workList, educationList, forwardedRef }) {
  return (
    <div className="resume-template" ref={forwardedRef} style={{
        margin: '0.4in',
        width: '8.5in',
        height: '11in',
        padding: '0.4in',
        paddingLeft:'0.4in',
        fontFamily: 'Helvetica, Arial, sans-serif',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ddd',
    }}>
      {/* Name */}
      <h1 style={{
        fontSize: '40px',
        fontWeight: 700,
        letterSpacing: '6px',
        textAlign: 'center',
       
        marginTop: '25px',
        color: '#222',
      }}>
        {(resume.contactInfo?.f_name || 'First') + ' ' + (resume.contactInfo?.l_name || 'Last')}
      </h1>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '25px', marginTop: '12mm'}}>
        {/* Left Sidebar */}
        <div style={{ height: '100%', width: '38%', backgroundColor: '#F9DFD9', padding:'5mm'}}>
          {/* Contact */}
          <Section title="Contact">
            {resume.contactInfo?.phone_number && <div>📞 {resume.contactInfo.phone_number}</div>}
            {resume.contactInfo?.email &&  <div>✉️ {resume.contactInfo.email}</div>}
            {resume.contactInfo?.city && <div>📍 {resume.contactInfo.city}</div>}
            {resume.contactInfo?.website && <div>🌐 {resume.contactInfo.website}</div>}
          </Section>

          {/* Education */}
          <Section title="Education">
            {educationList?.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <div><strong>{edu.start_year} - {edu.graduation_year}</strong></div>
                <div style={{ fontWeight: 'bold' }}>{edu.school_name}</div>
                <div>{edu.degree} {edu.study_feild ? `in ${edu.study_feild}` : ''}</div>
                {edu.gpa && <div style={{ fontSize: '13px', color: '#777' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div  dangerouslySetInnerHTML={{ __html: resume.skills?.skills}}/>
            
          </Section>
          <Section title="References">
            <div>Available upon request</div>
          </Section>

          
          
        </div>

        {/* Right Content */}
        <div style={{marginTop: '5mm', width: '62%'}} >
          {/* Profile Summary */}
          <Section title="Summary">
            <div dangerouslySetInnerHTML={{ __html: resume.summary?.summary}}/>
            
          </Section>

          {/* Work Experience */}
          <Section title="Work Experience">
            {workList.map((work, idx) => (
              <div key={idx} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <div>{work.employer}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {work.start_year} - {work.end_year || (work.is_current ? 'Present' : '')}
                  </div>
                </div>
                <div style={{ color: '#667eea', fontWeight: '600' }}>{work.position}</div>
                <div style={{ marginLeft:'0mm', marginTop: '6px', fontSize: '15px', lineHeight: 1.5 }}>
                <div dangerouslySetInnerHTML={{ __html: work.description?.description }}/>
                </div>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

// Simple reusable section title + content
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '50px' }}>
      <h3 style={{
        fontSize: '15px',
        textTransform: 'uppercase',
        fontWeight: '800',
        color: '#444',
        letterSpacing: '2px',
        marginBottom: '10px',
      }}>
        {title}
      </h3>
      <div style={{ fontSize: '14.5px', color: '#333', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

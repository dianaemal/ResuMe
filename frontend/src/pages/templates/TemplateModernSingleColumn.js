import React from 'react';

export default function ResumeModernElegant({ resume, workList, educationList, forwardedRef }) {
  return (
    <div className="resume-template" ref={forwardedRef} style={{
      width: '8.5in',
      height: '11in',
      backgroundColor: '#fff',
      padding: '0.6in 0.8in',
      fontFamily: 'Helvetica, sans-serif',
      color: '#222',
      fontSize: '15px',
      lineHeight: '1.45',
      border: '1px solid #ddd'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1 style={{
          fontSize: '34px',
          fontWeight: 'bold',
          margin: 0,
          letterSpacing: '1px'
        }}>
          {resume.contactInfo?.f_name || 'First'} {resume.contactInfo?.l_name || 'Last'}
        </h1>
       
        <div style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          fontSize: '14px',
          color: '#444',
          
        }}>
          {resume.contactInfo?.phone_number || '1.123.1234.123'} • {resume.contactInfo?.email || 'email@email.com'} • {resume.contactInfo?.city || 'City'}, {resume.contactInfo?.province || 'State'}
         
        </div>
      </header>

      {/* Professional Profile */}
      {resume.summary?.summary && (
        <Section title="SUMMARY">
          <div dangerouslySetInnerHTML={{ __html: resume.summary.summary }} />
        </Section>
      )}

      {/* Work Experience */}
      <Section title="WORK EXPERIENCE">
        {workList.map((job, idx) => (
          <div key={idx} style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 'bold' }}>
              {job.position}
              <span style={{ float: 'right',fontSize: '14px', textDecoration: 'none'}}>
               {job.location || ''}
              </span>
            </div>
            <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
              {job.employer}
              <span style={{ float: 'right',  color: '#555', fontSize: '14px', textDecoration: 'none'}}>
                {job.start_month}, {job.start_year} - {job.end_month}, {job.end_year || (job.is_current ? 'Present' : '')}
              </span>
            </div>
            <div style={{ paddingLeft: '14px', marginTop: '4px' }}>
              <div dangerouslySetInnerHTML={{ __html: job.description?.description || '' }} />
            </div>
          </div>
        ))}
      </Section>

      {/* Education */}
      <Section title="EDUCATION">
        {educationList.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 'bold' }}>
              {edu.degree}
              <span style={{ float: 'right', fontSize: '14px', textDecoration: 'none' }}>
                {edu.location || ''}
              </span>
            </div>
            <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
              {edu.school_name}
              <span style={{ float: 'right', color: '#555', fontSize: '14px', textDecoration: 'none' }}>
                {edu.start_year} - {edu.graduation_year}
              </span>
            </div>
          </div>
        ))}
      </Section>

      {/* Skills */}
      {resume.skills?.skills && (
        <Section title="KEY SKILLS">
          {renderSkills(resume.skills.skills)}
        </Section>
      )}
    </div>
  );
}

// Section Component
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <h3 style={{
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#333',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '6px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '2px'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// Skills Renderer
function renderSkills(skillsHtml) {
  const temp = document.createElement('div');
  temp.innerHTML = skillsHtml || '';
  
  // Check if content is already a list (ul or ol)
  const ul = temp.querySelector('ul');
  const ol = temp.querySelector('ol');
  
  if (ul || ol) {
    // If it's already a list, split into columns
    const listElement = ul || ol;
    const items = Array.from(listElement.querySelectorAll('li')).map(li => li.textContent);
    const listType = ul ? 'disc' : 'decimal';
    
    return (
      <ul style={{ paddingLeft: 18, listStyle: listType, columns: 2, gap: '40px' }}>
        {items.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
      </ul>
    );
  } else {
    // If it's not a list, display as-is without bullet points
    return (
      <div dangerouslySetInnerHTML={{ __html: skillsHtml }} />
    );
  }
}

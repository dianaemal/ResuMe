import React from 'react';

const sectionBlue = '#1d4ed8';

export default function TemplateModernSidebar({ resume, workList, educationList, forwardedRef }) {
  // Helper to render skills as a two-column bullet list
  function renderSkills(skillsHtml) {
    const temp = document.createElement('div');
    temp.innerHTML = skillsHtml || '';
    let items = [];
    const ul = temp.querySelector('ul');
    if (ul) {
      items = Array.from(ul.querySelectorAll('li')).map(li => li.textContent);
    } else {
      items = temp.innerHTML.split(/<br\s*\/?>|\n/).map(s => s.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    }
    const mid = Math.ceil(items.length / 2);
    const col1 = items.slice(0, mid);
    const col2 = items.slice(mid);
    return (
      <div style={{ display: 'flex', gap: '32px', marginTop: 8 }}>
        <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc', flex: 1 }}>
          {col1.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
        </ul>
        <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc', flex: 1 }}>
          {col2.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className="resume-template" ref={forwardedRef} style={{
      width: '8.5in',
      height: '11in',
      backgroundColor: '#fff',
      padding: '1in 0.8in',
      fontFamily: 'Arial, sans-serif',
      
      color: '#333',
      fontSize: '15px',
      lineHeight: '1.6',
      border: '2px solid #ddd',
    }}>
      
      {/* Header */}
      <header style={{ marginBottom: '15px' }}>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#1c1c84',
          marginBottom: '0px',
          textTransform: 'uppercase',
        }}>
          {resume.contactInfo?.f_name || 'First'} {resume.contactInfo?.l_name || 'Last'}
        </h1>
        <p style={{ marginBottom: '20px', marginTop: '0' }}>
          {resume.contactInfo?.email || 'email@example.com'} | {resume.contactInfo?.phone_number || '000-000-0000'} | {resume.contactInfo?.address || 'Address'}
        </p>
       
        <hr style={{ marginTop: '30px', border: '5px solid #1c1c84' }} />
      </header>

      {/* Summary */}
      {resume.summary?.summary && (
        <div>
        <Section title="SUMMARY">
        <div dangerouslySetInnerHTML={{ __html: resume.summary.summary }} />
        </Section>
       
        </div>
      )}

      {/* Work Experience */}
      <Section title="WORK EXPERIENCE">
        {workList.map((job, idx) => (
          <div key={idx} style={{ marginBottom: '18px' }}>
            <div style={{ fontWeight: 'bold' }}>
              {job.position}
              <span style={{ float: 'right', fontWeight: 'normal', color: '#555', fontSize: '14px', textDecoration: 'none' }}>
                {job.start_month} {job.start_year} - {job.end_month} {job.end_year || (job.is_current ? 'Present' : '')}
              </span>
              <div style={{ fontSize: '14px', color: '#666' }}>{job.employer}</div>
            </div>
            <div style={{ marginTop: '5px', paddingLeft: '20px' }}>
              <div dangerouslySetInnerHTML={{ __html: job.description?.description }} />
            </div>
          </div>
        ))}
      </Section>

      {/* Education */}
      <Section title="EDUCATION">
        {educationList.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '12px' }}>
            <strong>{edu.degree}</strong>
            <div style={{ fontSize: '13px' }}>
              {edu.school_name}
              {edu.location && `, ${edu.location}`} | {edu.start_year} - {edu.graduation_year}
            </div>
            
          </div>
        ))}
      </Section>

      {/* Skills */}
      {resume.skills?.skills && (
        <Section style={{ borderBottom: 'none' }} title="KEY SKILLS">
          {renderSkills(resume.skills.skills)}
        </Section>
      )}
    </div>
  );
}

// Reusable Section Component
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'row', gap: '20px', borderBottom: '1px solid #1c1c84'}}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#1c1c84',
        textTransform: 'uppercase',
        marginBottom: '20px',
       
        paddingBottom: '4px',
        width: '20%'
      }}>{title}</h3>
      <div style={{width: '85%'}}>{children}</div>
    </div>
  );
}
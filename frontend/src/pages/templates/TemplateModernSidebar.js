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

  // Check if we have any contact info to display
  const hasContactInfo = resume.contactInfo && (
    resume.contactInfo.phone_number || 
    resume.contactInfo.email || 
    resume.contactInfo.address
  );

  // Check if we have name to display
  const hasName = resume.contactInfo && (
    resume.contactInfo.f_name || 
    resume.contactInfo.l_name
  );

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
      overflow: 'hidden',
    }}>
      
      {/* Header - only show if we have name or contact info */}
      {(hasName || hasContactInfo) && (
        <header style={{ marginBottom: '15px' }}>
          {/* Name - only show if we have a name */}
          {hasName && (
            <h1 style={{
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#1c1c84',
              marginBottom: '0px',
              textTransform: 'uppercase',
            }}>
              {[resume.contactInfo.f_name, resume.contactInfo.l_name].filter(Boolean).join(' ')}
            </h1>
          )}
          
          {/* Contact info - only show if we have contact info */}
          {hasContactInfo && (
            <p style={{ marginBottom: '20px', marginTop: '0' }}>
              {[
                resume.contactInfo.email,
                resume.contactInfo.phone_number,
                resume.contactInfo.address
              ].filter(Boolean).join(' | ')}
            </p>
          )}
         
          <hr style={{ marginTop: '30px', border: '5px solid #1c1c84' }} />
        </header>
      )}

      {/* Summary - only show if we have summary */}
      {resume.summary?.summary && (
        <div>
        <Section title="SUMMARY" id="summary">
          <div className="no-list-indent" dangerouslySetInnerHTML={{ __html: resume.summary.summary }} />
        </Section>
       
        </div>
      )}

      {/* Work Experience - only show if we have work experience */}
      {workList && workList.length > 0 && (
        <Section title="WORK EXPERIENCE" id="experience">
          {workList.map((job, idx) => (
            <div key={idx} style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 'bold' }}>
                {job.position}
                <span style={{ float: 'right', fontWeight: 'normal', color: '#555', fontSize: '14px', textDecoration: 'none' }}>
                  {job.start_month} {job.start_year} - {job.end_month} {job.end_year || (job.is_current ? 'Present' : '')}
                </span>
                <div style={{ fontSize: '14px', color: '#666' }}>{job.employer}</div>
              </div>
              {job.description?.description && (
                <div style={{ marginTop: '5px', paddingLeft: '20px' }}>
                  <div className="no-list-indent" dangerouslySetInnerHTML={{ __html: job.description.description }} />
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education - only show if we have education data */}
      {educationList && educationList.length > 0 && (
        <Section title="EDUCATION" id="education">
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
      )}

      {/* Skills - only show if we have skills */}
      {resume.skills?.skills && (
        <Section style={{ borderBottom: 'none' }} title="KEY SKILLS" id="skills">
          <div className="no-list-indent">{renderSkills(resume.skills.skills)}</div>
        </Section>
      )}
    </div>
  );
}

// Reusable Section Component
function Section({ title, children, id }) {
  return (
    <div id={id} style={{ marginBottom: '15px', display: 'flex', flexDirection: 'row', gap: '20px', borderBottom: '1px solid #1c1c84'}}>
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
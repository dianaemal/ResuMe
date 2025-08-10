import React from 'react';

export default function TemplateTimeline({ resume, workList, educationList, forwardedRef }) {
  // Check if we have any contact info to display
  const hasContactInfo = resume.contactInfo && (
    resume.contactInfo.phone_number || 
    resume.contactInfo.email || 
    resume.contactInfo.city || 
    resume.contactInfo.website
  );

  // Check if we have name to display
  const hasName = resume.contactInfo && (
    resume.contactInfo.f_name || 
    resume.contactInfo.l_name
  );

  return (
    <div className="resume-template" ref={forwardedRef} style={{
       // margin: '0.4in',
        width: '8.5in',
        height: '11in',
        padding: '0.4in',
        paddingLeft:'0.4in',
        fontFamily: 'Helvetica, Arial, sans-serif',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #ddd',
        overflow: 'hidden',
    }}>
      {/* Name - only show if we have a name */}
      {hasName && (
        <h1 style={{
          fontSize: '40px',
          fontWeight: 700,
          letterSpacing: '6px',
          textAlign: 'center',
         
          marginTop: '25px',
          color: '#222',
        }}>
          {[resume.contactInfo.f_name, resume.contactInfo.l_name].filter(Boolean).join(' ')}
        </h1>
      )}

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '25px', marginTop: '12mm'}}>
        {/* Left Sidebar */}
        <div style={{ height: '100%', width: '38%', backgroundColor: '#F9DFD9', padding:'5mm'}}>
          {/* Contact - only show if we have contact info */}
          {hasContactInfo && (
            <Section title="Contact" id="contact">
              {resume.contactInfo.phone_number && <div>📞 {resume.contactInfo.phone_number}</div>}
              {resume.contactInfo.email && <div>✉️ {resume.contactInfo.email}</div>}
              {resume.contactInfo.city && <div>📍 {resume.contactInfo.city}</div>}
              {resume.contactInfo.website && <div>🌐 {resume.contactInfo.website}</div>}
            </Section>
          )}

          {/* Education - only show if we have education data */}
          {educationList && educationList.length > 0 && (
            <Section title="Education" id="education">
              {educationList.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  
                  <div style={{ fontWeight: 'bold' }}>{edu.school_name}</div>
                  <div>{edu.degree} {edu.study_feild ? `in ${edu.study_feild}` : ''}</div>
                  <div><strong>{edu.start_year} - {edu.graduation_year}</strong></div>
                 
                </div>
              ))}
            </Section>
          )}

          {/* Skills - only show if we have skills */}
          {resume.skills?.skills && (
            <Section title="Skills" id="skills">
              <div className="no-list-indent" dangerouslySetInnerHTML={{ __html: resume.skills.skills}}/>
            </Section>
          )}

          {/* References - always show */}
          <Section title="References">
            <div>Available upon request</div>
          </Section>
        </div>

        {/* Right Content */}
        <div style={{marginTop: '5mm', width: '62%'}} >
          {/* Profile Summary - only show if we have summary */}
          {resume.summary?.summary && (
            <Section title="Summary" id="summary">
              <div className="no-list-indent" dangerouslySetInnerHTML={{ __html: resume.summary.summary}}/>
            </Section>
          )}

          {/* Work Experience - only show if we have work experience */}
          {workList && workList.length > 0 && (
            <Section title="Work Experience" id="experience">
              {workList.map((work, idx) => (
                <div key={idx} style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <div>{work.employer}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {work.start_year} - {work.end_year || (work.is_current ? 'Present' : '')}
                    </div>
                  </div>
                  <div style={{ color: '#667eea', fontWeight: '600' }}>{work.position}</div>
                  {work.description?.description && (
                    <div style={{ marginLeft:'0mm', marginTop: '6px', fontSize: '15px', lineHeight: 1.5 }}>
                      <div className="no-list-indent" dangerouslySetInnerHTML={{ __html: work.description.description }}/>
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple reusable section title + content
function Section({ title, children, id }) {
  return (
    <div id={id} style={{ marginBottom: '50px' }}>
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

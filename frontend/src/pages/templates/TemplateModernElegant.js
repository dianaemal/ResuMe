import React from 'react';

export default function TemplateModernElegant({ resume, workList, educationList, forwardedRef }) {
  function renderSkills(skillsHtml) {
    const temp = document.createElement('div');
    temp.innerHTML = skillsHtml || '';
    const ul = temp.querySelector('ul');
    const ol = temp.querySelector('ol');

    if (ul || ol) {
      const listElement = ul || ol;
      const items = Array.from(listElement.querySelectorAll('li')).map(li => li.textContent);
      const listType = ul ? 'disc' : 'decimal';

      return (
        <ul style={{ paddingLeft: 18, listStyle: listType, columns: 2, gap: '40px' }}>
          {items.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
        </ul>
      );
    } else {
      return <div dangerouslySetInnerHTML={{ __html: skillsHtml }} />;
    }
  }

  return (
    <div className="resume-template" ref={forwardedRef} style={{
      width: '8.5in',
      height: '11in',
      backgroundColor: '#fff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#1a1a1a',
      fontSize: '14px',
      lineHeight: '1.45',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        padding: '40px 45px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
        }} />

        {/* Name */}
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px',
            color: '#ffffff',
          }}>
            {resume.contactInfo?.f_name || 'First'} {resume.contactInfo?.l_name || 'Last'}
          </h1>
        </div>

        {/* Contact Info */}
        <div style={{ fontSize: '13px', lineHeight: '1.8', minWidth: '240px'}}>
          {[
            { icon: '✉️', value: resume.contactInfo?.email || 'email@example.com' },
            { icon: '📞', value: resume.contactInfo?.phone_number || '+1 (555) 123-4567' },
            { icon: '📍', value: `${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.province || 'State'}` }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <span style={{ width: '20px', marginRight: '6px', color: '#94a3b8', textAlign: 'center', textDecoration: 'none' }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: 'left',textDecoration: 'none' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 45px', backgroundColor: '#ffffff' }}>

        {/* Summary */}
        {resume.summary?.summary && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={sectionTitle}>Professional Summary</h2>
            <div style={sectionText} dangerouslySetInnerHTML={{ __html: resume.summary.summary }} />
          </div>
        )}

        {/* Work Experience */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={sectionTitle}>Professional Experience</h2>
          {workList.map((job, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={lineBetween}>
                <strong style={leftSide}>{job.position}</strong>
                <span style={rightSide}>
                  {job.start_month} {job.start_year} - {job.end_month} {job.end_year || (job.is_current ? 'Present' : '')}
                </span>
              </div>
              <div style={lineBetween}>
                <span style={{ ...leftSide, color: '#3b82f6', fontWeight: '500' }}>{job.employer}</span>
                <span style={rightSide}>{job.location}</span>
              </div>
              <div style={sectionText} dangerouslySetInnerHTML={{ __html: job.description?.description || '' }} />
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={sectionTitle}>Education</h2>
          {educationList.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={lineBetween}>
                <strong style={leftSide}>{edu.degree}</strong>
                <span style={rightSide}>{edu.start_year} - {edu.graduation_year}</span>
              </div>
              <div style={lineBetween}>
                <span style={{ ...leftSide, color: '#3b82f6', fontWeight: '500' }}>{edu.school_name}</span>
                <span style={rightSide}>{edu.location && `${edu.location}`}</span>
              </div>
            </div>
          ))}
        </div>
         {/* Skills */}
         {resume.skills?.skills && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={sectionTitle}>Skills</h2>
            <div style={{ fontSize: '14px' }}>{renderSkills(resume.skills.skills)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable styles
const sectionTitle = {
  fontSize: '17px',
  fontWeight: '600',
  color: '#1e293b',
  margin: '0 0 8px 0',
  borderBottom: '2px solid #3b82f6',
  paddingBottom: '2px',
};

const sectionText = {
  fontSize: '14px',
  color: '#475569',
  lineHeight: '1.45',
  marginTop: '2px'
};

const lineBetween = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '3px'
};

const leftSide = {
  fontSize: '14px',
   color: '#1e293b',
   textDecoration: 'none'

};

const rightSide = {
  fontSize: '13px',
  color: '#64748b',
  textDecoration: 'none'
};

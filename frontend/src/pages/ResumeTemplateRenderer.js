import React from 'react';
import '../CSS/Resume.css';
import TemplateSidebar from './templates/TemplateSidebar';
import TemplateTimeline from './templates/TemplateTimeline';
import TemplateModernSidebar from './templates/TemplateModernSidebar';
import ResumeModernElegant from './templates/TemplateModernSingleColumn';
import TemplateModernElegant from './templates/TemplateModernElegant';


export default function ResumeTemplateRenderer({ resume, template, workList, educationList, forwardedRef }) {
  switch (template) {
    case 'template1':
      return <TemplateSidebar resume={resume} workList={workList} educationList={educationList} forwardedRef={forwardedRef} />;
    case 'template2':
       return <TemplateTimeline resume={resume} workList={workList} educationList={educationList} forwardedRef={forwardedRef} />;
    case 'template3':
      return <TemplateModernSidebar resume={resume} workList={workList} educationList={educationList} forwardedRef={forwardedRef} />;
    case 'template4':
      return <ResumeModernElegant resume={resume} workList={workList} educationList={educationList} forwardedRef={forwardedRef} />;
    case 'template5':
      return <TemplateModernElegant resume={resume} workList={workList} educationList={educationList} forwardedRef={forwardedRef} />;
    default:
      return <TemplateSidebar resume={resume} workList={workList} educationList={educationList} forwardedRef={forwardedRef} />;
  }
} 
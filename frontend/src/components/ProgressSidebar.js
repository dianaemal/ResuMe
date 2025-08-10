import React from 'react';
import PropTypes from 'prop-types';
import './ProgressSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * steps: [{ label: string }]
 * currentStep: number (0-based)
 */
export default function ProgressSidebar({ steps, currentStep }) {
  return (
    <nav className="progress-sidebar">
      <ul className="progress-sidebar-list">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <li
              key={step.label}
              className={`progress-sidebar-step${isCompleted ? ' completed' : ''}${isCurrent ? ' current' : ''}`}
            >
              <div className="progress-sidebar-circle-wrapper">
                <span className="progress-sidebar-circle">
                  {isCompleted ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    idx + 1
                  )}
                </span>
                {idx !== steps.length - 1 && <div className="progress-sidebar-connector" />}
              </div>
              <span className="progress-sidebar-label">{step.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

ProgressSidebar.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
}; 
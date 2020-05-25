import React from 'react';
import ProgressBar from './ProgressBar';
import './ProgressIndicator.scss';

export type BuilderProgress = {
  completed: number;
  total: number;
};

const ProgressIndicator: React.SFC<BuilderProgress> = (props) => {
  const { completed, total } = props;

  const progressOrZero = total === 0 ? 0 : completed / total;

  return (
    <div className="progress-indicator">
      <div>Preparing...</div>
      {completed > 0 && <div>{`${completed}/${total} prepared`}</div>}
      <div className="progress-indicator__bar">
        <ProgressBar progress={progressOrZero} />
      </div>
    </div>
  );
};

export default ProgressIndicator;

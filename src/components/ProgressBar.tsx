import React from 'react';
import './ProgressBar.scss';
import classNames from 'classnames';

export enum Height {
  SMALL
}

type PropTypes = {
  progress: number;
  transparent?: boolean;
  fullWidth?: boolean;
  height?: Height;
  rounded?: boolean;
};

const ProgressBar: React.SFC<PropTypes> = ({
  progress,
  transparent = false,
  fullWidth = false,
  height,
  rounded = false
}) => {
  const baseClass = 'progress-bar';

  const className = classNames(baseClass, {
    [`${baseClass}--transparent`]: transparent,
    [`${baseClass}--full-width`]: fullWidth,
    [`${baseClass}--height-small`]: height === Height.SMALL,
    [`${baseClass}--rounded`]: rounded
  });

  return (
    <div>
      <div className={className}>
        <div
          className="progress-bar__filler"
          style={{ width: `${Math.trunc(progress * 100)}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

import React from "react";
import classNames from "classnames";

import "./Button.scss";

export enum ButtonWidth {
  NARROW = "narrow",
  NORMAL = "normal",
  WIDE = "wide",
  FULL = "full",
}

export enum ButtonSize {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
  X_SMALL = "x-small",
}

type PropTypes = {
  onClick: (event: any) => void;
  children: React.ReactNode;
  size?: ButtonSize;
};

const BASE_CLASS = "button";

const Button: React.SFC<PropTypes> = ({
  onClick,
  children,
  size = ButtonSize.NORMAL,
}) => {
  const className = classNames(BASE_CLASS, {
    [`${BASE_CLASS}--size-${size}`]: true,
  });

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;

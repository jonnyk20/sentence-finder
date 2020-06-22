import React, { ReactElement, ChangeEvent } from "react";

import { CardPlacementType, CardPropertyType } from "../../constants/cardTypes";

import "./CardOption.scss";

const BASE_CLASS = "card-option";

type PropsType = {
  updateOption: (
    cardProperty: CardPropertyType,
    placement: CardPlacementType
  ) => void;
  cardProperty: CardPropertyType;
  placement: CardPlacementType;
};

const CardOption: React.SFC<PropsType> = ({
  updateOption,
  cardProperty,
  placement,
}): ReactElement => {
  const property = (cardProperty as unknown) as string;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateOption(cardProperty, e.target.value as CardPlacementType);
  };

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}__name`}>{cardProperty}: &nbsp;</div>
      <input
        type="radio"
        value={CardPlacementType.FRONT}
        name={property}
        checked={placement === CardPlacementType.FRONT}
        className={`${BASE_CLASS}__option`}
        onChange={onChange}
      />
      <input
        type="radio"
        value={CardPlacementType.BACK}
        name={property}
        checked={placement === CardPlacementType.BACK}
        className={`${BASE_CLASS}__option`}
        onChange={onChange}
      />
      <input
        type="radio"
        value={CardPlacementType.OFF}
        name={property}
        checked={placement === CardPlacementType.OFF}
        className={`${BASE_CLASS}__option`}
        onChange={onChange}
      />
    </div>
  );
};

export default CardOption;

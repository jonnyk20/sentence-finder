import React, { useState, ReactElement } from 'react';

import './SelectionList.scss';
import { isNilOrEmpty } from '../../utils/utils';

export type SelectionOptionValueType = string | number;

const SelectionListItem: React.SFC<SelecitonlistOptionType> = ({
  key,
  label,
}): ReactElement => (
  <option value={key} className="seleciton-list__item" key={key}>
    {label}
  </option>
);

export type SelecitonlistOptionType = {
  key: SelectionOptionValueType;
  label: string;
};

type SelectionListPropsType = {
  options: SelecitonlistOptionType[];
  defaultText?: string;
  onChange: (option: string) => void;
  initialValue?: string;
};

const SelectionList: React.SFC<SelectionListPropsType> = ({
  options,
  defaultText,
  onChange,
  initialValue,
}): ReactElement => {
  const [value, setValue] = useState<string>(initialValue || '');

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    const { value } = target;
    setValue(target.value);
    onChange(value);
  };

  return (
    <select className="selection-list" value={value} onChange={handleChange}>
      {isNilOrEmpty(defaultText) && (
        <option value="" disabled>
          {defaultText}
        </option>
      )}
      {options.map(SelectionListItem)}
    </select>
  );
};

export default SelectionList;

import React, { useEffect } from 'react';

import './Sandbox.scss';
import Button from '../components/Button';

const getTranslations = async () => {
  const res = await fetch('/translate');
  const json = await res.json();

  console.log('JSON', json);
};

const BASE_CLASS = 'sandbox';

const Sandbox = () => {
  return (
    <div className={`${BASE_CLASS} container`}>
      <div style={{ background: 'white' }}>
        <Button onClick={getTranslations}>Translate</Button>
      </div>
    </div>
  );
};

export default Sandbox;

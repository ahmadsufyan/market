import React from 'react';
import { Button } from '@mui/material';
import style from './style.module.css';

function FirstScreen() {
  return (
    <div className={style['container']}>
			<Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </div>
  );
}

export default FirstScreen;

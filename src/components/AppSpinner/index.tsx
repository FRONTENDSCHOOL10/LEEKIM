import { memo } from 'react';
import S from './style.module.scss';

function AppSpinner() {
  return (
    <div className={S.component}>
      <span className={S.loader}></span>
    </div>
  );
}

export default memo(AppSpinner);

import { memo } from 'react';
import S from './style.module.scss';

function AppSpinner() {
  return <div className={S.component}>로딩중</div>;
}

export default memo(AppSpinner);

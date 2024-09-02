import { memo } from 'react';
import S from './style.module.scss';

function Divider() {
  return <div className={S.component}></div>;
}

export default memo(Divider);

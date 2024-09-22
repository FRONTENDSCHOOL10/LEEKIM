import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import S from './style.module.scss';

interface Textprops {
  title: string;
  subtitle: string;
}

function Text({ title, subtitle }: Textprops): ReactElement {
  return (
    <div className={S.warpper}>
      <p className={S.title}>{title}</p>
      <p className={S.subtitle}>{subtitle}</p>
      <NavLink to="/exhibition" style={{ textDecoration: 'none' }}>
        <p className={S.linktext}>전시 정보 바로가기</p>
      </NavLink>
    </div>
  );
}

export default Text;

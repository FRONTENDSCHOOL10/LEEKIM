import { memo, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import S from './style.module.scss';

function HomeButton({ imgSrc }: { imgSrc: string }): ReactElement {
  return (
    <NavLink to="/">
      <h1 className={S.component}>
        <p className="sr-only">메인페이지로 이동</p>
        <img src={imgSrc} alt="졸전닷컴 로고" />
      </h1>
    </NavLink>
  );
}

export default memo(HomeButton);

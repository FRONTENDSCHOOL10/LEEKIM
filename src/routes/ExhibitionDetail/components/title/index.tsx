import { ReactElement } from 'react';
import S from './style.module.scss';

interface TitleProps {
  title: string;
  subtitle: string;
  major: string;
}

function Title({ title, subtitle, major }: TitleProps): ReactElement {
  return (
    <div className={S.header}>
      <h1 className={S.title}>{title}</h1>
      <p className={S.subtitle}>
        {major} {subtitle} 졸업전시회
      </p>
    </div>
  );
}

export default Title;

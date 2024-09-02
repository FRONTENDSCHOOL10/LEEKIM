import { memo } from 'react';
import S from './style.module.scss';

function Profile({ name, email, link }: { name: string; email: string; link: string }) {
  return (
    <div className={S.component}>
      <p>{name}</p>
      <p>{email}</p>
      <a href={link} target="_blank" rel="noreferrer noopener">
        GITHUB
      </a>
    </div>
  );
}

export default memo(Profile);

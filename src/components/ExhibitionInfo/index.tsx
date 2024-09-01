import React, { memo } from 'react';
import S from './style.module.scss';

type ExhibitionInfoProps = {
  schoolName: string;
  major: string;
  posterUrl: string;
};

const ExhibitionInfo: React.FC<ExhibitionInfoProps> = ({ schoolName, major, posterUrl }) => {
  return (
    <div className={S.component}>
      <li>
        {/* 전시 포스터, 학교, 학과 정보 */}
        <figure className={S.poster}>
          <img src={posterUrl} alt={`${schoolName} ${major} 포스터`} />
          <figcaption className={S.schoolName}>{schoolName}</figcaption>
          <p>{major}</p>
        </figure>
      </li>
    </div>
  );
};

export default memo(ExhibitionInfo);

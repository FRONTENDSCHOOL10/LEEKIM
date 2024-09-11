import React, { memo } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';

type ExhibitionInfoProps = {
  schoolName: string;
  major: string;
  posterUrl: string;
  exhiId: string;
};

function ExhibitionInfo({ schoolName, major, posterUrl, exhiId }: ExhibitionInfoProps) {
  return (
    <div className={S.component}>
      <li>
        {/* 전시 포스터, 학교, 학과 정보 */}
        <NavLink to={`/exhibition/Detail/${exhiId}`}>
          <figure className={S.poster}>
            <img src={posterUrl} alt={`${schoolName} ${major} 포스터`} />
            <figcaption className={S.schoolName}>{schoolName}</figcaption>
            <p>{major}</p>
          </figure>
        </NavLink>
      </li>
    </div>
  );
}

export default memo(ExhibitionInfo);

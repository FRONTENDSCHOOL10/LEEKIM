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
    // 전시 포스터, 학교, 학과 정보
    <figure className={S.component}>
      <NavLink to={`/exhibition/detail/${exhiId}`}>
        <img src={posterUrl} alt={`${schoolName} ${major} 졸업전시 포스터`} />
        <figcaption className={S.schoolName}>{schoolName}</figcaption>
        <span>{major} 졸업전시</span>
      </NavLink>
    </figure>
  );
}

export default memo(ExhibitionInfo);

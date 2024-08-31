import { memo } from 'react';
import S from './style.module.scss';

const ExhibitionInfo = () => {
  const schoolName = '계원예술대학교'; // 임시
  const major = '디지털미디어디자인과 졸업 전시'; // 임시

  return (
    <div className={S.component}>
      <li>
        {/* 전시 포스터, 학교, 학과 정보 */}
        <figure className={S.poster}>
          <img src="/" alt="" />
          <figcaption className={S.schoolName}>{schoolName}</figcaption>
          <p>{major}</p>
        </figure>
      </li>
    </div>
  );
};

export default memo(ExhibitionInfo);

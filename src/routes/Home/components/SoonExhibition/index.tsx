import { memo, useEffect, useState } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ExhibitionSlider from '@/components/ExhibitionSlider';
import { ExhibitionData } from '@/types/ExhibitionData';

const dbApiUrl = import.meta.env.VITE_DB_API;

function SoonExhibition() {
  const [soonExhibitionData, setSoonExhibitionData] = useState<ExhibitionData[]>([]);

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  useEffect(() => {
    const getExhibitionData = async () => {
      const response = await axios.get(
        `${dbApiUrl}collections/Exhibition/records?sort=Start&filter=(Start>'${today}'%26%26IsApprove=true)&expand=School,Major&page=1&perPage=10`
      );
      setSoonExhibitionData(response.data.items);
    };

    getExhibitionData();
  }, []);

  return (
    <section className={S.component}>
      <div className={S.titleSection}>
        <h2 className={S.title}>진행 예정 전시</h2>
        <NavLink to={'/'} className={S.soonMore}>
          자세히 보기
        </NavLink>
      </div>
      {soonExhibitionData?.length > 0 ? (
        <ExhibitionSlider exhibitions={soonExhibitionData as ExhibitionData[]} />
      ) : (
        <p>현재 예정된 졸업 전시가 없습니다😭</p>
      )}
    </section>
  );
}

export default memo(SoonExhibition);

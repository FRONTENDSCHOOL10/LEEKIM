import { memo, useEffect, useState } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ExhibitionSlider from '@/components/ExhibitionSlider';
import { ExhibitionData } from '@/types/ExhibitionData';

const dbApiUrl = import.meta.env.VITE_DB_API;

function IngExhibition() {
  const [ingExhibitionData, setIngExhibitionData] = useState<ExhibitionData[]>([]);

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  useEffect(() => {
    const getExhibitionData = async () => {
      const response = await axios.get(
        `${dbApiUrl}collections/Exhibition/records?sort=Start&filter=(Start<='${today}'%26%26End>='${today}'%26%26IsApprove=true)&expand=School,Major`
      );
      setIngExhibitionData(response.data.items);
    };

    getExhibitionData();
  }, []);

  if (!ingExhibitionData) return <div>로딩 중</div>;

  return (
    <section className={S.component}>
      <div className={S.titleSection}>
        <h2 className={S.title}>진행 중 전시</h2>
        <NavLink to={'/'} className={S.ingMore}>
          자세히 보기
        </NavLink>
      </div>
      {ingExhibitionData?.length > 0 ? (
        <ExhibitionSlider exhibitions={ingExhibitionData as ExhibitionData[]} />
      ) : (
        <p>현재 진행 중인 졸업 전시가 없습니다😭</p>
      )}
    </section>
  );
}

export default memo(IngExhibition);

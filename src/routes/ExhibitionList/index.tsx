import React, { useEffect, useState } from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import Banner from './components/Banner/Banner';
import ExhibitionSlider from '@/components/ExhibitionSlider';
import FilterTag from './components/FilterTag/FilterTag';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ExhibitionData } from '@/types/ExhibitionData';

interface ExhibitionDataList {
  items: ExhibitionData[];
}

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export const Component: React.FC = () => {
  useDocumentTitle('전시 목록 | JJ.com');

  const [exhibitions, setExhibitions] = useState<ExhibitionDataList | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 전시 데이터 가져오는 API 여기서
    const fetchData = async () => {
      try {
        const response = await axios.get(`${pocketbaseUrl}/api/collections/Exhibition/records?expand=School,Major`);
        console.log(response.data);
        setExhibitions(response.data.items);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('문제 발생');
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!exhibitions) return <div>~~~</div>;

  return (
    <main id="page" className={S.component}>
      <Banner />
      <FilterTag />
      {/* 졸업 전시 리스트 부분 */}
      <section>
        <div className={S.listHeader}>
          <h2>졸업 전시 리스트</h2>

          <div>
            <label htmlFor="online">
              온라인 전시만 보기
              <input type="checkbox" id="online" />
            </label>

            <label htmlFor="in-progress">
              진행 중인 전시만 보기
              <input type="checkbox" id="in-progress" />
            </label>

            {/* 드롭 다운 - 정렬 기준 선택 */}
            <label htmlFor="exhibition-filter">
              <select name="exhibition-filter" id="exhibition-filter">
                <option value="recent">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="popular">인기순</option>
                <option value="nearest">가까운순</option>
              </select>
            </label>
          </div>
        </div>

        {/* 전시 목록 */}
        <ul className={S.infoContainer}>
          <ExhibitionSlider exhibitions={exhibitions} />
        </ul>
      </section>
    </main>
  );
};

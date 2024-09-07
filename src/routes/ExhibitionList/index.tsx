import React, { useEffect, useState } from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import Banner from './components/Banner/Banner';
import ExhibitionSlider from '@/components/ExhibitionSlider';
import FilterTag from './components/FilterTag/FilterTag';
import axios from 'axios';
import { ExhibitionData } from '@/types/ExhibitionData';

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export const Component: React.FC = () => {
  useDocumentTitle('전시 목록 | JJ.com');
  const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${pocketbaseUrl}/api/collections/Exhibition/records?expand=School,Major`;
        const filters = [];
        let sort = '';

        // checkbox 필터링
        if (isOnline) filters.push('(IsOnline=true)');
        if (inProgress) filters.push(`(Start<'${today}'%26%26End>'${today}')`);

        // dropdown 필터링
        if (sortOrder === 'recent') {
          sort = '-Start';
        } else if (sortOrder === 'oldest') {
          sort = 'Start';
        } else if (sortOrder === 'popular') {
          // 북마크 순 정렬 로직
        }

        if (filters.length > 0) {
          url += `&filter=${filters.join('%26%26')}`;
        }
        if (sort) {
          url += `&sort=${sort}`;
        }

        console.log('Final URL:', url);

        const response = await axios.get(url);
        setExhibitions(response.data.items);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('문제 발생');
      }
    };
    fetchData();
  }, [isOnline, inProgress, today, sortOrder]);

  if (error) return <div>{error}</div>;
  if (exhibitions.length === 0) return <div>로딩 중</div>;

  return (
    <main id="page" className={S.component}>
      <Banner />
      <FilterTag />
      <section>
        <div className={S.listHeader}>
          <h2>졸업 전시 리스트</h2>
          <div>
            <label htmlFor="online">
              온라인 전시만 보기
              <input type="checkbox" id="online" checked={isOnline} onChange={() => setIsOnline((prev) => !prev)} />
            </label>
            <label htmlFor="in-progress">
              진행 중인 전시만 보기
              <input
                type="checkbox"
                id="in-progress"
                checked={inProgress}
                onChange={() => setInProgress((prev) => !prev)}
              />
            </label>
            <label htmlFor="exhibition-filter">
              <select
                name="exhibition-filter"
                id="exhibition-filter"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="recent">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="popular">인기순</option>
              </select>
            </label>
          </div>
        </div>
        <ul className={S.infoContainer}>
          <ExhibitionSlider exhibitions={exhibitions} />
        </ul>
      </section>
    </main>
  );
};

import React, { useEffect, useState } from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import Banner from './components/Banner/Banner';
// import ExhibitionSlider from '@/components/ExhibitionSlider';
import FilterTag from './components/FilterTag/FilterTag';
import axios from 'axios';
import { ExhibitionData } from '@/types/ExhibitionData';
import ExhibitionInfo from '@/components/ExhibitionSlider/ExhibitionInfo';
import getImageURL from '@/utils/getImageURL';

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export const Component: React.FC = () => {
  useDocumentTitle('전시 목록 | JJ.com');
  const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
  const [error, setError] = useState<string | null>(null);
  // checkbox 온라인 전시 | 진행 중 전시 필터
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  // dropdown 정렬 순서 필터
  const [sortOrder, setSortOrder] = useState<string>('recent');
  // 더보기 기능 용 page 번호
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${pocketbaseUrl}/api/collections/Exhibition/records?expand=School,Major&page=${page}&perPage=20`;
        // 기본 필터 - 승인된 전시만
        const filters = ['(IsApprove=true)'];
        let sort = '';

        // checkbox 필터 적용
        if (isOnline) filters.push('(IsOnline=true)');
        if (inProgress) filters.push(`(Start<'${today}'%26%26End>'${today}')`);

        // dropdown 정렬 옵션 적용
        if (sortOrder === 'recent') {
          sort = '-Start';
        } else if (sortOrder === 'oldest') {
          sort = 'Start';
        } else if (sortOrder === 'popular') {
          // 북마크 순 정렬 로직 필요
        }

        // URL에 필터와 정렬 옵션 추가
        if (filters.length > 0) url += `&filter=${filters.join('%26%26')}`;
        if (sort) url += `&sort=${sort}`;

        // API 요청
        const response = await axios.get(url);
        if (page === 1) {
          setExhibitions(response.data.items);
        } else {
          setExhibitions((prevData) => [...prevData, ...response.data.items]);
        }
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('문제 발생');
      }
    };
    fetchData();
  }, [isOnline, inProgress, today, sortOrder, page]);

  // 필터/정렬 옵션 변경 시 page를 1로 reset
  useEffect(() => {
    setPage(1);
  }, [isOnline, inProgress, sortOrder]);

  // '더보기' 버튼 핸들러
  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  if (error) return <div>{error}</div>;
  if (exhibitions.length === 0) return <div>로딩 중⏳</div>;

  return (
    <main id="page" className={S.component}>
      <Banner />
      <FilterTag />
      <section>
        <div className={S.listHeader}>
          <h2>졸업 전시 리스트</h2>
          <div>
            {/* 체크박스 필터 */}
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
            {/* 정렬 옵션 드롭다운 */}
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
        {/* 전시 정보 목록 */}
        <ul className={S.infoContainer}>
          {/* <ExhibitionSlider exhibitions={exhibitions} /> */}
          {exhibitions.map((item) => (
            <ExhibitionInfo
              key={item.id}
              schoolName={item.expand.School.Name}
              major={item.expand.Major.Name}
              posterUrl={getImageURL(item)}
            />
          ))}
        </ul>
        {/* 더보기 버튼 */}
        <div className={S.buttonWrapper}>
          <button className={S.loadMoreButton} onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      </section>
    </main>
  );
};

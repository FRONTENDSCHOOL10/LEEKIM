import React, { useEffect, useState } from 'react';
import S from './style.module.scss';
import Banner from './components/Banner/Banner';
import FilterTag from './components/FilterTag/FilterTag';
import axios from 'axios';
import { ExhibitionData } from '@/types/ExhibitionData';
import ExhibitionInfo from '@/components/ExhibitionSlider/components/ExhibitionInfo';
import { getImageURL } from '@/utils';
import FilterOptions from './components/FilterOptions/FilterOptions';
import CommonHelmet from '@/components/CommonHelmet';

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export const Component: React.FC = () => {
  const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // checkbox 온라인 전시 | 진행 중 전시 필터
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const [tagDepartmentArray, setTagDepartmentArray] = useState<string[]>([]);
  const [tagLocationArray, setTagLocationArray] = useState<string[]>([]);
  const [tagYearArray, setTagYearArray] = useState<string[]>([]);

  // dropdown 정렬 순서 필터
  const [sort, setSort] = useState<string>('-Start');

  // 더보기 기능 용 page 번호
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${pocketbaseUrl}/api/collections/Exhibition/records?sort=${sort}&expand=School,Major&page=${page}&perPage=20`;
        // 기본 필터 - 승인된 전시만
        const filters = ['IsApprove=true'];
        const departmentFilters: string[] = [];
        const locationFilters: string[] = [];
        const yearFilters: string[] = [];

        console.log(today);

        // checkbox 필터 적용
        if (isOnline) filters.push('IsOnline=true');
        if (inProgress) filters.push(`Start<'${today}'%26%26End>'${today}'`);

        // 분야 필터 적용
        if (tagDepartmentArray.length > 0) {
          // if (page !== 1) setPage(1);
          tagDepartmentArray.forEach((id: string) => departmentFilters.push('TagDepartment~' + `'${id}'`));
          filters.push('(' + departmentFilters.join('||') + ')');
        }

        // 지역 필터 적용
        if (tagLocationArray.length > 0) {
          // if (page !== 1) setPage(1);
          tagLocationArray.map((id: string) => locationFilters.push('TagLocation~' + `'${id}'`));
          filters.push('(' + locationFilters.join('||') + ')');
        }

        // 분야 필터 적용
        if (tagYearArray.length > 0) {
          // if (page !== 1) setPage(1);
          console.log(tagYearArray);
          tagYearArray.map((year: string) => yearFilters.push(`Start<='${year}-12-31'%26%26End>='${year}-01-01'`));
          console.log(yearFilters);
          filters.push('(' + yearFilters.join('||') + ')');
        }

        // URL에 필터와 정렬 옵션 추가
        if (filters.length > 0) url += `&filter=(${filters.join('%26%26')})`;

        console.log(url);

        // API 요청
        const response = await axios.get(url);
        if (page === 1) {
          setExhibitions(response.data.items);
          console.log(response.data.items);
        } else {
          setExhibitions((prevData) => [...prevData, ...response.data.items]);
        }
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('문제 발생');
      }
    };

    fetchData();
  }, [isOnline, inProgress, today, sort, page, tagDepartmentArray, tagLocationArray, tagYearArray]);

  // 필터/정렬 옵션 변경 시 page를 1로 reset
  useEffect(() => {
    setExhibitions([]);
    setPage(1);
  }, [isOnline, inProgress, sort, tagDepartmentArray, tagLocationArray, tagYearArray]);

  // '더보기' 버튼 핸들러
  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  if (error) return <div>{error}</div>;

  return (
    <main id="page" className={S.component}>
      <CommonHelmet pageTitle="전시 목록" pageDescription="졸업 전시회 목록 페이지" />
      <Banner />
      <FilterTag
        tagDepartmentArray={tagDepartmentArray}
        setTagDepartmentArray={setTagDepartmentArray}
        tagLocationArray={tagLocationArray}
        setTagLocationArray={setTagLocationArray}
        tagYearArray={tagYearArray}
        setTagYearArray={setTagYearArray}
      />
      <section>
        <div className={S.listHeader}>
          <h2>졸업 전시 리스트</h2>
          <FilterOptions
            isOnline={isOnline}
            setIsOnline={setIsOnline}
            inProgress={inProgress}
            setInProgress={setInProgress}
            sort={sort}
            setSort={setSort}
          />
        </div>
        {/* 전시 정보 목록 */}
        {exhibitions.length !== 0 ? (
          <>
            <ul className={S.infoContainer}>
              {exhibitions.map((item) => (
                <li>
                  <ExhibitionInfo
                    key={item.id}
                    schoolName={item?.expand?.School?.Name as string}
                    major={item?.expand?.Major?.Name as string}
                    posterUrl={getImageURL(item)}
                    exhiId={item.id}
                  />
                </li>
              ))}
            </ul>
            {/* 더보기 버튼 */}
            <div className={S.buttonWrapper}>
              <button className={S.loadMoreButton} onClick={handleLoadMore}>
                더보기
              </button>
            </div>
          </>
        ) : (
          <p>해당하는 전시가 없습니다.</p>
        )}
      </section>
    </main>
  );
};

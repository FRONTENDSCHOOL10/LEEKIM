import React, { useEffect, useState } from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import Banner from './components/Banner/Banner';
import ExhibitionInfo from '@/components/ExhibitionInfo';

// 전시 정보 나타내는 인터페이스 정의
type Exhibition = {
  id: string;
  schoolName: string;
  major: string;
  posterUrl: string;
  isOnline: boolean;
  isInProgress: boolean;
};

// 전시 정렬 기준 나타내는 타입 정의
type SortBy = 'recent' | 'popular' | 'nearest' | 'oldest';

export const Component: React.FC = () => {
  useDocumentTitle('전시 목록 | JJ.com');

  // 전시 데이터 | 필터 | 정렬 기준 관리하는 상태
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [inProgressOnly, setInProgressOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy>('recent');

  useEffect(() => {
    // 전시 데이터 가져오는 API 여기서
  }, []);

  // 필터 조건에 따라 전시 목록 필터링
  const filteredExhibitions = exhibitions
    .filter((ex) => !onlineOnly || ex.isOnline) // onlineOnly가 true인 경우 온라인 전시만 포함
    .filter((ex) => !inProgressOnly || ex.isInProgress);
  // 정렬 로직 필요

  return (
    <main id="page" className={S.component}>
      <Banner />

      {/* 졸업 전시 리스트 부분 */}
      <section>
        <div className={S.listHeader}>
          <h2>졸업 전시 리스트</h2>

          <div>
            <label htmlFor="online">
              온라인 전시만 보기
              <input
                type="checkbox"
                id="online"
                checked={onlineOnly}
                onChange={(e) => setOnlineOnly(e.target.checked)}
              />
            </label>

            <label htmlFor="in-progress">
              진행 중인 전시만 보기
              <input
                type="checkbox"
                id="in-progress"
                checked={inProgressOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInProgressOnly(e.target.checked)}
              />
            </label>

            {/* 드롭 다운 - 정렬 기준 선택 */}
            <label htmlFor="exhibition-filter">
              <select
                name="exhibition-filter"
                id="exhibition-filter"
                value={sortBy} // 현재 선택된 정렬 기준에 따라 드롭다운 값 설정
                // 드롭다운 메뉴에서 사용자가 선택 변경 시 발생하는 이벤트 처리
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as SortBy)}
              >
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
          {/* 필터링 된 전시 목록을 ExhibitionInfo 컴포넌트 통해 렌더링 */}
          {filteredExhibitions.map((exhibition) => (
            <ExhibitionInfo
              key={exhibition.id}
              schoolName={exhibition.schoolName}
              major={exhibition.major}
              posterUrl={exhibition.posterUrl}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

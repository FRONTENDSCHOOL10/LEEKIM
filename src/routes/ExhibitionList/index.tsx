import React from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import ExhibitionInfo from '@/components/ExhibitionInfo';
import Banner from './components/Banner/Banner';

export const Component: React.FC = () => {
  useDocumentTitle('전시 목록 | JJ.com');

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
              <input type="checkbox" id="online" />
            </label>
            <label htmlFor="in-progress">
              진행 중인 전시만 보기
              <input type="checkbox" id="in-progress" />
            </label>

            {/* 드롭 다운 */}
            <label htmlFor="exhibition-filter">
              <select name="exhibition-filter" id="exhibition-filter">
                <option value="recent">최신순</option>
                <option value="popular">인기순</option>
                <option value="nearest">가까운순</option>
              </select>
            </label>
          </div>
        </div>

        {/* 임시로 전시 정보 10개만 */}
        <ul className={S.infoContainer}>
          {/* grid로 */}
          {[...Array(10)].map((_, index) => (
            <ExhibitionInfo key={index} />
          ))}
        </ul>
      </section>
    </main>
  );
};

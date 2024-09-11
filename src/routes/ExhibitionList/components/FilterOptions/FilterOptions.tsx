import S from './style.module.scss';

interface FilterOptionsProps {
  isOnline: boolean;
  // 온라인 전시 상태를 변경 함수
  setIsOnline: (value: boolean) => void;
  inProgress: boolean;
  setInProgress: (value: boolean) => void;
  // 정렬 순서 recent | oldest | popular
  sort: string;
  setSort: (value: string) => void;
}

function FilterOptions({ isOnline, setIsOnline, inProgress, setInProgress, sort, setSort }: FilterOptionsProps) {
  return (
    <div className={S.component}>
      <label htmlFor="online">
        온라인 전시만 보기
        <input type="checkbox" id="online" checked={isOnline} onChange={(e) => setIsOnline(e.target.checked)} />
      </label>
      <label htmlFor="in-progress">
        진행 중인 전시만 보기
        <input
          type="checkbox"
          id="in-progress"
          checked={inProgress}
          onChange={(e) => setInProgress(e.target.checked)}
        />
      </label>
      <label htmlFor="exhibition-filter">
        <select name="exhibition-filter" id="exhibition-filter" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="-Start">최신순</option>
          <option value="Start">오래된순</option>
          <option value="-Bookmark">인기순</option>
        </select>
      </label>
    </div>
  );
}
export default FilterOptions;

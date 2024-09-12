import { memo } from 'react';
import S from './style.module.scss';

function SearchBox() {
  return (
    <form role="search" className={S.component}>
      <label className="sr-only" htmlFor="SearchBox">
        검색창
      </label>
      <input
        id="SearchBox"
        type="search"
        // 추후 서버에서 처리하기 위해 name속성 추가해야함
        // name="filter"
        placeholder="검색어를 입력하세요."
        spellCheck="false"
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default memo(SearchBox);

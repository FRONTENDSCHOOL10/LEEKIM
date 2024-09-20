import { FormEvent, memo, useRef } from 'react';
import S from './style.module.scss';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
  const navigate = useNavigate();

  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearchButton = (e: FormEvent) => {
    e.preventDefault();

    if (searchInput.current && !searchInput?.current?.value.trim()) {
      searchInput.current.value = '';
      return;
    }

    if (searchInput.current) {
      navigate(`/searchResults/${searchInput.current.value}`, {
        replace: true,
      });
      searchInput.current.value = '';
    }
  };

  return (
    <form role="search" className={S.component}>
      <label className="sr-only" htmlFor="SearchBox">
        검색창
      </label>
      <input
        id="SearchBox"
        type="search"
        placeholder="검색어를 입력하세요."
        spellCheck="false"
        autoComplete="off"
        ref={searchInput}
      />
      <button type="submit" onClick={handleSearchButton}>
        검색
      </button>
    </form>
  );
}

export default memo(SearchBox);

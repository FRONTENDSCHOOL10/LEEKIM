import S from './style.module.scss';

function SearchBanner({ inputValue }) {
  return (
    <div className={S.searchBanner}>
      <p className={S.searchResult}>
        '{inputValue}'에
        <br /> 관련된 검색 결과입니다.
      </p>
    </div>
  );
}
export default SearchBanner;

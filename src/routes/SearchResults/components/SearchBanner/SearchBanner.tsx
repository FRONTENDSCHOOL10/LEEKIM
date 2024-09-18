import S from './style.module.scss';

interface SearchBannerProps {
  inputValue: string;
}

function SearchBanner({ inputValue }: SearchBannerProps) {
  return (
    <div className={S.component}>
      <p className={S.searchResult}>
        <span className={S.searchTerm}>&apos;{inputValue}&apos;</span>에
        <br /> 관련된 검색 결과입니다.
      </p>
    </div>
  );
}
export default SearchBanner;

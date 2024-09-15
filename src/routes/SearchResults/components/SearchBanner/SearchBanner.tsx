import S from './style.module.scss';

interface SearchBannerProps {
  inputValue: string;
}

function SearchBanner({ inputValue }: SearchBannerProps) {
  return (
    <div className={S.searchBanner}>
      <p className={S.searchResult}>
        &apos;{inputValue}&apos;에
        <br /> 관련된 검색 결과입니다.
      </p>
    </div>
  );
}
export default SearchBanner;

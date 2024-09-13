import S from './style.module.scss';

function LoadMoreButton({ onClick }) {
  return (
    <div className={S.component}>
      <button className={S.loadMoreButton} onClick={onClick}>
        더보기
      </button>
    </div>
  );
}
export default LoadMoreButton;

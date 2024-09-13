import S from './style.module.scss';

interface LoadMoreButtonProps {
  onClick: () => void;
}

function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <div className={S.component}>
      <button className={S.loadMoreButton} onClick={onClick}>
        더보기
      </button>
    </div>
  );
}
export default LoadMoreButton;

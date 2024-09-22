import S from './style.module.scss';

interface BookmarkBannerProps {
  Nickname: string;
}

function BookmarkBanner({ nickname }: BookmarkBannerProps) {
  return (
    <div className={S.component}>
      <p className={S.nickname}>{nickname}님의 북마크</p>
    </div>
  );
}
export default BookmarkBanner;

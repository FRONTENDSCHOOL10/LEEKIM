import { ReactElement } from 'react';
import S from './style.module.scss';
import toast from 'react-hot-toast';

interface PosterProps {
  url: string;
  image: string;
}

function Poster({ url, image }: PosterProps): ReactElement {
  const handleLink = (e) => {
    e.preventDefault();

    if (url !== '') {
      window.open(url);
    } else {
      toast.remove();
      toast.error('현재 제공받은 웹사이트 정보가 없습니다.');
    }
  };

  return (
    <div className={S.poster}>
      <a className={S.container} onClick={handleLink}>
        <img src={image} alt="Exhibition Poster" className={S.posterImage} />
      </a>
      <div className={S.info}>
        <img src="/Icon/web.svg" alt="" />
        <p>포스터를 누르면 웹사이트로 이동해요!</p>
      </div>
    </div>
  );
}

export default Poster;

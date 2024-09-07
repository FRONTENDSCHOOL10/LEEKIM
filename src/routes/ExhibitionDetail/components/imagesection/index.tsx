import { ReactElement } from 'react';
import S from './style.module.scss';
import web from '/Icon/web.svg';

interface PosterProps {
  url: string;
  image: string;
}

function Poster({ url, image }: PosterProps): ReactElement {
  return (
    <div className={S.poster}>
      <a href={url} className={S.container} target="_blank" rel="noopener noreferrer">
        <img src={image} alt="Exhibition Poster" className={S.posterImage} />
      </a>
      <div className={S.info}>
        <img src={web} alt="" />
        <p>포스터를 누르면 웹사이트로 이동해요!</p>
      </div>
    </div>
  );
}

export default Poster;

import { ReactElement } from 'react';
import S from './style.module.scss';

interface TagProps {
  text: string;
}

function Tag({ text }: TagProps): ReactElement {
  return <span className={S.tag}>#{text}</span>;
}

export default Tag;

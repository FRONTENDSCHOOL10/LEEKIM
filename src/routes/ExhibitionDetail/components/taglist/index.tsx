import { ReactElement } from 'react';
import S from './style.module.scss';
import Tag from '../tag';

interface TagListProps {
  tags: string[];
}

function TagList(props: TagListProps): ReactElement {
  const { tags } = props;

  return (
    <div className={S.tagList}>
      {tags.map((tag, index) => (
        <Tag key={index} text={tag} />
      ))}
    </div>
  );
}

export default TagList;

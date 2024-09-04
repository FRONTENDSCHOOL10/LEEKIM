import React from 'react';
import S from './style.module.scss';
import Tag from '../tag';
import { TagItem } from '@/types/ExtendedRouteObject';

interface TagListProps {
  location: TagItem[];
  departments: TagItem[];
}

function TagList({ location, departments }: TagListProps): React.ReactElement {
  return (
    <div className={S.tagList}>
      {location.map((locationTag) => (
        <Tag key={locationTag.id} text={locationTag.Name} />
      ))}
      {departments.map((departmentTag) => (
        <Tag key={departmentTag.id} text={departmentTag.Name} />
      ))}
    </div>
  );
}

export default TagList;

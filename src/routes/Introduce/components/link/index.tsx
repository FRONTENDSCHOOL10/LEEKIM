import { ReactElement } from 'react';
import S from './style.module.scss';
import Text from './text';

function Link(): ReactElement {
  const text = `졸업의 순간을 담다
  꿈을 나누다`;
  return (
    <div className={S.warpper}>
      <Text title={text} subtitle="전국의 모든 졸업 전시 정보, 졸전.COM" />
    </div>
  );
}

export default Link;

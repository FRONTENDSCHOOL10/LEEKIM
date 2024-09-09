import { ReactElement } from 'react';
import S from './style.module.scss';
import DescriptionFrame from './description/descriptionframe';

function Description(): ReactElement {
  return (
    <div className={S.component}>
      <div className={S.text}>
        <span>
          졸업 전시는 <br />
          어떻게 등록할 수 있나요?
        </span>
      </div>
      <div className={S.wrapper}>
        <img src="" alt="" />
        <DescriptionFrame step="STEP.01" description="안녕" />
      </div>
      <div className={S.wrapper}>
        <img src="" alt="" />
        <DescriptionFrame step="STEP.01" description="안녕하세요" />
      </div>
      <div className={S.wrapper}>
        <img src="" alt="" />
        <DescriptionFrame step="STEP.01" description="안녕하세요" />
      </div>
    </div>
  );
}

export default Description;

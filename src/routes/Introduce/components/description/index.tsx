import { ReactElement } from 'react';
import S from './style.module.scss';
import DescriptionFrame from './description/descriptionframe';
import step01 from '../../assets/step01.png';
import step02 from '../../assets/step02.png';
import step03 from '../../assets/step03.png';

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
        <img src={step01} alt="" />
        <DescriptionFrame
          step="STEP.01"
          description="사이트 상단의 '전시 등록' 클릭 후 전시 등록 페이지로 이동합니다."
        />
      </div>
      <div className={S.wrapper}>
        <img src={step02} alt="" />
        <DescriptionFrame step="STEP.02" description="졸업 전시 등록을 위한 필수 정보를 기입합니다." />
      </div>
      <div className={S.wrapper}>
        <img src={step03} alt="" />
        <DescriptionFrame step="STEP.03" description="등록된 전시가 관리자의 승인을 거친 후 사이트에 공개됩니다." />
      </div>
    </div>
  );
}

export default Description;

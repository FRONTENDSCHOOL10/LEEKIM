import React, { ReactElement } from 'react';
import S from './style.module.scss';

function RequireInfo(): ReactElement {
  return (
    <div className={S.requireinfo}>
      <div className={S.formrow}>
        <div className={S.formgroup}>
          <label htmlFor="School">학교명/학부명</label>
          <input type="text" id="School" name="School" placeholder="OO대학교" required />
        </div>
        <div className={S.formgroup}>
          <label htmlFor="Major">학과</label>
          <input type="text" id="Major" name="Major" placeholder="OO과" required />
        </div>
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Title">전시 이름</label>
        <input type="text" id="Title" name="Title" placeholder="전시회 타이틀" required />
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Address">전시 장소</label>
        <input id="Address" name="Address" required />
      </div>
      <div className={S.formrow}>
        <div className={S.formgroup}>
          <label htmlFor="Start">전시 시작일</label>
          <input type="date" id="Start" name="Start" required />
        </div>
        <div className={S.formgroup}>
          <label htmlFor="End">전시 종료일</label>
          <input type="date" id="End" name="End" required />
        </div>
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Time">전시 시간</label>
        <input type="text" id="Time" name="Time" placeholder="Ex) 09:00 ~ 18:00" required />
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Introduce">전시 설명</label>
        <textarea id="Introduce" name="Introduce" required />
      </div>
    </div>
  );
}

export default RequireInfo;

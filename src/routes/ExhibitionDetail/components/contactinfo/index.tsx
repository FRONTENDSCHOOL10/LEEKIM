import React from 'react';
import S from './style.module.scss';

interface contactProps {
  tel: string;
}

function ContactInfo({ tel }: contactProps): React.ReactElement {
  return (
    <div className={S.contact}>
      <div className={S.header}>
        <img src="/Icon/home.svg" alt="" />
        <h2>전시 문의</h2>
      </div>
      {tel === '' ? <div className={S.tel}>문의 정보가 없습니다.</div> : <div className={S.tel}>{tel}</div>}
      <div className={S.tel}>{tel}</div>
    </div>
  );
}

export default ContactInfo;

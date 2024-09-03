import React from 'react';
import S from './style.module.scss';
import home from '/icon/home.svg';

interface contactProps {
  tel: string;
}

function ContactInfo({ tel }: contactProps): React.ReactElement {
  return (
    <div className={S.contact}>
      <div className={S.header}>
        <img src={home} alt="" />
        <h2>전시 문의</h2>
      </div>
      <div className={S.tel}>{tel}</div>
    </div>
  );
}

export default ContactInfo;

import React, { ReactElement } from 'react';
import S from './style.module.scss';
import KakaoMap from '@/api/kakaoMap';

interface LocationInfoProps {
  address: string;
}

function LocationInfo({ address }: LocationInfoProps): ReactElement {
  return (
    <div className={S.contact}>
      <div className={S.header}>
        <img src="/Icon/location.svg" alt="" />
        <h2>전시 장소</h2>
      </div>
      <div className={S.map}>
        <KakaoMap address={address} />
      </div>
      <div className={S.address}>
        <p>{address}</p>
      </div>
    </div>
  );
}

export default LocationInfo;

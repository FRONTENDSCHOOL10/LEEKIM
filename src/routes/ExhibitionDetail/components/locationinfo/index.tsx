import { ReactElement } from 'react';
import S from './style.module.scss';
import location from '/icon/location.svg';

interface locationProps {
  address: string;
}

function LocationInfo({ address }: locationProps): ReactElement {
  return (
    <div className={S.contact}>
      <div className={S.header}>
        <img src={location} alt="" />
        <h2>전시 장소</h2>
      </div>
      <div className={S.container}></div>
      <div className={S.address}>{address}</div>
    </div>
  );
}

export default LocationInfo;

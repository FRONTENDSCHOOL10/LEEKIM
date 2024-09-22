import React, { ReactElement, useEffect } from 'react';
import S from './style.module.scss';

declare global {
  interface Window {
    daum: {
      Postcode: new (config: PostcodeConfig) => {
        open: () => void;
      };
    };
  }
}

interface PostcodeConfig {
  oncomplete: (data: PostcodeData) => void;
}

interface PostcodeData {
  address: string;
  addressType: 'R' | 'J';
  bname: string;
  buildingName: string;
  zonecode: string;
}

interface RequireInfoProps {
  exhibitionData: {
    School: string;
    Major: string;
    Title: string;
    Address: string;
    Start: string;
    End: string;
    Time: string;
    Introduce: string;
  };
  onInputChange: (name: string, value: string) => void;
}

function RequireInfo({ exhibitionData, onInputChange }: RequireInfoProps): ReactElement {
  useEffect(() => {
    //다음 api 스크립트추가
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAddressSearch = () => {
    //다음 주소검색 api
    new window.daum.Postcode({
      oncomplete: (data: PostcodeData) => {
        const fullAddress = data.address + (data.buildingName ? ` (${data.buildingName})` : '');
        onInputChange('Address', fullAddress);
      },
    }).open();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onInputChange(e.target.name, e.target.value);
  };

  return (
    <div className={S.requireinfo}>
      <div className={S.formrow}>
        <div className={S.formgroup}>
          <label htmlFor="School">학교명/학부명</label>
          <input
            type="text"
            id="School"
            name="School"
            value={exhibitionData.School}
            onChange={handleChange}
            placeholder="OO대학교"
            className={S.input}
            required
          />
        </div>
        <div className={S.formgroup}>
          <label htmlFor="Major">학과</label>
          <input
            type="text"
            id="Major"
            name="Major"
            value={exhibitionData.Major}
            onChange={handleChange}
            placeholder="OO과"
            className={S.input}
            required
          />
        </div>
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Title">전시 이름</label>
        <input
          type="text"
          id="Title"
          name="Title"
          value={exhibitionData.Title}
          onChange={handleChange}
          placeholder="전시회 타이틀"
          className={S.input}
          required
        />
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Address">전시 장소</label>
        <input
          id="Address"
          name="Address"
          className={S.input}
          value={exhibitionData.Address}
          onClick={handleAddressSearch}
          placeholder="클릭하여 주소 검색"
          readOnly
          required
        />
      </div>
      <div className={S.formrow}>
        <div className={S.formgroup}>
          <label htmlFor="Start">전시 시작일</label>
          <input
            type="date"
            id="Start"
            name="Start"
            value={exhibitionData.Start}
            onChange={handleChange}
            className={S.date}
            required
          />
        </div>
        <div className={S.formgroup}>
          <label htmlFor="End">전시 종료일</label>
          <input
            type="date"
            id="End"
            name="End"
            value={exhibitionData.End}
            onChange={handleChange}
            className={S.date}
            required
          />
        </div>
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Time">전시 시간</label>
        <input
          type="text"
          id="Time"
          name="Time"
          value={exhibitionData.Time}
          onChange={handleChange}
          className={S.input}
          placeholder="ex) OO일 09:00 ~ 18:00, OO일 10:00 ~ 19:00"
          required
        />
      </div>
      <div className={S.formgroup}>
        <label htmlFor="Introduce">전시 설명</label>
        <textarea id="Introduce" name="Introduce" value={exhibitionData.Introduce} onChange={handleChange} required />
      </div>
    </div>
  );
}

export default RequireInfo;

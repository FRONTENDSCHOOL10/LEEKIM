import React, { ReactElement } from 'react';
import S from './style.module.scss';

interface SelectInfoProps {
  exhibitionData: {
    URL: string;
    Contact: string;
  };
  onInputChange: (name: string, value: string) => void;
}

function SelectInfo({ exhibitionData, onInputChange }: SelectInfoProps): ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.name, e.target.value);
  };

  return (
    <div className={S.selectinfo}>
      <h3>선택 정보 등록</h3>
      <div className={S.formrow}>
        <div className={S.formgroup}>
          <label htmlFor="URL">온라인 전시회 주소/SNS 주소</label>
          <input
            type="text"
            id="URL"
            name="URL"
            value={exhibitionData.URL}
            onChange={handleChange}
            placeholder="ex) https://www.exhibitionSite.com"
          />
        </div>
        <div className={S.formgroup}>
          <label htmlFor="Contact">부가정보</label>
          <input
            type="text"
            id="Contact"
            name="Contact"
            value={exhibitionData.Contact}
            onChange={handleChange}
            placeholder="연락처, 전시회 정보 문의방법"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectInfo;

import { memo, ReactElement, useEffect, useState } from 'react';
import S from './style.module.scss';
import axios from 'axios';
import ExhibitionSlider from '@/components/ExhibitionSlider';
import { ExhibitionData, TagItem } from '@/types/ExhibitionData';

const dbApiUrl = import.meta.env.VITE_DB_API;

interface MoreExhibitionProps {
  currentTagDepartments: TagItem[];
  currentTagLocations: TagItem[];
}

function MoreExhibition({ currentTagDepartments, currentTagLocations }: MoreExhibitionProps): ReactElement {
  const [departmentExhibitions, setDepartmentExhibitions] = useState<ExhibitionData[]>([]);
  const [locationExhibitions, setLocationExhibitions] = useState<ExhibitionData[]>([]);

  useEffect(() => {
    const getExhibitionData = async (
      tags: TagItem[],
      setExhibitionData: React.Dispatch<React.SetStateAction<ExhibitionData[]>>,
      tagType: string
    ) => {
      if (tags.length === 0) {
        setExhibitionData([]);
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const tagIds = tags.map((tag) => tag.id).join(',');

      // UTC 시간을 사용하여 정확한 날짜 필터링
      const response = await axios.get(
        `${dbApiUrl}collections/Exhibition/records?sort=-created&filter=(${tagType}~'${tagIds}'%26%26Start<='${today}T23:59:59.999Z'%26%26End>='${today}T00:00:00.000Z'%26%26IsApprove=true)&expand=School,Major,TagDepartment,TagLocation`
      );
      // 클라이언트 측에서 추가 필터링을 수행하여 현재 진행 중인 전시회만 선택
      const filteredExhibitions = response.data.items.filter((item: ExhibitionData) => {
        const startDate = new Date(item.Start);
        const endDate = new Date(item.End);
        const todayDate = new Date(today);
        return startDate <= todayDate && endDate >= todayDate;
      });

      setExhibitionData(filteredExhibitions);
    };

    getExhibitionData(currentTagDepartments, setDepartmentExhibitions, 'TagDepartment');
    getExhibitionData(currentTagLocations, setLocationExhibitions, 'TagLocation');
  }, [currentTagDepartments, currentTagLocations]);

  // 전시회 섹션을 렌더링하는 함수
  const renderExhibitionSection = (exhibitions: ExhibitionData[], tags: TagItem[], title: string) => {
    if (tags.length === 0) return null;

    return (
      <section className={S.component}>
        <div className={S.titleSection}>
          <h2 className={S.title}>
            {tags.map((tag) => `#${tag.Name}`).join(' ')} {title}
          </h2>
        </div>
        {exhibitions.length > 0 ? (
          <ExhibitionSlider exhibitions={exhibitions} />
        ) : (
          <p>현재 진행 중인 {tags.map((tag) => tag.Name).join(', ')} 관련 전시가 없습니다😭</p>
        )}
      </section>
    );
  };

  return (
    <>
      {renderExhibitionSection(departmentExhibitions, currentTagDepartments, '전시 더 보기')}
      {renderExhibitionSection(locationExhibitions, currentTagLocations, '전시 더 보기')}
    </>
  );
}

export default memo(MoreExhibition);

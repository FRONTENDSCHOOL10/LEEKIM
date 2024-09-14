import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import S from './style.module.scss';
import Title from './components/title';
import Description from './components/description';
import ExhibitionDate from './components/exhibitionDate';
import ContactInfo from './components/contactinfo';
import LocationInfo from './components/locationinfo';
import Poster from './components/imagesection';
import back from '/Icon/back.svg';
import getImageURL from '@/utils/getImageURL';
import TagList from './components/taglist';
import { ExhibitionData } from '@/types/ExhibitionData';

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export function Component() {
  const { exhiId } = useParams<{ exhiId: string }>();
  const navigate = useNavigate();
  const [exhibitionData, setExhibitionData] = useState<ExhibitionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      if (!exhiId) {
        setError('전시회 정보가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get<ExhibitionData>(
          `${pocketbaseUrl}/api/collections/Exhibition/records/${exhiId}?expand=School,Major,TagLocation,TagDepartment`
        );
        setExhibitionData(response.data);

        if (!response.data.IsApprove) {
          navigate('/', { replace: true });
        }
      } catch (err) {
        setError('전시회 데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExhibitionData();
  }, [exhiId, navigate]);

  if (isLoading) return <div className={S.loading}>로딩 중입니다</div>;
  if (error) return <div className={S.error}>{error}</div>;
  if (!exhibitionData) return <div className={S.error}>전시회 정보를 찾을 수 없습니다.</div>;
  if (!exhibitionData.IsApprove) return null;

  const posterUrl = getImageURL(exhibitionData, 'Poster');

  // Time 데이터 처리 로직 수정
  let timeData: string[] | undefined;
  if (typeof exhibitionData.Time === 'string') {
    try {
      const parsedTime = JSON.parse(exhibitionData.Time);
      timeData = parsedTime.time;
    } catch {
      timeData = [exhibitionData.Time];
    }
  } else if (exhibitionData.Time && typeof exhibitionData.Time === 'object' && 'time' in exhibitionData.Time) {
    timeData = exhibitionData.Time.time;
  }

  return (
    <div className={S.component}>
      <main className={S.main}>
        <div className={S.contentWrapper}>
          <button className={S.backButton} onClick={() => navigate(-1)}>
            <img src={back} alt="뒤로 가기" />
            뒤로가기
          </button>
          <TagList
            location={exhibitionData.expand?.TagLocation ?? []}
            departments={exhibitionData.expand?.TagDepartment ?? []}
          />
          <Title
            title={exhibitionData.expand?.School?.Name ?? ''}
            subtitle={exhibitionData.SubTitle}
            major={exhibitionData.expand?.Major?.Name ?? ''}
          />
          <div className={S.infoWrapper}>
            <div className={S.posterWrapper}>
              <Poster url={exhibitionData.URL} image={posterUrl} />
            </div>
            <div className={S.infoSection}>
              <Description title={exhibitionData.Title} description={exhibitionData.Introduce} />
              <ContactInfo tel={exhibitionData.Contact} />
              <div className={S.wrapper}>
                <ExhibitionDate start={exhibitionData.Start} end={exhibitionData.End} time={timeData} />
                <LocationInfo address={exhibitionData.Address} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

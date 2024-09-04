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
import back from '/icon/back.svg';
import getImageURL from '@/utils/getImageURL';

interface ExhibitionData {
  collectionId: string;
  id: string;
  Title: string;
  expand: {
    School: {
      Name: string;
    };
    Major: {
      Name: string;
    };
  };
  URL: string;
  Poster: string;
  Introduce: string;
  Contact: string;
  Address: string;
  subtitle: string;
  Start: string;
  End: string;
  Time: {
    time: string[];
  };
}

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export function Component() {
  const { exhiId } = useParams<{ exhiId: string }>();
  const navigate = useNavigate();
  const [exhibitionData, setExhibitionData] = useState<ExhibitionData | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        const response = await axios.get(
          `${pocketbaseUrl}/api/collections/Exhibition/records/${exhiId}?expand=School,Major`
        );
        setExhibitionData(response.data);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
      }
    };

    if (exhiId) {
      fetchExhibitionData();
    }
  }, [exhiId]);

  if (error) return <div>{error}</div>;
  if (!exhibitionData) return <div>로딩 중입니당</div>;

  function handleGoBack() {
    navigate(-1);
  }
  const posterUrl = getImageURL(exhibitionData, 'Poster');

  return (
    <div className={S.component}>
      <main className={S.main}>
        <div className={S.contentWrapper}>
          <button className={S.backButton} onClick={handleGoBack}>
            <img src={back} alt="" />
            뒤로가기
          </button>
          <Title title={exhibitionData.expand.School.Name} subtitle={exhibitionData.expand.Major.Name} />
          <div className={S.infoWrapper}>
            <div className={S.posterWrapper}>
              <Poster url={exhibitionData.URL} image={posterUrl} />
            </div>
            <div className={S.infoSection}>
              <Description title={exhibitionData.Title} description={exhibitionData.Introduce} />
              <ContactInfo tel={exhibitionData.Contact} />
              <div className={S.wrapper}>
                <ExhibitionDate start={exhibitionData.Start} end={exhibitionData.End} time={exhibitionData.Time.time} />
                <LocationInfo address={exhibitionData.Address} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

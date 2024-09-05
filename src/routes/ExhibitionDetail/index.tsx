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

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        const response = await axios.get(
          `${pocketbaseUrl}/api/collections/Exhibition/records/${exhiId}?expand=School,Major,TagLocation,TagDepartment`
        );
        setExhibitionData(response.data);
      } catch (err) {
        console.log('에러확인용으로남겨둔것');
      }
    };

    if (exhiId) {
      fetchExhibitionData();
    }
  }, [exhiId]);

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
          <TagList location={exhibitionData.expand.TagLocation} departments={exhibitionData.expand.TagDepartment} />
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

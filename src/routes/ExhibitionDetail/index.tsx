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
import { getImageURL } from '@/utils';
import TagList from './components/taglist';
import { ExhibitionData } from '@/types/ExhibitionData';
import { useIsLogin } from '@/stores/isLogin';
import CommonHelmet from '@/components/CommonHelmet';
import MoreExhibition from './components/moreExhibition';

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export function Component() {
  const { exhiId } = useParams<{ exhiId: string }>();
  const navigate = useNavigate();
  const [exhibitionData, setExhibitionData] = useState<ExhibitionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(sessionStorage.getItem('userId'));

  // Helmet의 keywords에 전달
  const keywords = [
    exhibitionData?.Title,
    exhibitionData?.SubTitle,
    exhibitionData?.expand?.School?.Name,
    exhibitionData?.expand?.Major?.Name,
    '졸업전시',
    '전시회',
  ]
    .filter(Boolean)
    .join(', ');

  const { isLogin } = useIsLogin(({ isLogin }) => ({
    isLogin,
  }));

  useEffect(() => {
    // 로그인 상태일 때 최근 본 전시 서버에 저장
    const setLoginedViewedExhibitionData = async () => {
      const userData = await axios.get(
        `${pocketbaseUrl}/api/collections/users/records/${userId}?fields=RecentlyViewed`
      );

      let serverDataArray = userData.data.RecentlyViewed.id;

      if (serverDataArray.includes(exhiId as string)) {
        serverDataArray = serverDataArray.filter((data) => data !== exhiId);
      }

      if (serverDataArray.length >= 5) {
        while (serverDataArray.length > 4) {
          serverDataArray.shift();
        }
      }

      serverDataArray.push(exhiId as string);

      await axios.patch(`${pocketbaseUrl}/api/collections/users/records/${userId}?fields=RecentlyViewed`, {
        RecentlyViewed: {
          id: serverDataArray,
        },
      });
    };

    // 게스트 상태일 때 최근 본 전시 세션스토리지에 저장
    const setGuestViewedExhibitionData = async () => {
      let sessionDataString = await sessionStorage.getItem('recentlyViewed');
      if (sessionDataString === null) return;

      let sessionDataArray = sessionDataString.split(',');
      if (sessionDataArray.includes('')) {
        sessionDataArray = sessionDataArray.filter((data) => data !== '');
      }

      if (sessionDataArray.includes(exhiId as string)) {
        sessionDataArray = sessionDataArray.filter((data) => data !== exhiId);
      }

      if (sessionDataArray.length >= 5) {
        while (sessionDataArray.length > 4) {
          sessionDataArray.shift();
        }
      }

      sessionDataArray.push(exhiId as string);
      sessionDataString = sessionDataArray.join(',');
      await sessionStorage.setItem('recentlyViewed', sessionDataString);
    };

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

    if (isLogin && userId !== '') {
      setLoginedViewedExhibitionData();
    } else if (!isLogin && userId === '') {
      setGuestViewedExhibitionData();
    }

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
      <CommonHelmet pageTitle="전시 상세" pageDescription="전시회 상세 정보" keywords={keywords} />
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
              <Description title={exhibitionData.Title} description={exhibitionData.Introduce} exhiId={exhiId} />
              <ContactInfo tel={exhibitionData.Contact} />
              <div className={S.wrapper}>
                <ExhibitionDate start={exhibitionData.Start} end={exhibitionData.End} time={timeData} />
                <LocationInfo address={exhibitionData.Address} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <h2>이 전시가 마음에 든다면?</h2>
      <MoreExhibition
        currentTagDepartments={exhibitionData.expand?.TagDepartment ?? []}
        currentTagLocations={exhibitionData.expand?.TagLocation ?? []}
      />
    </div>
  );
}

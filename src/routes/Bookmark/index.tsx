import S from './style.module.scss';
import FilterOptions from './components/FilterOptions/FilterOptions';
import { useEffect, useState } from 'react';
import ExhibitionInfo from '@/components/ExhibitionSlider/components/ExhibitionInfo';
import { getImageURL } from '@/utils';
import { ExhibitionData } from '@/types/ExhibitionData';
import axios from 'axios';
import BookmarkBanner from './components/BookmarkBanner/BookmarkBanner';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useIsContentPage } from '@/stores/isContentPage';
import { useIsLogin } from '@/stores/isLogin';
import { UserData } from '@/types/UserData';

const dbApiUrl = import.meta.env.VITE_DB_API;

export function Component() {
  const { userId } = useParams<{ userId: string }>();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // checkbox 온라인 전시 | 진행 중 전시 필터
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // dropdown 정렬 순서 필터
  const [sort, setSort] = useState<string>('-Start');

  // 더보기 기능 용 page 번호
  const [page, setPage] = useState<number>(1);

  // 총 항목 수 - 더보기 버튼 알림 용
  const [totalItems, setTotalItems] = useState<number>(0);

  const navigate = useNavigate();

  const { enterContentPage } = useIsContentPage(({ enterContentPage }) => ({
    enterContentPage,
  }));
  // 로그인 했는지 확인하는 상태
  const { isLogin } = useIsLogin(({ isLogin }) => ({
    isLogin,
  }));

  useEffect(() => {
    if (!isLogin) {
      navigate('/', {
        replace: true,
      });
    }

    const getUserData = async () => {
      const response = await axios.get(`${dbApiUrl}collections/users/records/${userId}`);
      setUserData(response.data);
    };

    enterContentPage();
    getUserData();
  }, [isLogin]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${dbApiUrl}collections/Exhibition/records?sort=${sort}&expand=School,Major&page=${page}&perPage=20`;
        const filters: string[] = ['IsApprove=true'];

        const bookmarkDataArray = userData?.Bookmark.id;
        const bookmarkDataFilter = bookmarkDataArray?.map((id) => `id~'${id}'`).join(' || ');

        filters.push(`(${bookmarkDataFilter})`);

        // checkbox 필터 적용
        if (isOnline) filters.push('IsOnline=true');
        if (inProgress) filters.push(`Start<'${today}'%26%26End>'${today}'`);

        // &&로 구분
        if (filters.length > 0) url += `&filter=(${filters.join('%26%26')})`;

        // API 요청
        const response = await axios.get(url);

        if (page === 1) setExhibitions(response.data.items);
        else setExhibitions((prevData) => [...prevData, ...response.data.items]);

        // 총 항목 수 저장
        setTotalItems(response.data.totalItems);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('문제 발생');
      }
    };

    if (userData) {
      fetchData();
    }
  }, [isOnline, inProgress, today, sort, page, userData]);

  // 필터 변경 시 page 1로 reset
  useEffect(() => {
    setExhibitions([]);
    setPage(1);
  }, [isOnline, inProgress, sort, userData]);

  // '더보기' 버튼 핸들러
  function handleLoadMore() {
    // 더 보여줄 데이터 유무 확인
    if (exhibitions.length < totalItems) {
      setPage((prevPage) => prevPage + 1);
    } else {
      // 데이터가 없을 때 표시
      toast.error('전시회 데이터를 모두 불러왔습니다.');
    }
  }

  return (
    <main id="page" className={S.component}>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <BookmarkBanner nickname={userData?.Nickname} />
      {/* 필터 */}
      <FilterOptions
        isOnline={isOnline}
        setIsOnline={setIsOnline}
        inProgress={inProgress}
        setInProgress={setInProgress}
        sort={sort}
        setSort={setSort}
      />
      <hr />
      {/* 검색된 전시 목록 */}
      {exhibitions.length !== 0 ? (
        <>
          <ul className={S.infoContainer}>
            {exhibitions.map((item) => (
              <ExhibitionInfo
                key={item.id}
                schoolName={item?.expand?.School?.Name as string}
                major={item?.expand?.Major?.Name as string}
                posterUrl={getImageURL(item)}
                exhiId={item.id}
              />
            ))}
          </ul>
          <LoadMoreButton onClick={handleLoadMore} />
        </>
      ) : (
        <p className={S.noResult}>북마크가 아직 없습니다. 원하는 전시회를 북마크해 보세요!</p>
      )}
    </main>
  );
}

import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ManageExhibit from './components/ManageExhibit/ManageExhibit';
import { ExhibitionData } from '@/types/ExhibitionData';
import BackButton from './components/BackButton/BackButton';
import { useIsContentPage } from '@/stores/isContentPage';
import { AppSpinner } from '@/components';

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export function Component() {
  useDocumentTitle('전시 등록 관리 | JJ.com');
  const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const navigate = useNavigate();

  const { enterContentPage } = useIsContentPage(({ enterContentPage }) => ({
    enterContentPage,
  }));

  // 관리자 권한 확인
  useEffect(() => {
    enterContentPage();

    const checkAdmin = async () => {
      try {
        const userId = sessionStorage.getItem('userId');

        const response = await axios.get(`${pocketbaseUrl}/api/collections/users/records/${userId}`);
        const userData = response.data;

        if (!userData.Admin) {
          navigate('/', {
            replace: true,
          });
        }
      } catch (err) {
        console.error('Error fetching checking admin status: ', err);
        setError('계정 문제 발생');
      }
    };
    checkAdmin();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${pocketbaseUrl}/api/collections/Exhibition/records/?expand=School,Major&page=${page}&perPage=12&filter=(IsApprove=false)`
        );
        if (page === 1) setExhibitions(response.data.items);
        else setExhibitions((prevData) => [...prevData, ...response.data.items]);

        setTotalItems(response.data.totalItems);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('문제 발생');
      }
    };
    fetchData();
  }, [page]);

  if (error) return <div>{error}</div>;
  if (exhibitions.length === 0) return <AppSpinner />;
  // '더보기' 버튼 핸들러
  function handleLoadMore() {
    // 더 보여줄 데이터 유무 확인
    if (exhibitions.length < totalItems) {
      setPage((prevPage) => prevPage + 1);
    } else {
      // 데이터가 없을 때 표시
      toast.remove();
      toast.error('전시회 데이터를 모두 불러왔습니다.');
    }
  }
  return (
    <main>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className={S.component}>
        <BackButton />
        <h1 className={S.regList}>전시 등록 신청 관리</h1>
        <ul className={S.regListHeader}>
          <li>전시명</li>
          <li>학교</li>
          <li>학과</li>
        </ul>
        <ul className={S.regListItem}>
          {exhibitions.map((item) => (
            <ManageExhibit
              key={item.id}
              id={item.id}
              schoolName={item.expand?.School?.Name}
              major={item.expand?.Major?.Name}
              title={item.Title}
            />
          ))}
        </ul>

        <div className={S.loadMoreButton}>
          <button type="button" onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      </div>
    </main>
  );
}
export default Component;

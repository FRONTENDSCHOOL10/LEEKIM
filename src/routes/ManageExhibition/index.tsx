import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ManageExhibit from './components/ManageExhibit/ManageExhibit';
import { ExhibitionData } from '@/types/ExhibitionData';
import BackButton from './components/BackButton/BackButton';

const pocketbaseUrl = import.meta.env.VITE_DB_URL;

export function Component() {
  useDocumentTitle('전시 등록 관리 | JJ.com');
  const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  // 관리자 권한 확인
  useEffect(() => {
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

        if (response.data.items.length === 0) toast.error('더이상 데이터가 없습니다.');
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('문제 발생');
      }
    };
    fetchData();
  }, [page]);

  if (error) return <div>{error}</div>;
  if (exhibitions.length === 0) return <div>로딩 중⏳</div>;

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
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
              schoolName={item.expand.School.Name}
              major={item.expand.Major.Name}
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
    </>
  );
}
export default Component;

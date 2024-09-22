import { ReactElement, useEffect, useState } from 'react';
import S from './style.module.scss';
import { useIsLogin } from '@/stores/isLogin';
import { useNavigate } from 'react-router-dom';
import { UserData } from '@/types/UserData';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface descriptionProps {
  title: string;
  description: string;
  exhiId: string;
}

const dbApiUrl = import.meta.env.VITE_DB_API;

function Description({ title, description, exhiId }: descriptionProps): ReactElement {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookmarkData, setBookmarkData] = useState<string[]>([]);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isLogin } = useIsLogin(({ isLogin }) => ({
    isLogin,
  }));

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    const checkBookmark = (BookmarkArray: string[]) => {
      if (BookmarkArray && !(BookmarkArray.length > 0)) return;

      if (BookmarkArray.includes(exhiId)) {
        setIsBookmark(true);
      }
    };

    const getUserData = async () => {
      const response = await axios.get(`${dbApiUrl}/collections/users/records/${userId}`);
      setUserData(response.data);
      setBookmarkData(response.data.Bookmark.id);
      checkBookmark(response.data.Bookmark.id);
    };

    if (isLogin && userId !== '') {
      getUserData();
    }
  }, []);

  const handleCheckboxChange = async () => {
    if (!isLogin) {
      if (confirm('로그인 후 이용가능합니다.\n로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login', {
          replace: true,
        });
      } else {
        return;
      }
    }

    if (isBookmark) {
      const cancleBookmarkArray = bookmarkData.filter((item) => item !== exhiId);

      try {
        toast.loading('로딩 중...');

        await axios.patch(`${dbApiUrl}/collections/users/records/${userData?.id}`, {
          Bookmark: {
            id: cancleBookmarkArray,
          },
        });

        const response = await axios.get(`${dbApiUrl}collections/Exhibition/records/${exhiId}?fields=Bookmark`);

        await axios.patch(`${dbApiUrl}collections/Exhibition/records/${exhiId}`, {
          Bookmark: response.data.Bookmark - 1,
        });

        toast.remove();
        toast.success('북마크에서 제거 되었습니다.');
      } catch {
        toast.remove();
        toast.error('서버와의 통신에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
      }

      setIsBookmark(!isBookmark);
    } else if (isBookmark === false) {
      const addBookmarkArray = bookmarkData;
      addBookmarkArray.push(exhiId);

      try {
        toast.loading('로딩 중...');

        await axios.patch(`${dbApiUrl}/collections/users/records/${userData?.id}`, {
          Bookmark: {
            id: addBookmarkArray,
          },
        });

        const response = await axios.get(`${dbApiUrl}collections/Exhibition/records/${exhiId}?fields=Bookmark`);

        await axios.patch(`${dbApiUrl}collections/Exhibition/records/${exhiId}`, {
          Bookmark: response.data.Bookmark + 1,
        });

        toast.remove();
        toast.success('북마크에 추가되었습니다.');
      } catch {
        toast.remove();
        toast.error('서버와의 통신에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
      }

      setIsBookmark(!isBookmark);
    }
  };

  return (
    <div className={S.descriptions}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={10}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 1500,
          },
        }}
      />
      <div className={S.titleWrapper}>
        <h1 className={S.title}>{title}</h1>
        <div className={S.bookmarkCheckBox} onClick={handleCheckboxChange} style={{ cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked={isBookmark} onChange={handleCheckboxChange} className="sr-only" />
          <img src={isBookmark ? '/Icon/IconBookmarkChecked.svg' : '/Icon/IconBookmark.svg'} alt="checkbox" />
        </div>
      </div>
      <p className={S.description}>{description}</p>
    </div>
  );
}

export default Description;

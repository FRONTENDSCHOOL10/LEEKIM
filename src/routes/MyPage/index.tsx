import S from './style.module.scss';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExhibitionInfo from '@/components/ExhibitionSlider/components/ExhibitionInfo';
import { getImageURL } from '@/utils';
import { ExhibitionData } from '@/types/ExhibitionData';
import { useIsLogin } from '@/stores/isLogin';
import { tr } from 'date-fns/locale';
import { log } from 'console';
import toast, { Toaster } from 'react-hot-toast';
import CommonHelmet from '@/components/CommonHelmet';

const dbApiUrl = import.meta.env.VITE_DB_API;

export function Component() {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState(null);
  const [recentlyViewedData, setRecentlyViewedData] = useState<ExhibitionData[] | null>(null);
  const [registerData, setRegisterData] = useState<ExhibitionData[] | null>(null);
  const [bookmarkData, setBookmarkData] = useState<ExhibitionData[] | null>(null);

  const navigate = useNavigate();

  const { isLogin, logout } = useIsLogin(({ isLogin, logout }) => ({
    isLogin,
    logout,
  }));

  useEffect(() => {
    if (!isLogin) {
      navigate('/', {
        replace: true,
      });
    }

    let localUserData = null;

    const getRelationExhiData = async (RelationIdDataArray, setFunction) => {
      if (!RelationIdDataArray.length > 0) return [];

      const dataArray = [];

      for (let id of RelationIdDataArray) {
        const response = await axios.get(`${dbApiUrl}collections/Exhibition/records/${id}?expand=School,Major`);
        dataArray.push(response.data);
      }

      setFunction(dataArray);
    };

    const getRegisterData = async () => {
      const response = await axios.get(
        `${dbApiUrl}collections/Exhibition/records?expand=School,Major&filter=(Author='${userId}')`
      );
      setRegisterData(response.data.items);
    };

    const getUserData = async () => {
      const response = await axios.get(`${dbApiUrl}collections/users/records/${userId}`);
      localUserData = response.data;
      setUserData(localUserData);

      getRelationExhiData(localUserData.RecentlyViewed.id, setRecentlyViewedData);
      getRegisterData();
      getRelationExhiData(localUserData.Bookmark.id, setBookmarkData);
    };

    try {
      getUserData();
    } catch (err) {
      console.clear();
      window.location.reload();
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    if (confirm('정말 로그아웃 하시겠어요?')) {
      toast.success('로그아웃이 완료되었습니다.\n다음에 또 만나요!');

      await setTimeout(() => {
        sessionStorage.setItem('userId', '');
        logout();
        navigate('/', {
          replace: true,
        });
        toast.remove();
      }, 1500);
    }
  };

  return (
    <main id="page" className={S.component}>
      <CommonHelmet pageTitle="마이페이지" pageDescription="졸전 닷컴 마이페이지" />

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
      <div>
        <p className="sr-only">{userData?.username}님 어서오세요!</p>
        <span aria-hidden="true">{userData?.username}</span>
        <span aria-hidden="true">님 어서오세요!</span>
        <NavLink to={`/editProfile/${userId}`}>프로필 편집</NavLink>
        <NavLink to={'/registerExhi'}>전시 등록</NavLink>
      </div>
      <section>
        <h2>최근 본 전시</h2>
        <ul>
          {recentlyViewedData?.map((item: ExhibitionData) =>
            item ? (
              <li key={item.id}>
                <ExhibitionInfo
                  schoolName={item?.expand?.School?.Name as string}
                  major={item?.expand?.Major?.Name as string}
                  posterUrl={getImageURL(item)}
                  exhiId={item.id}
                />
              </li>
            ) : (
              <li>
                <p>최근 본 전시가 존재하지 않습니다.😭</p>
              </li>
            )
          )}
        </ul>
      </section>
      <div>
        <section>
          <h2>내가 등록한 전시</h2>
          {registerData?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th scope="col">전시명</th>
                  <th scope="col">학교</th>
                  <th scope="col">학과</th>
                  <th scope="col">바로가기</th>
                </tr>
              </thead>
              <tbody>
                {registerData?.slice(0, 2).map((item: ExhibitionData) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.Title}</td>
                      <td>{item?.expand?.School?.Name}</td>
                      <td>{item?.expand?.Major?.Name}</td>
                      <td>
                        <NavLink to={`/exhibition/detail/${item.id}`}>{'>'}</NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>현재 등록된 전시가 없습니다. 전시를 등록해 주세요.😂</p>
          )}
        </section>
        <section>
          <h2>북마크</h2>
          <ul>
            {bookmarkData?.map((item: ExhibitionData) =>
              item ? (
                <li key={item.id}>
                  <NavLink to={`/exhibition/detail/${item.id}`}>
                    <img
                      src={getImageURL(item)}
                      alt={`${item?.expand?.School?.Name} ${item?.expand?.Major?.Name} 졸업전시회`}
                    />
                  </NavLink>
                </li>
              ) : (
                <li>
                  <p>아직 북마크한 전시가 없어요. 마음에 드는 전시를 북마크해 보세요!</p>
                </li>
              )
            )}
          </ul>
        </section>
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </main>
  );
}

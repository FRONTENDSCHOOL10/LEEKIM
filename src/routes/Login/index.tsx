import useDocumentTitle from '@/hooks/useDocumentTitle';
import { useIsContentPage } from '@/stores/isContentPage';
import { useIsLogin } from '@/stores/isLogin';
import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import S from './style.module.scss';
import SnsLoginButton from './components/SnsLoginButton';
import Divider from './components/Divider';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ExhibitionData } from '@/types/ExhibitionData';
import { getImageURL } from '@/utils';

const dbApiUrl = import.meta.env.VITE_DB_API;

export function Component() {
  useDocumentTitle('로그인 | JJ.com');

  const [exhibitionItem, setExhibitionItem] = useState<ExhibitionData | null>(null);

  const emailInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const emailInputId = useId();
  const pwInputId = useId();

  const { exitContentPage } = useIsContentPage(({ exitContentPage }) => ({
    exitContentPage,
  }));
  // 로그인 했는지 확인하는 상태
  const { isLogin, login } = useIsLogin(({ isLogin, login }) => ({
    isLogin,
    login,
  }));

  useEffect(() => {
    if (isLogin) {
      navigate('/', {
        replace: true,
      });
    }

    const getExhibitionData = async () => {
      try {
        const response = await axios.get(
          `${dbApiUrl}/collections/Exhibition/records?filter=(IsApprove=true%26%26IsHorizontal=false)&sort=@random&page=1&perPage=1&expand=School,Major`
        );
        setExhibitionItem(response.data.items[0]);
      } catch (err) {
        throw new Error('데이터를 불러오는 데 실패했습니다.');
      }
    };

    getExhibitionData();
    exitContentPage();
  }, [isLogin]);

  const handleLoginButton = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailInput.current?.value.trim() || !pwInput.current?.value.trim()) {
      toast.error('이메일 및 비밀번호를 입력하세요');
      emailInput.current!.value = '';
      pwInput.current!.value = '';
      return;
    }

    try {
      let toastMessage = toast.loading('로딩중...');

      const response = await axios.post(`${dbApiUrl}collections/users/auth-with-password`, {
        identity: emailInput.current.value,
        password: pwInput.current.value,
      });

      // 최근 본 전시를 세션에서 처리할 때 다시 사용할 수도 있는 코드
      if (sessionStorage.getItem('recentlyViewed') !== '') {
        const userData = await axios.get(`${dbApiUrl}collections/users/records/${response.data.record.id}`);
        const dataArray = userData.data.RecentlyViewed.id;

        const sessionStorageString = await sessionStorage.getItem('recentlyViewed');
        if (sessionStorageString === null) return;

        const sessionStorageArray = sessionStorageString?.split(',');

        for (const id of sessionStorageArray) {
          if (dataArray.includes(id)) {
            dataArray.filter((item) => item !== id);
          }
        }

        const mergeArray = [...dataArray, ...sessionStorageArray];

        if (mergeArray.length >= 5) {
          while (mergeArray.length > 4) {
            mergeArray.shift();
          }
        }

        await axios.patch(`${dbApiUrl}collections/users/records/${response.data.record.id}?fields=RecentlyViewed`, {
          RecentlyViewed: {
            id: mergeArray,
          },
        });
      }

      toast.success('로그인에 성공했습니다.\n메인페이지로 이동합니다.', {
        id: toastMessage,
      });

      // 토스트 창을 기다린 뒤 홈으로 이동
      await setTimeout(() => {
        sessionStorage.setItem('recentlyViewed', '');
        sessionStorage.setItem('userId', response.data.record.id);
        login();
        navigate('/', {
          replace: true,
        });
        toast.remove();
      }, 1500);
    } catch (err) {
      toast.remove();
      toast.error('로그인 정보가 정확하지 않거나,\n계정이 존재하지 않습니다.');
      emailInput.current.value = '';
      pwInput.current.value = '';
      sessionStorage.setItem('userId', '');
    }
  };

  return (
    <main className={S.component}>
      <div role="presentation">
        <h2>로그인</h2>
        <p>효율적인 서비스 이용을 위해 로그인해 주세요.</p>
        <SnsLoginButton>Google 계정으로 로그인</SnsLoginButton>
        <SnsLoginButton>KAKAO 계정으로 로그인</SnsLoginButton>
        <div role="presentation">
          <Divider />
          <span>or</span>
          <Divider />
        </div>
        <form onSubmit={handleLoginButton}>
          <label htmlFor={emailInputId}>Email</label>
          <input id={emailInputId} type="email" placeholder="email@joljeon.com" ref={emailInput} />
          <label htmlFor={pwInputId}>비밀번호</label>
          <input id={pwInputId} type="password" placeholder="비밀번호를 입력해 주세요" ref={pwInput} />
          <button type="submit">로그인</button>
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
        </form>
        <p>계정이 없으신가요?</p>
        <NavLink to={'/join'}>회원가입</NavLink>
      </div>
      {exhibitionItem && (
        <NavLink to={`/exhibition/detail/${exhibitionItem.id}`}>
          <img
            src={getImageURL(exhibitionItem)}
            alt={`${exhibitionItem.expand?.School?.Name} ${exhibitionItem.SubTitle} 졸업전시회 포스터`}
          />
        </NavLink>
      )}
    </main>
  );
}

import { memo, useId, useRef } from 'react';
import S from './style.module.scss';
import Divider from './components/Divider';
import Profile from './components/Profile';
import FooterNavigation from './components/FooterNavigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const dbApiUrl = import.meta.env.VITE_DB_API;

function AppFooter() {
  const subscribeInputId = useId();

  const subscribeEmailInput = useRef<HTMLInputElement>(null);

  const navigation = {
    com: {
      title: '졸전.COM',
      menu: [
        { text: '메인 페이지', path: '/' },
        { text: '프로젝트 소개', path: '/introduce' },
      ],
    },
    info: {
      title: '전시 정보',
      menu: [
        { text: '전체 전시', path: '/exhibition' },
        { text: '진행 중 전시', path: '/#exhibitionIng' },
        { text: '진행 예정 전시', path: '/#exhibitionSoon' },
        { text: '최근 본 전시', path: '/#exhibitionRecent' },
      ],
    },
    client: {
      title: '고객 지원',
      menu: [
        { text: '마이페이지', path: '/my/:userId' },
        { text: '전시 등록', path: '/registerExhi' },
        { text: '이용 약관', path: '/termsOfUse' },
      ],
    },
  };

  // 이메일 검증 함수
  const validateEmail = (email: string): boolean => {
    // 이메일 형식을 검증하는 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subscribeEmailInput.current && !subscribeEmailInput.current.value.trim()) {
      toast.error('이메일을 입력해 주세요.');

      subscribeEmailInput.current.value = '';
      return;
    }

    if (subscribeEmailInput.current && !validateEmail(subscribeEmailInput.current?.value)) {
      toast.error('올바르지 않은 이메일 형식입니다.');
      subscribeEmailInput.current.value = '';
      return;
    }

    try {
      if (subscribeEmailInput.current) {
        // 이미 구독한 이메일인지 확인
        const existEmailData = await axios.get(
          `${dbApiUrl}collections/Subscribe/records?filter=(Email='${subscribeEmailInput.current.value}')`
        );

        if (existEmailData.data.items.length > 0) {
          toast.remove();
          toast.error('이미 구독하신 이메일 주소입니다.');
          subscribeEmailInput.current.value = '';
          return;
        }

        await axios.post(`${dbApiUrl}collections/Subscribe/records`, {
          Email: subscribeEmailInput.current.value,
        });

        subscribeEmailInput.current.value = '';

        toast.remove();
        toast.success('구독 완료!\n졸업 전시회의 특별한 순간들을 함께 하세요!🎓');
      }
    } catch (err) {
      toast.remove();
      toast.error('서버와의 통신에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <footer className={S.component}>
      <div role="presentation" className={S.wrapperBox}>
        <div className={S.leftSide}>
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
            }}
          />
          <form onSubmit={handleSubscribe}>
            <label htmlFor={subscribeInputId}>
              이메일을 등록하여
              <br />
              새로운 졸업 전시 알림을 받아보세요!
            </label>
            <br />
            {/* 구독하기 처리 로직 필요, 현재는 아무 기능없이 마크업만 완료된 상태 */}
            <input
              id={subscribeInputId}
              type="email"
              placeholder="email@joljeon.com"
              spellCheck="false"
              ref={subscribeEmailInput}
            />
            <br />
            <button type="submit">구독하기</button>
          </form>
          <img src="/Icon/TextLogo.svg" alt="졸전닷컴 글자 로고" />
        </div>
        <div className={S.rightSide}>
          <nav className={S.navigation}>
            <h2 className="sr-only">푸터 메뉴 내비게이션</h2>
            <FooterNavigation element={navigation.com} />
            <FooterNavigation element={navigation.info} />
            <FooterNavigation element={navigation.client} />
          </nav>
          <Divider />
          <div role="presentation">
            <p className={S.groupText}>TEAM.LEEKIM</p>
            <div className={S.profile}>
              <Profile name="김시원" email="rkdmf1306@gmail.com" link="https://github.com/chlyun" />
              <Profile name="김재림" email="jaerim1102@naver.com" link="https://github.com/jaerim1102" />
              <Profile name="이지수" email="szjslee@gmail.com" link="https://github.com/Jisoo0907" />
              <Profile name="이진용" email="yjy1480@gmail.com" link="https://github.com/Lee-Jinyong" />
            </div>
            <p className={S.rightText}>ⓒ 2024 JJ.COM of Korea Co., Ltd. All Rights Reserved. </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(AppFooter);

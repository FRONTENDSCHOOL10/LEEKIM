import useDocumentTitle from '@/hooks/useDocumentTitle';
import { useIsContentPage } from '@/stores/isContentPage';
import { useIsLogin } from '@/stores/isLogin';
import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import S from './style.module.scss';
import SnsJoinButton from './components/SnsJoinButton';
import Divider from './components/Divider';
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { TagData } from '@/types/TagData';

interface CheckState {
  visibility: React.CSSProperties['visibility'];
  ariaHidden: boolean;
}

const dbApiUrl = import.meta.env.VITE_DB_API;

export function Component() {
  useDocumentTitle('회원가입 | JJ.com');

  const [tagData, setTagData] = useState<TagData[] | null>(null);
  const interestedTagArray = useRef<string[]>([]);

  // 안내 메시지 보이기, 숨기기 관리하는 상태
  const [checkName, setCheckName] = useState<CheckState>({ visibility: 'hidden', ariaHidden: true });
  const [checkEmail, setCheckEmail] = useState<CheckState>({ visibility: 'hidden', ariaHidden: true });
  const [checkPw, setCheckPw] = useState<CheckState>({ visibility: 'hidden', ariaHidden: true });
  const [checkPwConfirm, setCheckPwConfirm] = useState<CheckState>({ visibility: 'hidden', ariaHidden: true });

  // 닉네임 input이 비어있으면 true, 비어있지 않으면 validation 안내 메시지를 띄우기 위해 false
  const [nameEmpty, setNameEmpty] = useState(true);
  // 이메일 input이 비어있으면 true, 비어있지 않으면 validation 안내 메시지를 띄우기 위해 false
  const [emailEmpty, setEmailEmpty] = useState(true);
  // 비밀번호 input이 비어있으면 true, 비어있지 않으면 validation 안내 메시지를 띄우기 위해 false
  const [pwEmpty, setPwEmpty] = useState(true);
  // 비밀번호 확인 input이 비어있으면 true, 비어있지 않으면 '비밀번호와 일치하지 않음' 안내 메시지를 띄우기 위해 false
  const [pwConfirmEmpty, setPwConfirmEmpty] = useState(true);

  // DOM에 접근하기 위한 useRef
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);
  const pwConfirmInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const nameInputId = useId();
  const emailInputId = useId();
  const pwInputId = useId();
  const pwConfirmInputId = useId();

  const { exitContentPage } = useIsContentPage(({ exitContentPage }) => ({
    exitContentPage,
  }));
  // 로그인 했는지 확인하는 상태
  const { isLogin } = useIsLogin(({ isLogin }) => ({
    isLogin,
  }));

  useEffect(() => {
    if (isLogin) {
      navigate('/', {
        replace: true,
      });
    }

    const getTagData = async () => {
      try {
        const response = await axios.get(`${dbApiUrl}/collections/TagDepartment/records`);
        setTagData(response.data.items);
      } catch (err) {
        throw new Error('데이터를 불러오는 데 실패했습니다.');
      }
    };

    getTagData();
    exitContentPage();
  }, [isLogin]);

  // 닉네임 검증 함수
  const validateName = (nickname: string): boolean => {
    // 한글, 영문 대소문자, 숫자만 허용, 3자에서 9자까지
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{3,9}$/;
    return nicknameRegex.test(nickname);
  };

  // 이메일 검증 함수
  const validateEmail = (email: string): boolean => {
    // 이메일 형식을 검증하는 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 검증 함수
  const validatePassword = (password: string): boolean => {
    // 최소 8자, 하나 이상의 숫자, 특수문자, 영어 문자 포함
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // 회원가입 할 때 세션 스토리지의 최근 본 전시 데이터를 서버의 유저 정보에 저장
  const setLoginedViewedExhibitionData = async () => {
    let sessionDataString = await sessionStorage.getItem('recentlyViewed');
    if (sessionDataString === null) return [];

    let sessionDataArray = sessionDataString.split(',');
    if (sessionDataArray.includes('')) {
      sessionDataArray = sessionDataArray.filter((data) => data !== '');
    }

    if (sessionDataArray.length > 5) {
      while (sessionDataArray.length > 5) {
        sessionDataArray.shift();
      }
    }

    return sessionDataArray;
  };

  // 회원가입 버튼 눌렀을 때 처리하는 함수
  const handleJoinButton = async (e: FormEvent) => {
    e.preventDefault();

    let allValidateComplete = true;

    setCheckName({ visibility: 'hidden', ariaHidden: true });
    setCheckEmail({ visibility: 'hidden', ariaHidden: true });
    setCheckPw({ visibility: 'hidden', ariaHidden: true });
    setCheckPwConfirm({ visibility: 'hidden', ariaHidden: true });

    // 각각의 input이 비어있는지 체크 후 안내메시지 띄우기
    if (
      !nameInput.current?.value.trim() ||
      !emailInput.current?.value.trim() ||
      !pwInput.current?.value.trim() ||
      !pwConfirmInput.current?.value.trim()
    ) {
      if (!nameInput.current?.value.trim()) {
        setNameEmpty(true);
        setCheckName({ visibility: 'visible', ariaHidden: false });
        nameInput.current!.value = '';
      }
      if (!emailInput.current?.value.trim()) {
        setEmailEmpty(true);
        setCheckEmail({ visibility: 'visible', ariaHidden: false });
        emailInput.current!.value = '';
      }
      if (!pwInput.current?.value.trim()) {
        setPwEmpty(true);
        setCheckPw({ visibility: 'visible', ariaHidden: false });
        pwInput.current!.value = '';
      }
      if (!pwConfirmInput.current?.value.trim()) {
        setPwConfirmEmpty(true);
        setCheckPwConfirm({ visibility: 'visible', ariaHidden: false });
        pwConfirmInput.current!.value = '';
      }
      return;
    }

    // 닉네임이 올바르지 못한 입력을 받았을 때 안내메시지 띄우기
    if (!validateName(nameInput.current.value)) {
      setNameEmpty(false);
      setCheckName({ visibility: 'visible', ariaHidden: false });
      allValidateComplete = false;
    }

    // 이메일이 올바르지 못한 입력을 받았을 때 안내메시지 띄우기
    if (!validateEmail(emailInput.current.value)) {
      setEmailEmpty(false);
      setCheckEmail({ visibility: 'visible', ariaHidden: false });
      allValidateComplete = false;
    }

    // 비밀번호가 올바르지 못한 입력을 받았을 때 안내메시지 띄우기
    if (!validatePassword(pwInput.current.value)) {
      setPwEmpty(false);
      setCheckPw({ visibility: 'visible', ariaHidden: false });
      allValidateComplete = false;
    }

    // 올바르지 못한 입력을 받은 input이 하나라도 있다면 return
    if (!allValidateComplete) {
      return;
    }

    // 비밀번호와 비밀번호 확인이 일치하지 않으면 안내메시지 띄우기
    if (pwInput.current.value !== pwConfirmInput.current.value) {
      setPwConfirmEmpty(false);
      setCheckPwConfirm({ visibility: 'visible', ariaHidden: false });
      return;
    }

    try {
      toast.loading('회원가입 절차 마무리 중...');

      // 동일한 닉네임이 있는지 확인
      const existNameData = await axios.get(
        `${dbApiUrl}collections/users/records?filter=(username='${nameInput.current.value}')`
      );

      if (existNameData.data.items.length > 0) {
        toast.remove();
        toast.error('이미 사용 중인 닉네임입니다.');
        return;
      }

      // 동일한 이메일이 있는지 확인
      const existEmailData = await axios.get(
        `${dbApiUrl}collections/users/records?filter=(email='${emailInput.current.value}')`
      );

      if (existEmailData.data.items.length > 0) {
        toast.remove();
        toast.error('이미 사용 중인 이메일입니다.');
        return;
      }

      const sessionStorageViewedArray = await setLoginedViewedExhibitionData();

      await axios.post(`${dbApiUrl}collections/users/records`, {
        username: nameInput.current.value,
        email: emailInput.current.value,
        emailVisibility: true,
        password: pwInput.current.value,
        passwordConfirm: pwConfirmInput.current.value,
        Bookmark: {
          id: [],
        },
        RecentlyViewed: {
          id: sessionStorageViewedArray,
        },
        InterestedTag: interestedTagArray.current,
        Admin: false,
      });

      toast.remove();
      toast.success('졸전 닷컴에 오신 걸 환영합니다!\n로그인 페이지로 이동합니다.');
      // 토스트 창을 기다린 뒤 로그인 창으로 이동
      setTimeout(() => {
        navigate('/login', {
          replace: true,
        });
        toast.remove();
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.remove();
      toast.error('서버와의 통신에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
    }
  };

  const handleTagChecked = (tagId: string) => {
    if (interestedTagArray.current.includes(tagId)) {
      const filterArray = interestedTagArray.current.filter((id) => id !== tagId);
      interestedTagArray.current = filterArray;
      console.log(interestedTagArray.current);
      return;
    }

    interestedTagArray.current.push(tagId);

    console.log(interestedTagArray.current);
  };

  return (
    <main className={S.component}>
      <div role="presentation">
        <h2>
          <span>졸전닷컴</span>에 어서오세요!
        </h2>
        <div className={S.loginComponent}>
          <SnsJoinButton>Google 계정으로 회원가입</SnsJoinButton>
          <SnsJoinButton>KAKAO 계정으로 회원가입</SnsJoinButton>
        </div>
        <Divider />
        <div role="presentation" className={S.orSpan}>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <form onSubmit={handleJoinButton}>
          <fieldset>
            <label htmlFor={nameInputId}>닉네임</label>
            <input id={nameInputId} type="text" placeholder="김졸전" ref={nameInput} />
            {nameEmpty ? (
              <span style={{ visibility: checkName.visibility }} aria-hidden={checkName.ariaHidden}>
                닉네임을 입력하세요
              </span>
            ) : (
              <span style={{ visibility: checkName.visibility }} aria-hidden={checkName.ariaHidden}>
                한글, 영문 대소문자, 숫자만 포함해서 3~9자 사이로 작성해 주세요
              </span>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor={emailInputId}>Email</label>
            <input id={emailInputId} type="email" placeholder="email@joljeon.com" ref={emailInput} />
            {emailEmpty ? (
              <span style={{ visibility: checkEmail.visibility }} aria-hidden={checkEmail.ariaHidden}>
                이메일을 입력하세요
              </span>
            ) : (
              <span style={{ visibility: checkEmail.visibility }} aria-hidden={checkEmail.ariaHidden}>
                올바르지 않은 이메일 형식입니다
              </span>
            )}
          </fieldset>
          <div className={S.passwordField}>
            <fieldset>
              <label htmlFor={pwInputId}>비밀번호</label>
              <input id={pwInputId} type="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상" ref={pwInput} />
              {pwEmpty ? (
                <span style={{ visibility: checkPw.visibility }} aria-hidden={checkPw.ariaHidden}>
                  비밀번호를 입력하세요
                </span>
              ) : (
                <span
                  style={{ visibility: checkPw.visibility }}
                  aria-hidden={checkPw.ariaHidden}
                  className={S.passwordInput}
                >
                  영문, 숫자, 특수문자(@, $, !, %, *, ?, &) 포함 8자 이상
                </span>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor={pwConfirmInputId}>비밀번호 확인</label>
              <input id={pwConfirmInputId} type="password" placeholder="똑같이 입력해 주세요" ref={pwConfirmInput} />
              {pwConfirmEmpty ? (
                <span style={{ visibility: checkPwConfirm.visibility }} aria-hidden={checkPwConfirm.ariaHidden}>
                  비밀번호 확인을 입력하세요
                </span>
              ) : (
                <span style={{ visibility: checkPwConfirm.visibility }} aria-hidden={checkPwConfirm.ariaHidden}>
                  비밀번호와 일치하지 않습니다
                </span>
              )}
            </fieldset>
          </div>
          <button type="submit">회원가입</button>
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
        <div className={S.join}>
          <p>계정이 있으신가요?</p>
          <NavLink to={'/login'}>로그인</NavLink>
        </div>
      </div>
      <form className={S.tag}>
        <fieldset>
          <legend>
            내가 관심 있는 <strong>태그</strong>를 선택해 주세요!
          </legend>

          {tagData?.map(({ id, Name }) =>
            id ? (
              <div key={id.slice(0, 5)}>
                <label htmlFor={id.slice(0, 5)}>{Name}</label>
                <input type="checkbox" id={id.slice(0, 5)} onChange={() => handleTagChecked(id)} />
              </div>
            ) : null
          )}
        </fieldset>
      </form>
    </main>
  );
}

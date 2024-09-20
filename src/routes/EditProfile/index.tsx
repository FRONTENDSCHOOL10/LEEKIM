import React, { useEffect, useRef, useState } from 'react';
import S from './style.module.scss';
import { useIsLogin } from '@/stores/isLogin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UserData } from '@/types/UserData';
import CommonHelmet from '@/components/CommonHelmet';

const dbApiUrl = import.meta.env.VITE_DB_API;

export function Component() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData | null>(null);

  const inputNickname = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputConfirmPassword = useRef<HTMLInputElement>(null);

  const { isLogin, login } = useIsLogin(({ isLogin, login }) => ({
    isLogin,
    login,
  }));

  useEffect(() => {
    if (!isLogin) {
      navigate('/', {
        replace: true,
      });
    }

    const userId = sessionStorage.getItem('userId');

    const getUserData = async () => {
      const response = await axios.get(`${dbApiUrl}collections/users/records/${userId}`);
      setUserData(response.data);
    };

    getUserData();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 각각의 input이 비어있는지 체크 후 안내메시지 띄우기
    if (
      !inputNickname.current?.value.trim() ||
      !inputEmail.current?.value.trim() ||
      !inputPassword.current?.value.trim() ||
      !inputConfirmPassword.current?.value.trim()
    ) {
      if (!inputNickname.current?.value.trim()) {
        inputNickname.current!.value = '';
      }
      if (!inputEmail.current?.value.trim()) {
        inputEmail.current!.value = '';
      }
      if (!inputPassword.current?.value.trim()) {
        inputPassword.current!.value = '';
      }
      if (!inputConfirmPassword.current?.value.trim()) {
        inputConfirmPassword.current!.value = '';
      }
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    // 닉네임이 올바르지 못한 입력을 받았을 때 안내메시지 띄우기
    if (!validateName(inputNickname.current.value)) {
      toast.error('닉네임은 한글, 영문 대소문자, 숫자만 포함해서\n3~9자 사이로 작성해 주세요.');
      return;
    }

    // 이메일이 올바르지 못한 입력을 받았을 때 안내메시지 띄우기
    if (!validateEmail(inputEmail.current.value)) {
      toast.error('올바르지 않은 이메일 형식입니다.');
      return;
    }

    if (inputPassword.current.value !== inputConfirmPassword.current.value) {
      toast.error('비밀번호 확인이 비밀번호와 일치하지 않습니다.');
      return;
    }

    try {
      toast.loading('프로필 정보를 수정하고 있습니다...');

      // 동일한 닉네임이 있는지 확인
      const existNameData = await axios.get(
        `${dbApiUrl}collections/users/records?filter=(username='${inputNickname.current.value}'%26%26id!='${userData?.id}')`
      );

      if (existNameData.data.items.length > 0) {
        toast.remove();
        toast.error('이미 사용 중인 닉네임입니다.');
        return;
      }

      // 동일한 이메일이 있는지 확인
      const existEmailData = await axios.get(
        `${dbApiUrl}collections/users/records?filter=(email='${inputEmail.current.value}'%26%26id!='${userData?.id}')`
      );

      if (existEmailData.data.items.length > 0) {
        toast.remove();
        toast.error('이미 사용 중인 이메일입니다.');
        return;
      }

      if (userData) {
        const authUserData = await axios.post(`${dbApiUrl}collections/users/auth-with-password`, {
          identity: userData.email,
          password: inputPassword.current.value,
        });

        if (authUserData.data.record) {
          await axios.patch(`${dbApiUrl}collections/users/records/${userData.id}`, {
            username: inputNickname.current.value,
            email: inputEmail.current.value,
          });
        }

        toast.remove();
        toast.success('프로필 정보가 성공적으로 수정되었습니다!');
        // 토스트 창을 기다린 뒤 로그인 창으로 이동
        setTimeout(() => {
          navigate(`/my/${userData.id}`, {
            replace: true,
          });
          toast.remove();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      toast.remove();
      toast.error('서버와의 통신에 실패했습니다.\n잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <main id="page" className={S.component}>
      <CommonHelmet pageTitle="프로필 편집" pageDescription="프로필 편집 페이지" />
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

      <h2>프로필 편집</h2>

      <div className="edit-profile">
        <form onSubmit={handleSubmit}>
          {/* 닉네임 인풋 */}
          <div className="form-group">
            <label htmlFor="editProfileNickname">닉네임</label>
            <input
              type="text"
              id="editProfileNickname"
              required
              defaultValue={userData?.username}
              ref={inputNickname}
            />
          </div>

          {/* 이메일 인풋 */}
          <div className="form-group email-form">
            <label htmlFor="editProfileEmail">Email</label>
            <input type="email" id="editProfileEmail" required defaultValue={userData?.email} ref={inputEmail} />
          </div>

          {/* 비밀번호 인풋 */}
          <div className="form-group">
            <label htmlFor="editProfilePassword">비밀번호</label>
            <input type="password" id="editProfilePassword" required ref={inputPassword} />
          </div>

          {/* 비밀번호 확인 인풋 */}
          <div className="form-group">
            <label htmlFor="editProfileConfirmPassword">비밀번호 확인</label>
            <input type="password" id="editProfileConfirmPassword" required ref={inputConfirmPassword} />
          </div>

          {/* 수정하기 버튼 */}
          <button type="submit" className="btn-submit">
            수정하기
          </button>
        </form>
      </div>
    </main>
  );
}

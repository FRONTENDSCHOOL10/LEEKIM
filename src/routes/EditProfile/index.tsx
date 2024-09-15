import React, { useState, useEffect } from 'react';
import S from './style.module.scss';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import PocketBase from 'pocketbase';

const pb = import.meta.env.VITE_DB_URL;

export function Component() {
  useDocumentTitle('프로필 편집 | JJ.com');

  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // 로그인 상태 확인
    if (pb.authStore && pb.authStore.model) {
      setIsAuthenticated(true); // 로그인된 상태면 true로 설정
      setNickname(pb.authStore.model?.username || '');
      setEmail(pb.authStore.model?.email || '');
    } else {
      setIsAuthenticated(false);
      setError('프로필을 편집하려면 로그인을 해 주세요.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호가 틀립니다.');
      return;
    }

    try {
      const currentUser = pb.authStore.model; // 현재 로그인한 유저 정보 가져오기
      if (!currentUser) {
        setError('로그인을 먼저 해 주세요.');
        return;
      }

      // 유저 정보 업데이트
      const updatedUser = await pb.collection('users').update(currentUser.id, {
        username: nickname,
        email: email,
        password: password,
        passwordConfirm: confirmPassword, // PocketBase에서 비밀번호 확인 필드 필요
      });

      setSuccess('Profile updated successfully!');
      setError(null);
    } catch (err: any) {
      setError('프로필 수정에 실패했습니다. ' + err.message);
      setSuccess(null);
    }
  };
  return (
    <main id="page" className={S.component}>
      <h2>프로필 편집</h2>

      <div className="edit-profile">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* 닉네임 인풋 */}
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          </div>

          {/* 이메일 인풋 */}
          <div className="form-group email-form">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* 비밀번호 인풋 */}
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 인풋 */}
          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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

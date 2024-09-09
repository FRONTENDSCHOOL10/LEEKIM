import { memo } from 'react';
import S from './style.module.scss';

function SnsButton({ children }) {
  const handleSnsLoginButton = () => {
    alert('해당 기능은 아직 준비 중입니다.\n홈페이지 회원가입을 이용해주세요.');
  };

  return <button onClick={handleSnsLoginButton}>{children}</button>;
}

export default memo(SnsButton);

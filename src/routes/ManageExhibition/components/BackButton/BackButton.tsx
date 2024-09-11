import back from '/Icon/IconBackWhite.svg';
import S from './style.module.scss';
import { useNavigate } from 'react-router-dom';

/* 뒤로가기 버튼 */
function BackButton() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <button className={S.component} onClick={handleGoBack}>
      <img src={back} alt="" />
      뒤로가기
    </button>
  );
}
export default BackButton;

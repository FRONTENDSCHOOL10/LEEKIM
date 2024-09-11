import { NavLink } from 'react-router-dom';
import S from './style.module.scss';
import { ReactElement } from 'react';

type ExhibitionInfoProps = {
  id: string;
  schoolName?: string;
  major?: string;
  title: string;
};

function ManageExhibit({ id, title, schoolName, major }: ExhibitionInfoProps): ReactElement {
  return (
    <NavLink to={`/manageExhibition/detail/${id}`} className={S.link}>
      <div className={S.component}>
        <li>{title}</li>
        <li>{schoolName}</li>
        <li className={S.listIcon}>
          {major}
          <img src="/Icon/IconSmallArrow.svg" alt="" />
        </li>
      </div>
    </NavLink>
  );
}
export default ManageExhibit;

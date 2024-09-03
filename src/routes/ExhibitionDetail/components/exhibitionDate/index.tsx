import { ReactElement } from 'react';
import S from './style.module.scss';
import calendar from '/icon/calendar.svg';

interface dateProps {
  date: string;
  day: string;
  time: string;
}

function ExhibitionDate({ date, day, time }: dateProps): ReactElement {
  return (
    <div className={S.schedule}>
      <div className={S.header}>
        <img src={calendar} alt="calendar" />
        <h2>전시 일정</h2>
      </div>
      <ul className={S.scheduleList}>
        <li>
          {date}({day}){time}
        </li>
        <li>
          {date}({day}){time}
        </li>
      </ul>
    </div>
  );
}

export default ExhibitionDate;

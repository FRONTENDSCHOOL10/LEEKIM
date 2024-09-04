import React, { ReactElement } from 'react';
import S from './style.module.scss';
import calendar from '/Icon/calendar.svg';
import { format, parseISO, addHours } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DateProps {
  start: string;
  end: string;
  time: string[];
}

function ExhibitionDate({ start, end, time }: DateProps): ReactElement {
  const formatDate = (dateString: string): string => {
    const utcDate = parseISO(dateString);
    const kstDate = addHours(utcDate, -9);
    const formattedDate = format(kstDate, 'yyyy년 MM월 dd일 (EEE)', { locale: ko });
    return formattedDate;
  };

  const startDate = formatDate(start);
  const endDate = formatDate(end);

  return (
    <div className={S.schedule}>
      <div className={S.header}>
        <img src={calendar} alt="calendar" />
        <h2>전시 일정</h2>
      </div>
      <p>{startDate}</p>
      <p>{endDate}</p>
      <ul>
        {time.map((timeInfo, index) => (
          <li key={index}>{timeInfo}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExhibitionDate;

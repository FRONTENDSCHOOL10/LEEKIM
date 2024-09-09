import { ReactElement } from 'react';
import github from '../../../../assets/github.svg';
import mail from '../../../../assets/mail.svg';
import contact2 from '../../../../assets/contact2.svg';
import S from './style.module.scss';

interface MemberLinkProps {
  contact: string;
  maillink: string;
  githublink: string;
}

function MemberLink({ githublink, maillink, contact }: MemberLinkProps): ReactElement {
  return (
    <div className={S.link}>
      <a href={githublink} target="_blank" rel="noreferrer">
        <img src={github} alt="깃헙링크" />
      </a>
      <a href={maillink}>
        <img src={mail} alt="메일" />
      </a>
      <a href={contact}>
        <img src={contact2} alt="연락처" />
      </a>
    </div>
  );
}

export default MemberLink;

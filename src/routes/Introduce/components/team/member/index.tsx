import { ReactElement } from 'react';
import MemberLink from './memberlink';
import S from './style.module.scss';

interface memberProps {
  Name: string;
  job: string;
  description: string;
  githublink: string;
  contact: string;
  maillink: string;
}

function Member({ Name, job, description, githublink, contact, maillink }: memberProps): ReactElement {
  return (
    <div className={S.profile}>
      <div className={S.text}>
        <div className={S.wrapper}>
          <div className={S.name}>{Name}</div>
          <div className={S.job}>{job}</div>
        </div>
        <div className={S.description}>{description}</div>
        <MemberLink githublink={githublink} contact={contact} maillink={maillink} />
      </div>
    </div>
  );
}

export default Member;

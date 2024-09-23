import { FormEvent, ReactElement } from 'react';
import S from './style.module.scss';
import toast from 'react-hot-toast';

interface MemberLinkProps {
  contact: string;
  maillink: string;
  githublink: string;
}

function MemberLink({ githublink, maillink, contact }: MemberLinkProps): ReactElement {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('메일 링크가 복사되었습니다.\n원하는 곳에 붙여넣기하여 주세요.');
      })
      .catch(() => {
        toast.error('다시 시도해 주세요.');
      });
  };

  const handleEmailLink = (e: FormEvent) => {
    e.preventDefault();
    copyToClipboard(maillink);
  };

  const handleContactLink = (e: FormEvent) => {
    e.preventDefault();

    if (contact === '') {
      toast.error('해당 멤버의 추가 연락처가 존재하지 않습니다.😭');
    } else {
      window.open(contact);
    }
  };

  return (
    <div className={S.link}>
      <a href={githublink} target="_blank" rel="noreferrer">
        <img src="/ImgAssets/github.svg" alt="깃허브 링크 이동 버튼" />
      </a>
      <a href={maillink} onClick={handleEmailLink}>
        <img src="/ImgAssets/mail.svg" alt="메일 주소 복사 버튼" />
      </a>
      <a href={contact} onClick={handleContactLink}>
        <img src="/ImgAssets/contact.svg" alt="연락처 및 개인 홈페이지 이동 버튼" />
      </a>
    </div>
  );
}

export default MemberLink;

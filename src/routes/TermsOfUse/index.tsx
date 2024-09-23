import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import React, { useEffect } from 'react';
import { useIsContentPage } from '@/stores/isContentPage';
import BackButton from './components/BackButton/BackButton';

export function Component() {
  useDocumentTitle('이용 약관 | JJ.com');

  const { enterContentPage } = useIsContentPage(({ enterContentPage }) => ({
    enterContentPage,
  }));

  useEffect(() => {
    enterContentPage();
  }, []);

  return (
    <main id="page" className={S.component}>
      <div>
        <BackButton />

        <h1>
          <img src="/Icon/TextLogo.svg" alt="졸전 닷컴" /> 이용약관
        </h1>
        <hr />

        <h2>제 1 조 (목적 및 범위)</h2>
        <p>
          본 약관은 졸전닷컴(이하 "회사")이 제공하는 모든 서비스의 이용에 대해 회사와 사용자 간의 권리와 의무를 규정하는
          것을 목적으로 합니다.
        </p>

        <h2>제 2 조 (회원가입 및 계정관리)</h2>
        <ol>
          <li>회원은 회사가 정한 절차에 따라 회원가입을 신청해야 합니다.</li>
          <li>
            회원의 개인정보는 관련 법령에 따라 보호되며, 회원은 자신의 정보를 항상 최신으로 유지할 책임이 있습니다.
          </li>
        </ol>

        <h2>제 3 조 (서비스 이용)</h2>
        <ol>
          <li>회사는 졸업전시 소개를 위한 다양한 정보를 제공합니다.</li>
          <li>사용자는 서비스를 통해 제공된 콘텐츠를 개인적 용도로만 이용할 수 있습니다.</li>
          <li>회사는 서비스 운영상 필요한 경우, 서비스의 일부 또는 전체를 변경하거나 중단할 수 있습니다.</li>
        </ol>

        <h2>제 4 조 (사용자 콘텐츠)</h2>
        <ol>
          <li>사용자는 졸전닷컴에 콘텐츠를 업로드할 수 있으며, 해당 콘텐츠에 대한 저작권은 사용자가 소유합니다.</li>
          <li>회사는 부적절한 콘텐츠에 대해 사전 통보 없이 삭제할 수 있습니다.</li>
        </ol>

        <h2>제 5 조 (지적 재산권)</h2>
        <ol>
          <li>회사가 제공하는 모든 콘텐츠와 서비스에 대한 저작권 및 지적 재산권은 회사에 귀속됩니다.</li>
          <li>사용자는 회사의 사전 승인 없이 이를 복제, 배포할 수 없습니다.</li>
        </ol>

        <h2>제 6 조 (이용 제한 및 정지)</h2>
        <ol>
          <li>회사는 부적절한 행위를 하는 회원에 대해 서비스 이용을 제한하거나 계정을 정지할 수 있습니다.</li>
          <li>회사는 이와 관련된 책임을 지지 않습니다.</li>
        </ol>

        <h2>제 7 조 (책임의 한계)</h2>
        <ol>
          <li>회사는 서비스 이용 중 발생하는 문제에 대해 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.</li>
          <li>회사는 사용자 간 또는 제3자 간에 발생한 분쟁에 대해 개입하지 않으며, 이에 따른 책임을 지지 않습니다.</li>
        </ol>

        <h2>제 8 조 (광고 및 제휴)</h2>
        <ol>
          <li>회사는 서비스 내 광고를 게재할 수 있으며, 사용자는 이에 동의하는 것으로 간주합니다.</li>
          <li>제휴사와의 계약에 따른 혜택 제공은 제휴사의 정책에 따릅니다.</li>
        </ol>

        <h2>제 9 조 (개인정보 보호)</h2>
        <p>회사는 사용자의 개인정보를 관련 법령에 따라 보호하며, 자세한 사항은 개인정보처리방침에 따릅니다.</p>

        <h2>제 10 조 (약관의 변경)</h2>
        <ol>
          <li>회사는 필요에 따라 본 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력이 발생합니다.</li>
          <li>사용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단할 수 있습니다.</li>
        </ol>

        <h2>제 11 조 (분쟁 해결)</h2>
        <ol>
          <li>본 약관과 관련된 분쟁은 대한민국 법령에 따라 해결합니다.</li>
          <li>관할 법원은 회사의 본사 소재지 관할 법원으로 합니다.</li>
        </ol>
      </div>{' '}
    </main>
  );
}

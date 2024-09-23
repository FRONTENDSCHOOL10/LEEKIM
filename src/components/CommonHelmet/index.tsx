import { Helmet } from 'react-helmet-async';

interface CommonHelmetProps {
  pageTitle: string;
  pageDescription: string;
  keywords?: string;
}

function CommonHelmet({
  pageTitle,
  pageDescription,
  keywords = '졸전, 졸업 전시회, 전시회, 전시 정보, 추천 전시, 진행 중인 전시, 전시 일정',
}: CommonHelmetProps) {
  return (
    <Helmet>
      <title>{pageTitle} | JJ.com</title>
      <meta property="og:title" content={`${pageTitle} | JJ.com`} />
      <meta name="twitter:title" content={`${pageTitle} | JJ.com`} />

      <meta name="description" content={pageDescription} />
      <meta property="og:description" content={pageDescription} />
      <meta property="twitter:description" content={pageDescription} />

      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:site:author" content="LEEKIM" />
      {/* <meta property="og:image" content="이미지" /> */}
      <meta property="og:url" content="https://jjcom.netlify.app/" />
      <link rel="canonical" href="https://jjcom.netlify.app/" />
    </Helmet>
  );
}
export default CommonHelmet;

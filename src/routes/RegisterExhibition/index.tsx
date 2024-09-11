import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import ImageUpload from './components/imagePreview';
import RequireInfo from './components/requiredinfo';
import SelectInfo from './components/selectinfo';

export function Component() {
  useDocumentTitle('전시 등록 | JJ.com');

  return (
    <main id="page" className={S.component}>
      <h2 className={S.title}>전시 등록</h2>
      <span className={S.subtitle}>모든 전시는 관리자의 검토 후 등록됩니다. 검토에는 3-5일이 소요됩니다.</span>
      <form className={S.infocontainer}>
        <div className={S.formrow}>
          <ImageUpload />
          <div className={S.requireinfo}>
            <h3>필수 정보 등록 *</h3>
            <RequireInfo />
          </div>
        </div>
        <SelectInfo />
      </form>
    </main>
  );
}

import { ReactElement } from 'react';
import S from './style.module.scss';

interface frameprops {
  step: string;
  description: string;
}

function DescriptionFrame({ step, description }: frameprops): ReactElement {
  return (
    <div className={S.wrapper}>
      <h3 className={S.title}>{step}</h3>
      <div className={S.textwrapper}>
        <p className={S.text}>{description}</p>
      </div>
    </div>
  );
}

export default DescriptionFrame;

import { memo, useEffect, useState } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getImageURL } from '@/utils';
import { ExhibitionData } from '@/types/ExhibitionData';
import { AppSpinner } from '@/components';

const button = {
  rest: { opacity: 1, scale: 1 },
  hover: { opacity: 1, scale: 1.1, y: -50 },
  pressed: { opacity: 1, scale: 0.95 },
};

const dbUrl = import.meta.env.VITE_DB_URL;

function MainPosterCard() {
  // ExhibitionData 타입 삽입해야함
  const [posterCardData, setPosterCardData] = useState<ExhibitionData[] | null>(null);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        const response = await axios.get(
          `${dbUrl}/api/collections/Exhibition/records?filter=(IsApprove=true%26%26IsHorizontal=false)&sort=@random&page=1&perPage=5`
        );
        setPosterCardData(response.data.items);
      } catch (err) {
        throw new Error('데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchExhibitionData();
  }, []);

  if (!posterCardData) return <AppSpinner />;

  return (
    <section className={S.component}>
      <ul className={S.posterCardWrapper}>
        {posterCardData.map((item, index) =>
          item ? (
            <li key={index} className={S.posterCardList}>
              <NavLink to={`/exhibition/detail/${item.id}`}>
                <motion.div variants={button} initial="rest" whileHover="hover" whileTap="pressed">
                  <img src={getImageURL(item)} alt="" className={S.posterCard} />
                </motion.div>
              </NavLink>
            </li>
          ) : null
        )}
      </ul>
      <div className={S.box}>
        <div className={S.imgFilter}></div>
        <div className={S.contentsWrapper}>
          <p className="sr-only">우리 학교 졸업 전시를 지금 졸전닷컴에 등록해 보세요!</p>
          <div className={S.textWrapper}>
            <span aria-hidden="true">우리 학교 졸업 전시를</span>
            <div className={S.secondLine}>
              <span aria-hidden="true">지금</span>
              <img src="/Icon/TextLogo.svg" aria-hidden="true" />
              <span aria-hidden="true">에 등록해 보세요!</span>
            </div>
          </div>
          <NavLink className={S.button} to={'/registerExhi'}>
            전시 등록 바로가기
          </NavLink>
          <span className={S.infoText}>모든 졸업 전시는 관리자의 승인을 거친 후 등록됩니다.</span>
        </div>
      </div>
    </section>
  );
}

export default memo(MainPosterCard);

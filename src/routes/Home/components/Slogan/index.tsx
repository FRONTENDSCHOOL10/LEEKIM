import { memo, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import S from './style.module.scss';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 0.5 + i * 0.68;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
  erase: (i) => {
    const delay = 0.5 + i * 0.1;
    return {
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay: 1.3 + i * 0.1, duration: 0.2 },
      },
    };
  },
};

function Slogan() {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const sequence = async () => {
      if (!isMounted) return;
      await controls.start('visible');
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5초 대기
      if (!isMounted) return;
      await controls.start('erase');
      sequence(); // 무한 반복
    };

    if (controls) {
      sequence();
    }

    return () => {
      isMounted = false;
    };
  }, [controls]);

  return (
    <section className={S.component}>
      <p className="sr-only">Connecting You to the World Of Graduation Shows</p>
      <div className={S.bigSlogan}>
        <div className={S.lineWrapper}>
          <div className={S.anker}>
            <span aria-hidden="true">Connecting</span>
            <motion.svg
              className={`${S.star} ${S.starA}`}
              width="30"
              // height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                repeat: Infinity,
                type: 'spring',
                stiffness: 260,
                damping: 20,
                repeatDelay: 5,
              }}
            >
              <path
                d="m37.117.846-5.32 19.523 11.357 16.748-19.523-5.32L6.883 43.153l5.32-19.523L.847 6.883l19.523 5.32L37.117.847Z"
                fill="#fff"
              />
            </motion.svg>
          </div>
          <div className={S.sloganImgWrapper}>
            <img className={S.sloganImg} src="/src/routes/Home/assets/bigSloganImg.png" aria-hidden="true" />
            <div className={S.sloganImgFilter}></div>
          </div>
          <div className={S.anker}>
            <span aria-hidden="true">You</span>
            <motion.svg
              className={`${S.star} ${S.starB}`}
              width="45"
              // height="67"
              viewBox="0 0 67 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: -360, scale: 1 }}
              transition={{ repeat: Infinity, duration: 1, repeatDelay: 7 }}
            >
              <path
                d="m35.47 21.513.337 1.81 1.335-1.267 11.824-11.22-7.017 14.712-.792 1.663 1.826-.24 16.16-2.128-14.324 7.778-1.619.879 1.619.879 14.324 7.778-16.16-2.127-1.826-.24.793 1.662 7.016 14.712-11.824-11.22-1.335-1.268-.336 1.811L32.5 61.514l-2.97-16.027-.337-1.81-1.335 1.267-11.824 11.22 7.017-14.712.792-1.663-1.826.24-16.16 2.128 14.324-7.778L21.8 33.5l-1.619-.879-14.324-7.778 16.16 2.127 1.826.24-.793-1.662-7.016-14.711 11.824 11.219 1.335 1.267.336-1.81L32.5 5.486l2.97 16.027Z"
                stroke="#fff"
                strokeWidth="2"
              />
            </motion.svg>
            <motion.svg
              className={`${S.star} ${S.starC}`}
              width="20"
              // height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="16.5"
                cy="16.5"
                r="15.5"
                stroke="#fff"
                strokeWidth="2"
                initial={{ strokeDasharray: 97.5, strokeDashoffset: 97.5 }}
                animate={{ strokeDashoffset: [97.5, 0, -97.5], rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.svg>
          </div>
        </div>
        <div className={S.lineWrapper}>
          <motion.svg
            width="15%"
            // height="265"
            viewBox="0 0 253 265"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360, scale: 1 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          >
            <path
              d="m126.5 0 15.64 84.367 62.242-59.062-36.937 77.447 85.07-11.197-75.404 40.945 75.404 40.945-85.07-11.197 36.937 77.447-62.242-59.062L126.5 265l-15.64-84.367-62.242 59.062 36.937-77.447-85.07 11.197L75.889 132.5.486 91.555l85.07 11.197-36.937-77.447 62.242 59.062L126.5 0Z"
              fill="#3A39FF"
            />
          </motion.svg>
          <span aria-hidden="true">to the World</span>
          <motion.svg
            width="25%"
            viewBox="0 0 457 162"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate={controls}
          >
            {[0, 1, 2].map((i) => (
              <motion.line
                key={i}
                x1={i === 0 ? '10' : i === 1 ? '376' : '446.711'}
                y1={i === 0 ? '81' : i === 1 ? '10' : '80.999'}
                x2={i === 0 ? '447' : i === 1 ? '446.711' : '376'}
                y2={i === 0 ? '81' : i === 1 ? '80.7107' : '151.71'}
                stroke="#3A39FF"
                strokeWidth="20"
                strokeLinecap="round"
                custom={i}
                variants={draw}
              />
            ))}
          </motion.svg>
        </div>
        <div className={S.lineWrapper}>
          <div className={S.anker}>
            <span aria-hidden="true">Of</span>
            <motion.svg
              className={`${S.star} ${S.starD}`}
              width="45"
              // height="63"
              viewBox="0 0 63 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                repeat: Infinity,
                type: 'spring',
                stiffness: 260,
                damping: 20,
                repeatDelay: 6.5,
              }}
            >
              <path
                d="m31.5 2.882 7.57 20.457.16.431.43.16L60.12 31.5 39.66 39.07l-.431.16-.16.43L31.5 60.12 23.93 39.66l-.16-.431-.43-.16L2.881 31.5l20.457-7.57.431-.16.16-.43L31.5 2.881Z"
                stroke="#fff"
                strokeWidth="2"
              />
            </motion.svg>
          </div>
          <motion.svg
            width="10%"
            // height="142"
            viewBox="0 0 198 142"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            whileHover={{ scale: 1.1 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 10,
            }}
            onHoverStart={() => {}}
            onHoverEnd={() => {}}
            whileTap={{ scale: 0.9 }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M94.598.553c4.456-1.27 8.267-.1 12.252.978 12.911 3.493 25.793 7.09 38.691 10.62 15.529 4.253 31.065 8.461 46.588 12.729 3.603.99 5.875 4.114 5.871 7.779-.006 3.747-2.285 6.809-6.12 7.872-8.619 2.39-17.279 4.652-25.895 7.05-1.526.424-2.003.326-1.662-1.31.529-2.533.269-5.073-.6-7.506-1.259-3.516-3.128-6.078-7.455-7.2-18.636-4.831-37.159-10.047-55.719-15.144-.93-.255-1.76-.369-2.739-.1-19.465 5.346-58.674 16.13-59.142 16.415 3.563 1.023 42.431 11.693 58.546 16.09 1.168.318 2.266.405 3.475.067 10.749-3 21.515-5.939 32.264-8.936 1.52-.422 2.365-.603 2.024 1.485-.72 4.395.362 8.462 3.272 11.982 1.106 1.337.52 1.671-.856 2.044-12.25 3.315-24.484 6.682-36.733 10.01-1.25.34-2.527.236-3.798-.113A96418.96 96418.96 0 0 0 6.408 40.599C2.878 39.637.477 37.03.06 33.665c-.423-3.418 1.378-6.662 4.566-8.426.73-.404 69.657-18.903 89.97-24.686Z"
              fill="#3A39FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M142.261 57.287c9.102 2.785 10.025 1.555 14.687-.069.089-.031.543-.047.58.322.056.552.667 21.028-.454 30.799-2.098 18.26-10.729 33.094-26.648 43.615-14.963 9.89-31.464 12.227-48.669 6.768-19.17-6.083-31.314-19.174-37.886-37.196-2.306-6.316-3.207-12.84-3.186-19.511.02-7.444.014-14.887-.076-22.328-.02-1.71.253-2.335 2.237-1.717a167.59 167.59 0 0 0 11.346 3.072c1.662.393 2.13 1.143 2.12 2.714-.047 7.36-.388 14.75.14 22.077 1.528 21.159 19.703 40.158 43.454 39.567 15.292-.381 26.771-7.606 34.865-19.771 4.839-7.268 7.116-15.303 7.005-23.966-.101-7.993-.027-15.986-.023-24.033.002-.165.341-.392.508-.343ZM157.526 43.9c-.029 4.241-3.605 7.884-7.792 7.94-4.285.056-8.088-3.913-7.973-8.32.109-4.185 3.84-7.82 7.979-7.77 4.335.052 7.813 3.695 7.786 8.15Z"
              fill="#3A39FF"
            />
          </motion.svg>
          <span aria-hidden="true">Graduation Shows</span>
        </div>
      </div>
      <div className={S.smallSlogan}>
        <p>졸전.COM에서 전국의 모든 졸업 전시회 정보를 찾아보세요.</p>
        <p>졸업 전시의 세계를 연결하다.</p>
      </div>
    </section>
  );
}

export default memo(Slogan);

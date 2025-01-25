'use client';

import Image from 'next/image';
import Link from 'next/link';
import useCenterTopNumberList from '@/hooks/useCenterTopNumberList';
import { RankingSubListContainerProps } from '@/_types/contents/contents';

import styles from './ImageSubList.module.css';

const ImageSubList: React.FC<RankingSubListContainerProps> = ({ rankings }) => {
  // useCenterTopNumberList 훅으로 rankings 배열 재구성

  const centerdRankings = useCenterTopNumberList(rankings);
  return (
    <>
      <div className={styles.list}>
        {centerdRankings.map((ranking) => (
          <Link
            key={ranking.id}
            href={`/details/${ranking.content_id}`}
            className={styles.cardLink}
          >
            <figure className={styles.rankingItem}>
              <Image
                src={ranking.content_img}
                alt={`${ranking.title}`}
                width={110}
                height={160}
              />
              <div className={styles.bottomContainer}>
                <figcaption>
                  <h3>{ranking.title}</h3>
                  <h4>{ranking.subTitle?.join(' . ')}</h4>
                </figcaption>
              </div>
              <div className={styles.textContainer}>
                <strong className={styles.topNumber}>
                  {ranking.ranking_num}
                </strong>
              </div>
            </figure>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ImageSubList;

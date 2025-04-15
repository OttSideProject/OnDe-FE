'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Ranking } from '@/shared/types/contents';
import { ageImage } from '@/shared/utils';

import styles from './ImageSubList.module.css';

const ImageSubList: React.FC<{ content: Ranking[] }> = ({ content }) => {
  // RankingSubListContainer에서 이미 빈 데이터 처리를 하므로 여기서는 단순히 데이터를 표시만 합니다.
  return (
    <div className={styles.list}>
      {content.map((rank, index) => (
        <Link
          href={`/contents/detail/${rank.contentId}`}
          key={`${rank.contentId}-${index}`}
          className={styles.cardLink}
        >
          <figure className={styles.rankingItem}>
            <img
              src={
                rank.contentImg && rank.contentImg !== 'NoData'
                  ? rank.contentImg
                  : `https://picsum.photos/375/375?random=${rank.contentId}`
              }
              alt={rank.title}
              width={110}
              height={160}
            />
            <figcaption>
              <h3>{rank.title}</h3>
              <h4>
                <span>
                  {rank.genres &&
                  Array.isArray(rank.genres) &&
                  rank.genres.length > 0 &&
                  !rank.genres.includes('NoData')
                    ? rank.genres.join(' · ')
                    : ''}
                </span>
                {rank.ageImage && rank.ageImage !== 'NoData' && (
                  <Image
                    src={ageImage(rank.age, 'shared')}
                    alt="Age restriction"
                    width={20}
                    height={20}
                  />
                )}
              </h4>
            </figcaption>
            <div className={styles.textContainer}>
              <strong className={styles.topNumber}>{rank.rank}</strong>
            </div>{' '}
          </figure>
        </Link>
      ))}
    </div>
  );
};

export default ImageSubList;

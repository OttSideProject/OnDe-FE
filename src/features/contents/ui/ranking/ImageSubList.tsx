'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Ranking } from '@/shared/types/contents';

import styles from './ImageSubList.module.css';

const ImageSubList: React.FC<{ content: Ranking[] }> = ({ content }) => {
  return (
    <div className={styles.list}>
      {content.map((rank, index) => (
        <div key={`${rank.contentId}-${index}`} className={styles.cardLink}>
          <figure className={styles.rankingItem}>
            <img
              src={`https://picsum.photos/375/375?random=${rank.contentId}`}
              alt={rank.title}
              width={110}
              height={160}
            />
            <figcaption>
              <h3>{rank.title}</h3>
              <h4>
                <span>{rank.genres.join(' · ')}</span>
                {rank.ageImage && (
                  <Image
                    src={rank.ageImage} // age는 이제 이미지 URL
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
        </div>
      ))}
    </div>
  );
};

export default ImageSubList;

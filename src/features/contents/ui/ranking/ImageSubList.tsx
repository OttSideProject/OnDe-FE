'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RankingSubListContainerProps } from '@/_types/contents';

import styles from './ImageSubList.module.css';

const ImageSubList: React.FC<RankingSubListContainerProps> = ({ rankings }) => {
  return (
    <>
      <div className={styles.list}>
        {rankings.map((ranking) => (
          <Link
            key={ranking.id}
            href={`/contents/detail/${ranking.content_id}`}
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
                  <h4>
                    <span>{ranking.subTitle?.join(' · ')} ·</span>
                    <Image
                      src={ranking.age} // age는 이제 이미지 URL
                      alt="Age restriction"
                      width={20}
                      height={20}
                    />
                  </h4>
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

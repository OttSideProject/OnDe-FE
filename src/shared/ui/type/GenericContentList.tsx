import React from 'react';
import Link from 'next/link'; // Added Link import from next/link
import Image from 'next/image';

import { ContentType } from '@/shared/types/contents';
import { ageImage } from '@/shared/utils';

type GenericContentListProps = {
  items: ContentType[];
};

import styles from './GenericContentList.module.css';

const GenericContentList: React.FC<GenericContentListProps> = ({ items }) => {
  return (
    <div>
      {items.length === 0 ? (
        <div className={styles.emptyMessage}>제공하는 콘텐츠가 없습니다.</div>
      ) : (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={`${item.contentId}-${index}`}>
              <Link
                href={`/contents/detail/${item.contentId}`}
                className={styles.cardLink}
              >
                <figure className={styles.contentItem}>
                  <Image
                    src={
                      item.contentImg && item.contentImg !== 'NoData'
                        ? item.contentImg
                        : `https://picsum.photos/375/375?random=${item.contentId}`
                    }
                    alt={item.title}
                    width={115}
                    height={167}
                  />
                  <figcaption>
                    <h3>{item.title}</h3>
                    <h4>
                      <span>
                        {item.genres &&
                        Array.isArray(item.genres) &&
                        item.genres.length > 0 &&
                        !item.genres.includes('NoData')
                          ? item.genres.join(' · ')
                          : ''}
                      </span>
                      {item.age && item.age !== 'NoData' && (
                        <img
                          src={ageImage(item.age, 'shared')}
                          alt="Age restriction"
                          width={20}
                          height={20}
                        />
                      )}
                    </h4>
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenericContentList;

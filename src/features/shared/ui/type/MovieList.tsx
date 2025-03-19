import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './MovieList.module.css';
import { ContentType } from '@/_types/contents';

const MovieList: React.FC<{ content: ContentType[] }> = ({ content }) => {

  return (
    <div>
      <ul className={styles.list}>
        {content.map((movie, index) => (
          <li key={`${movie.contentId}-${index}`}>
            <Link
              href={`/contents/movie/${movie.contentId}`}
              className={styles.cardLink}
            >
              <figure className={styles.contentItem}>
                <img
                  src={`https://picsum.photos/375/375?random=${movie.contentId}`}
                  alt={movie.title}
                  width={115}
                  height={167}
                />
                <figcaption>
                  <h3>{movie.title}</h3>
                  <h4>
                    <span>{movie.genres.join(' · ')}</span>
                    {movie.ageImage && (
                      <Image
                        src={movie.ageImage} // age는 이제 이미지 URL
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
    </div>
  );
};

export default MovieList;

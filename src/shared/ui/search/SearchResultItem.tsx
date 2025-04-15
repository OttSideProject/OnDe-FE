// SearchResultItem.tsx
import Image from 'next/image';
import { SearchContent } from '@/shared/types/contents';
import styles from './SearchResultItem.module.css';

type SearchResultItemProps = {
  result: SearchContent;
  onClick: () => void;
};

const SearchResultItem = ({ result, onClick }: SearchResultItemProps) => {
  return (
    <div role="button" className={styles.resultItem} onClick={onClick}>
      <figure>
        <Image
          src={
            result.contentImg && result.contentImg !== 'NoData'
              ? result.contentImg
              : `https://picsum.photos/240/360?random=${result.contentId}`
          }
          alt={result.title}
          width={87}
          height={128}
          className={styles.resultImage}
        />
      </figure>
      <figcaption className={styles.resultInfo}>
        <h4>{result.title}</h4>
        <div className={styles.metaInfo}>
          {result.category && <span>{result.category}</span>}
          {result.genres &&
            Array.isArray(result.genres) &&
            result.genres.length > 0 &&
            !result.genres.includes('NoData') && (
              <div className={styles.genreContainer}>
                {result.genres.map((genre, index) => (
                  <span key={index} className={styles.genreButton}>
                    {genre}
                  </span>
                ))}
              </div>
            )}
        </div>
      </figcaption>
    </div>
  );
};

export default SearchResultItem;

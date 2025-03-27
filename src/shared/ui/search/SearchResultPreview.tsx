'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchDetailData } from '@/entities/contents/main/api';
import { DetailData } from '@/shared/types/contents';
import { getKoreanContentType } from '@/shared/utils';
import { Loading } from '../loading';
import styles from './SearchResultPreview.module.css';

interface SearchResultPreviewProps {
  contentId: string;
  onClose: () => void;
}

const SearchResultPreview: React.FC<SearchResultPreviewProps> = ({
  contentId,
  onClose,
}) => {
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchDetailData(contentId);
        setDetailData(response.data);
      } catch (err) {
        console.error('상세 정보를 가져오는 중 오류 발생:', err);
        setError('콘텐츠 정보를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (contentId) {
      fetchData();
    }
  }, [contentId]);

  const handleViewDetail = () => {
    router.push(`/contents/detail/${contentId}`);
    onClose();
  };

  if (isLoading) {
    return (
      <div className={styles.previewContainer}>
        <Loading />
      </div>
    );
  }

  if (error || !detailData) {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.errorMessage}>
          {error || '정보를 찾을 수 없습니다.'}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.previewContainer}>
      <h3>콘텐츠</h3>
      <div
        role="button"
        className={styles.imageContainer}
        onClick={handleViewDetail}
      >
        <figure>
          <Image
            src={
              detailData.imageUrl || 'https://picsum.photos/240/360?random=1'
            }
            alt={detailData.title}
            width={87}
            height={128}
          />
        </figure>
        <figcaption className={styles.contentInfo}>
          <h4 className={styles.title}>{detailData.title}</h4>
          <div className={styles.metaInfo}>
            {detailData.released && (
              <span className={styles.year}>{detailData.released}</span>
            )}

            {detailData.runtime && (
              <>
                {' '}
                <span> · </span>
                <span className={styles.runtime}>{detailData.runtime}</span>
              </>
            )}
          </div>
          {detailData.ctype && (
            <span className={styles.type}>
              {getKoreanContentType(detailData.ctype)}
            </span>
          )}
        </figcaption>
      </div>
    </div>
  );
};

export default SearchResultPreview;

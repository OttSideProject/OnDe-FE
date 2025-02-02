import React from 'react';
import styles from './OTTButton.module.css';

type OTTButtonProps = {
  ott: string; // OTT 플랫폼 이름 (Netflix, Tving 등)
  isActive: boolean; // 활성화 상태
  onClick: (ott: string) => void; // 클릭 이벤트 핸들러
};

const OTTButton: React.FC<OTTButtonProps> = ({ ott, isActive, onClick }) => {
  return (
    <button
      className={`${styles.ottBtn} ${isActive ? `${styles.active}` : ''}`}
      onClick={() => onClick(ott)}
      aria-pressed={isActive} // 스크린 리더에 활성/비활성 상태 전달
      style={{
        backgroundImage: `url(/assets/images/ott_logos/${ott}-logo${
          isActive ? '-active' : ''
        }.svg)`,
        backgroundSize: 'auto 12px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* {ott} */}
    </button>
  );
};

export default OTTButton;

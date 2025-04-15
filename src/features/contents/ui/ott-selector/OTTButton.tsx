import React from 'react';
import styles from './OTTButton.module.css';

type OTTButtonProps = {
  ott: string; // OTT 플랫폼 이름 (Netflix, Tving 등)
  isActive: boolean; // 활성화 상태
  onClick: (ott: string) => void; // 클릭 이벤트 핸들러
};

const OTTButton: React.FC<OTTButtonProps> = ({ ott, isActive, onClick }) => {
  // 클릭 이벤트 핸들러 수정
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 기본 이벤트 동작 방지
    e.preventDefault();
    e.stopPropagation();
    
    // 디버깅 로그
    console.log('OTT Button clicked:', ott, 'isActive:', isActive);
    
    // 즉시 onClick 호출
    onClick(ott);
  };

  return (
    <button
      type="button" // 명시적으로 button 타입 지정
      className={`${styles.ottBtn} ${isActive ? `${styles.active}` : ''}`}
      onClick={handleClick}
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

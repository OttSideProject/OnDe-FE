import React  from 'react';
import OTTButton from './OTTButton';
import styles from './OTTSelector.module.css';

const otts = ['netflix', 'tving', 'wavve', 'watcha']; // 플랫폼 리스트

type OTTSelectorProps = {
  // 활성화 된 OTT 목록 (여러 개 선택 가능)
  activeOTTs: string[];
  // OTT 플랫폼 선택 시 호출되는 콜백 함수
  onSelectOTT: (ott: string) => void;
};

const OTTSelector: React.FC<OTTSelectorProps> = ({
  activeOTTs,
  onSelectOTT,
}) => {
  return (
    <div className={styles.container}>
      {otts.map((ott) => (
        <OTTButton
          key={ott} // 각 버튼에 고유 key 지정
          ott={ott}
          isActive={activeOTTs.includes(ott)} // 배열에 포함되어 있는지 확인
          onClick={()=> onSelectOTT(ott)} // 이벤트 핸들러를 상위에서 받아서 전달
        />
      ))}
    </div>
  );
};

export default OTTSelector;

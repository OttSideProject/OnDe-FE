import React, { useState } from 'react';
import OTTButton from './OTTButton';
import styles from './OTTSelector.module.css';

const otts = ['netflix', 'tving', 'wavve', 'watcha']; // 플랫폼 리스트

type OTTSelectorProps = {
  // 활성화 된 OTT
  activeOTT: string | null;
  // OTT 플랫폼 선택 시 호출되는 콜백 함수
  onSelectOTT: (ott: string) => void;
};

const OTTSelector: React.FC<OTTSelectorProps> = ({
  activeOTT,
  onSelectOTT,
}) => {
  return (
    <div className={styles.container}>
      {otts.map((ott) => (
        <OTTButton
          key={ott} // 각 버튼에 고유 key 지정
          ott={ott}
          isActive={activeOTT === ott} // 활성화 상태 전달
          onClick={()=> onSelectOTT(ott)} // 이벤트 핸들러를 상위에서 받아서 전달
        />
      ))}
    </div>
  );
};

export default OTTSelector;

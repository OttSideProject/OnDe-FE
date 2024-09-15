import { useState } from 'react';

import { ButtonProps } from '@/_types/contents/contents';

import styles from './Button.module.css';

export default function Button({
  variant = 'default',
  size = 'default',
  isActive = false,
  children,
  iconUrl,
  onClick,
}: ButtonProps) {
  const [active, setIsActive] = useState(() => isActive);

  const handleClick = () => {
    setIsActive((prevActive) => !prevActive);
    onClick?.(); /* Optional chaining을 사용해 안전하게 호출 */
  };

  /**
   * className 생성 로직
   *
   * - 기본 클래스 (`styles.btn`): 모든 버튼에 공통적으로 적용되는 기본 스타일.
   * - Variant 클래스 (`styles.btnPrimary`, `styles.btnSecondary`):
   *   - `variant` prop에 따라 'Primary' 또는 'Secondary' 스타일이 적용됩니다.
   *   - 예: `variant="primary"` -> `styles.btnPrimary`
   * - 문자열의 첫 번째 문자를 대문자로 변환하여 클래스 이름을 동적으로 생성합니다.
   *     예) `variant[0].toUpperCase() + variant.slice(1)` -> `"Primary"`
   * - Size 클래스 (`styles.btnSmall`, `styles.btnDefault`):
   *   - `size` prop에 따라 'Small' 또는 'Default' 스타일이 적용됩니다.
   *   - 예: `size="small"` -> `styles.btnSmall`
   * - Active 상태 클래스 (`styles.btnPrimaryActive`, `styles.btnSecondaryActive`):
   *   - 버튼이 활성화된 상태(`active`)일 때, 해당 variant에 맞는 활성화된 스타일이 적용됩니다.
   *   - 예: `active=true` and `variant="primary"` -> `styles.btnPrimaryActive`
   */
  const className = `
		${styles.btn} 
				${styles[`btn${variant[0].toUpperCase() + variant.slice(1)}`]} 
				${styles[`btn${size[0].toUpperCase() + size.slice(1)}`]}
				${
          active
            ? styles[`btn${variant[0].toUpperCase() + variant.slice(1)}Active`]
            : ''
        }
		`;

  return (
    <div className={styles.btnInner}>
      <button className={className} onClick={handleClick}>
        <span>{children}</span>
        {iconUrl && <img src={iconUrl} alt="icon" className={styles.icon} />}
      </button>
    </div>
  );
}

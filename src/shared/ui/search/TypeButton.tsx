// TypeButton.tsx
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/shared/lib/stores/modal';
import styles from './TypeButton.module.css';

type TypeButtonProps = {
  type: string;
  iconSrc: string;
  altText: string;
};

const TypeButton = ({ type, iconSrc, altText }: TypeButtonProps) => {
  const { closeModal } = useModalStore();
  const router = useRouter();

  const handleNavigate = () => {
    closeModal();
    router.push(`/contents/${type}`);
  };

  return (
    <button
      type="button"
      className={styles.typeButton}
      onClick={handleNavigate}
    >
      <span className={styles.typeTag}>
        <img src={iconSrc} alt={altText} />
      </span>
    </button>
  );
};

export default TypeButton;

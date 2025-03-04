type TitleDisplayProps = {
  userName?: string;
  recommendedTitle?: string;
};

const TitleDisplay: React.FC<TitleDisplayProps> = ({
  userName,
  recommendedTitle,
}) => {
  if (!userName && !recommendedTitle) return null;

  return (
    <>
      {userName && <span>{userName}</span>}
      {recommendedTitle && <span>{recommendedTitle}&nbsp;</span>}
    </>
  );
};

export default TitleDisplay;

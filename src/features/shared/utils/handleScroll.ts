type ScrollCallback = (isWithinThreshold: boolean) => void;

export const createScrollHandler = (
  threshold: number,
  callback: ScrollCallback
) => {
  return () => {
    const scrollPosition = window.scrollY;
    callback(scrollPosition < threshold);
  };
};

export const useScrollEffect = (
  threshold: number,
  callback: ScrollCallback,
  enabled: boolean = true
) => {
  if (!enabled) return;
  
  const handleScroll = createScrollHandler(threshold, callback);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}; 
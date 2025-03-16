import { useMemo } from 'react';
import { Ranking } from '@/_types/contents';

export const useCenterTopNumberList = (items: Ranking[]) => {
  const centerTopNumberList = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) {
      return [];
    }

    const swapped: Ranking[] = [];

    // 3개씩 순회하며, 3개가 꽉 찼을 경우 첫 번째와 두 번째 아이템을 스왑
    for (let i = 0; i < items.length; i += 3) {
      const chunk = items.slice(i, i + 3);
      if (chunk.length === 3) {
        [chunk[0], chunk[1]] = [chunk[1], chunk[0]];
      }
      swapped.push(...chunk);
    }

    return swapped;
  }, [items]);

  return centerTopNumberList;
};

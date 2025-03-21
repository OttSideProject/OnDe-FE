'use client';

import type { FilterGroup } from '@/shared/types/contents';
import { useFilterStore } from '@/entities/contents/filter';
import styles from './FilterChips.module.css';

type FilterChipsProps = {
  groups: FilterGroup[];
};

const FilterChips = ({ groups }: FilterChipsProps) => {
  const { selectedChips, selectedFilters, setSelectedFilters } =
    useFilterStore();
  const getFilterLabel = (groupId: string, itemId: string) => {
    const group = groups.find((g) => g.id === groupId);
    const item = group?.items.find((i) => i.id === itemId);
    return item?.label || '';
  };

  return (
    <div className={styles.container}>
      {selectedChips.map(({ groupId, itemId, label }) => (
        <div key={`${groupId}-${itemId}`}>
          <button
            onClick={() => {
              const updatedItems = selectedFilters[groupId].filter(
                (id: string) => id !== itemId,
              );
              setSelectedFilters(groupId, updatedItems);
            }}
            className={styles.chip}
          >
            <span>{label}</span>
            <img src="/assets/images/icons/delete-x.svg" alt="remove" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterChips;

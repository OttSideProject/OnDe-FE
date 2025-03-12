'use client';

import type { FilterGroup } from '@/_types/contents';

import styles from './FilterChips.module.css';

type FilterChipsProps = {
  selectedFilters: {
    groupId: string;
    itemId: string;
  }[];
  groups: FilterGroup[];
  onRemove: (groupId: string, itemId: string) => void;
};

const FilterChips = ({
  selectedFilters,
  groups,
  onRemove,
}: FilterChipsProps) => {
  const getFilterLabel = (groupId: string, itemId: string) => {
    const group = groups.find((g) => g.id === groupId);
    const item = group?.items.find((i) => i.id === itemId);
    return item?.label || '';
  };

  return (
    <div className={styles.container}>
      {selectedFilters.map(({ groupId, itemId }) => (
        <div key={`${groupId}-${itemId}`}>
          <button
            onClick={() => onRemove(groupId, itemId)}
            className={styles.chip}
          >
            <span>{getFilterLabel(groupId, itemId)}</span>
            <img src="/assets/images/icons/delete-x.svg" alt="remove" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterChips;

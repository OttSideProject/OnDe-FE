'use client';

import { useState } from 'react';
import type { FilterItem, FilterGroup } from '@/_types/contents';
import styles from './FilterAccordion.module.css';

export type FilterAccordionProps = {
  groups: FilterGroup[];
  onFilterChange?: (groupId: string, selectedItems: string[]) => void;
};

const FilterAccordion = ({
  groups = [],
  onFilterChange,
}: FilterAccordionProps) => {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleGroupClick = (groupId: string) => {
    setOpenGroupId(openGroupId === groupId ? null : groupId);
  };

  const handleItemClick = (groupId: string, itemId: string) => {
    const updatedItems = selectedFilters[groupId]?.includes(itemId)
      ? selectedFilters[groupId].filter((id) => id !== itemId)
      : [...(selectedFilters[groupId] || []), itemId];

    const newSelectedFilters = {
      ...selectedFilters,
      [groupId]: updatedItems,
    };

    setSelectedFilters(newSelectedFilters);
    onFilterChange?.(groupId, updatedItems);
  };

  const isItemSelected = (groupId: string, itemId: string) => {
    return selectedFilters[groupId]?.includes(itemId) || false;
  };

  return (
    <div className={styles.accordion}>
      {groups.map((group: FilterGroup) => (
        <div key={group.id} className={styles.group}>
          <div className={styles.groupHeader}>
            <span>{group.label}</span>
            <span
              className={`${styles.arrow} ${openGroupId === group.id ? styles.open : ''}`}
              onClick={() => handleGroupClick(group.id)}
            >
              <img src="/assets/images/icons/arrow-down-g.svg" alt="arrow" />
            </span>
          </div>
          {openGroupId === group.id && (
            <div className={styles.itemList}>
              {group.items.map((item: FilterItem) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.item} ${isItemSelected(group.id, item.id) ? styles.selected : ''}`}
                  onClick={() => handleItemClick(group.id, item.id)}
                >
                  <div className={styles.checkbox}>
                    {isItemSelected(group.id, item.id) && (
                      <img
                        src="/assets/images/icons/check-box-icon.svg"
                        alt="check-box-icon"
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterAccordion;

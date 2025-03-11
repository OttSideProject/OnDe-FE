'use client';

import { useState } from 'react';
import { Button } from '@/features/shared/ui/button-group';
import type { FilterItem, FilterGroup } from '@/_types/contents';
import styles from './FilterAccordion.module.css';

export type FilterAccordionProps = {
  groups: FilterGroup[];
  onFilterChange?: (groupId: string, selectedItems: string[]) => void;
  onApply?: () => void;
};

const FilterAccordion = ({
  groups = [],
  onFilterChange,
  onApply,
}: FilterAccordionProps) => {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

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
              className={`${styles.arrow} ${
                openGroupId === group.id ? styles.open : ''
              }`}
              onClick={() => handleGroupClick(group.id)}
            >
              ▼
            </span>
          </div>
          {openGroupId === group.id && (
            <div className={styles.itemList}>
              {group.items.map((item: FilterItem) => (
                <div
                  key={item.id}
                  className={`${styles.item} ${
                    isItemSelected(group.id, item.id) ? styles.selected : ''
                  }`}
                  onClick={() => handleItemClick(group.id, item.id)}
                >
                  <div className={styles.checkbox}>
                    {isItemSelected(group.id, item.id) && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3332 4L5.99984 11.3333L2.6665 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {onApply && (
        <div className={styles.btnContainer}>
          <Button variant="primary" onClick={onApply}>
            필터 적용하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterAccordion;

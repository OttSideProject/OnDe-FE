'use client';

import { useState } from 'react';
import type { FilterItem, FilterGroup } from '@/shared/types/contents';
import { useFilterStore } from '@/entities/contents/filter';
import styles from './FilterAccordion.module.css';

export type FilterAccordionProps = {
  groups: FilterGroup[];
};

const FilterAccordion = ({ groups = [] }: FilterAccordionProps) => {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const { selectedFilters, lastSelectedItem, setSelectedFilters } =
    useFilterStore();

  const handleGroupClick = (groupId: string) => {
    setOpenGroupId(openGroupId === groupId ? null : groupId);
  };

  const handleItemClick = (
    groupId: string,
    itemId: string,
    itemLabel: string,
  ) => {
    const updatedItems = selectedFilters[groupId]?.includes(itemId)
      ? selectedFilters[groupId].filter((id) => id !== itemId)
      : [...(selectedFilters[groupId] || []), itemId];

    setSelectedFilters(groupId, updatedItems);
  };

  const isItemSelected = (groupId: string, itemId: string) => {
    return selectedFilters[groupId]?.includes(itemId) || false;
  };

  const getSelectedSummary = (groupId: string) => {
    const items = selectedFilters[groupId] || [];
    if (items.length === 0)
      return <img src="/assets/images/icons/all-text.svg" alt="all" />;

    const group = groups.find((g) => g.id === groupId);
    if (!group)
      return <img src="/assets/images/icons/all-text.svg" alt="all" />;

    const firstItem = group.items.find((item) => item.id === items[0]);
    if (!firstItem)
      return <img src="/assets/images/icons/all-text.svg" alt="all" />;

    return items.length > 1
      ? `${firstItem.label} (+${items.length - 1})`
      : firstItem.label;
  };

  return (
    <div className={styles.accordion}>
      {groups.map((group: FilterGroup) => {
        const summary = getSelectedSummary(group.id);
        const hasSelectedItems = (selectedFilters[group.id] || []).length > 0;

        return (
          <div key={group.id} className={styles.group}>
            <div
              className={styles.groupHeader}
              onClick={() => handleGroupClick(group.id)}
            >
              {group.label === '장르' ? (
                <img
                  src="/assets/images/icons/genre-text-icon.svg"
                  alt="장르"
                />
              ) : group.label === '타입' ? (
                <img src="/assets/images/icons/type-text-icon.svg" alt="타입" />
              ) : (
                <span>{group.label}</span>
              )}
              <div className={styles.headerRight}>
                {openGroupId === group.id ? (
                  <span
                    className={
                      hasSelectedItems
                        ? styles.selectedItem
                        : styles.allSelected
                    }
                  >
                    {lastSelectedItem?.groupId === group.id ? (
                      lastSelectedItem.label
                    ) : (
                      <img src="/assets/images/icons/all-text.svg" alt="all" />
                    )}
                  </span>
                ) : (
                  <span
                    className={
                      hasSelectedItems
                        ? styles.selectedSummary
                        : styles.allSelected
                    }
                  >
                    {summary}
                  </span>
                )}
                <span
                  className={`${styles.arrow} ${
                    openGroupId === group.id ? styles.open : ''
                  }`}
                >
                  <img
                    src="/assets/images/icons/arrow-down-g.svg"
                    alt="arrow"
                  />
                </span>
              </div>
            </div>
            {openGroupId === group.id && (
              <div className={styles.itemList}>
                {group.items.map((item: FilterItem) => (
                  <div
                    key={item.id}
                    className={`${styles.item} ${
                      isItemSelected(group.id, item.id) ? styles.selected : ''
                    }`}
                    onClick={() =>
                      handleItemClick(group.id, item.id, item.label)
                    }
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
                    <div className={styles.label}>
                      <span>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterAccordion;

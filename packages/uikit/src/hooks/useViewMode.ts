import { ViewMode, ViewModeArea } from '@sundaeswap-toolkit/model';
import { useCallback } from 'react';
import { useUser } from './useUser';

export const useViewMode = (
  area: ViewModeArea
): {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
} => {
  const { updateUser, user } = useUser();

  const handleViewModeChange = useCallback(
    (newViewMode: ViewMode) => {
      updateUser(`${area}ViewMode`, newViewMode);
    },
    [area, updateUser]
  );

  return {
    viewMode: user[`${area}ViewMode`] ?? ViewMode.LIST,
    setViewMode: handleViewModeChange,
  };
};

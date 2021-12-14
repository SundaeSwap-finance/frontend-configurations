import { ACTIVE_USER_THEME } from '@sundaeswap-toolkit/model';
import { useCallback, useEffect } from 'react';
import { useUser } from '../../../uikit/src/hooks/useUser';

export const useTheme = (): {
  handleTheme: () => void;
  isDarkMode: boolean;
} => {
  const body = document.body;
  const { updateUser, user } = useUser();
  const oppositeTheme = user?.theme === ACTIVE_USER_THEME.DARK ? ACTIVE_USER_THEME.LIGHT : ACTIVE_USER_THEME.DARK;

  const handleTheme = useCallback(() => {
    if (body) {
      body.className = oppositeTheme;
      updateUser('theme', oppositeTheme);
    }
  }, [body, oppositeTheme, updateUser]);

  useEffect(() => {
    if (body && user.theme) {
      body.className = user.theme;
      updateUser('theme', user.theme);
    }
  }, [body, user.theme]);

  return {
    handleTheme,
    isDarkMode: user?.theme === ACTIVE_USER_THEME.DARK,
  };
};

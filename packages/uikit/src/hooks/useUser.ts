import { noop } from 'lodash';
import { DEFAULT_USER, User } from '@sundaeswap-toolkit/model';
import { useCallback } from 'react';
import useLocalStorageWithSubscription from './useLocalStorageWithSubscription';

const USER_LOCAL_STORAGE_KEY = 'sundae:simple-user';

export const useUser = (): {
  updateUser: (key: keyof User, value?: any) => void;
  user: User;
} => {
  try {
    const [user, setUser] = useLocalStorageWithSubscription(USER_LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
    const parsedUser = JSON.parse(user as string);

    const updateUser = useCallback(
      (key, value) => {
        const timestamp = Date.now();

        return setUser(JSON.stringify({ ...parsedUser, [key]: value, timestamp }));
      },
      [parsedUser, setUser]
    );

    return {
      updateUser,
      user: JSON.parse(user as string),
    };
  } catch (e) {
    console.warn('There was an error parsing the user data:', e);

    return {
      updateUser: noop,
      user: {},
    };
  }
};

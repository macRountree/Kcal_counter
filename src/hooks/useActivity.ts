import {useContext} from 'react';
import {ActivityContext} from '../context/activityContext';

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity HOOK must be used within an ActivityProvider');
  }
  return context;
};
//*NEED Provider in main.tsx to use this hook <ActivityProvider></ActivityProvider>

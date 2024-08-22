import {createContext, Dispatch, ReactNode, useReducer} from 'react';
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from '../reducers/activityReducer';

interface ActivityProviderPropps {
  children: ReactNode;
}
interface ActivityContextProps {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
}

//*context

export const ActivityContext = createContext<ActivityContextProps>(null!);

//*Provider

export const ActivityProvider = ({children}: ActivityProviderPropps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  return (
    <ActivityContext.Provider value={{state, dispatch}}>
      {' '}
      {children}{' '}
    </ActivityContext.Provider>
  );
};

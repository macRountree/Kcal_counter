import {Activity} from '../interfaces';

export type ActivityActions =
  | {type: 'save-activity'; payload: {newActivity: Activity}}
  | {
      type: 'set-activeId';
      payload: {id: Activity['id']};
    }
  | {type: 'remove-activity'; payload: {id: Activity['id']}}
  | {type: 'reset-activity'};

export interface ActivityState {
  activities: Activity[];
  activeId: Activity['id'];
}
//*Logic to get the activities from the local storage
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem('activities');
  return activities ? JSON.parse(activities) : []; //*parse the string to an array
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: '',
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === 'save-activity') {
    //*logic to update the state
    // console.log('from save-activity'); //*Action takes object with type and payload at Form.tsx
    //*Always return a new state

    let updatedActitivies: Activity[] = [];
    if (state.activeId) {
      updatedActitivies = state.activities.map(activity =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActitivies = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state, //*reference to the previous state
      activities: updatedActitivies,
      activeId: '',
    };
  }

  if (action.type === 'set-activeId') {
    return {...state, activeId: action.payload.id};
  }
  if (action.type === 'remove-activity') {
    const removeActivity = state.activities.filter(
      removeActv => removeActv.id !== action.payload.id
    );
    return {
      ...state,
      activities: removeActivity,
    };
  }

  if (action.type === 'reset-activity') {
    return {
      activities: [], //*restart the activities
      activeId: '', //*restart the id
    };
  }

  return state;
};

import {useMemo} from 'react';
import {Activity} from '../interfaces';
import {CalorieDisplay} from './CalorieDisplay';

interface CalorieTrackerProps {
  activities: Activity[];
}

export const CalorieTracker = ({activities}: CalorieTrackerProps) => {
  //*Calculate the total calories

  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const totalCalories = useMemo(
    () => caloriesBurned - caloriesConsumed,
    [caloriesConsumed, caloriesBurned]
  );
  return (
    <>
      <h2 className=" text-4xl font-black text-center text-indigo-500">
        {' '}
        Calories Summary
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
        <CalorieDisplay calories={caloriesConsumed} text="Consumed" />
        <CalorieDisplay calories={caloriesBurned} text="Burned" />
        <CalorieDisplay calories={totalCalories} text="Balance" />
      </div>
    </>
  );
};

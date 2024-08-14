import {Dispatch, useMemo} from 'react';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {categories} from '../data/categories';
import {Activity} from '../interfaces';
import {ActivityActions} from '../reducers/activityReducer';

interface ActivityListProps {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
}

export const ActivityList = ({activities, dispatch}: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity['category']) =>
      categories.map(cat => (cat.id === category ? cat.name : '')),
    []
  );
  return (
    <>
      <h2 className="text-4xl font-bold text-indigo-500 py-10 ">
        {' '}
        Food & Activities
      </h2>

      {activities.length === 0 ? (
        <p className="overflow-auto text-center bg-red-500 mx-5 rounded-md text-white font-bold ">
          {' '}
          Add new foods and activities to calculate your daily calories.{' '}
        </p>
      ) : (
        <div
          className={`${
            activities.length >= 3 ? 'max-h-80 overflow-y-scroll' : 'mx-8'
          }`}
        >
          {activities.map((activity, index) => (
            <ul
              key={activity.id}
              className={`  mx-8  text-left  ${
                index > 3 ? 'max-h-80 overflow-y-scroll' : ''
              }`}
            >
              <li
                className={`flex justify-between  items-center  relative  border-b-2 last-of-type:border-none `}
              >
                <div className="py-3">
                  <p
                    className={` absolute  -left-2 px-10 py-2 uppercase text-white  font-bold ${
                      activity.category === 2
                        ? 'bg-orange-500'
                        : 'bg-indigo-500'
                    } `}
                  >
                    {categoryName(+activity.category)}{' '}
                  </p>
                  <p
                    className={`pt-10 mx-5 text-lg font-bold ${
                      activity.category === 2
                        ? 'text-orange-500'
                        : 'text-indigo-500'
                    } `}
                  >
                    {activity.name}{' '}
                  </p>
                  <p className="font-black mx-5 text-2xl  text-indigo-900">
                    {activity.calories} <span>Cal </span>
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'set-activeId',
                        payload: {id: activity.id},
                      })
                    }
                    className="  px-5 py-2 rounded-full text-gray-800 hover:text-lime-600 hover:scale-110 hover:shadow-sm hover:shadow-indigo-400 transition-transform duration-300 font-bold uppercase mx-3"
                  >
                    <PencilSquareIcon className="h-8 w-8  " />
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'remove-activity',
                        payload: {id: activity.id},
                      })
                    }
                    className="  px-5 py-2 text-gray-800 hover:text-red-600 rounded-full hover:scale-110 hover:shadow-sm hover:shadow-indigo-400 transition-transform duration-300 font-bold uppercase mx-3"
                  >
                    <TrashIcon className="h-8 w-8 " />
                  </button>
                </div>
              </li>
            </ul>
          ))}
        </div>
      )}
    </>
  );
};

//*Dependencies
import {useState, ChangeEvent, FormEvent, Dispatch, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid'; //*  recommended install types for uuid

//*files
import categories from '../data/categories';
import type {Activity} from '../interfaces';
import {ActivityActions, ActivityState} from '../reducers/activityReducer';

interface FormProps {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
}
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0,
};
export const Form = ({dispatch, state}: FormProps) => {
  //* name and calories depends on the category
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        stateActivity => stateActivity.id === state.activeId
      )[0]; //*[0] to get
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //* check if the input is a number field
    const isNumberField = ['category', 'calories'].includes(e.target.id);
    // console.log(isNumberField);
    setActivity({
      ...activity, //* spread operator to keep the previous values of state
      [e.target.id]: isNumberField ? +e.target.value : e.target.value, //*then update the value of the target input in real time
    });
  };

  //*Disable save button if the name or calories is empty
  const isValidActivity = () => {
    const {name, calories} = activity;
    // console.log(name.trim() !== '');
    return name.trim() !== '' && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: 'save-activity', payload: {newActivity: activity}});

    setActivity({...initialState, id: uuidv4()});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-10 rounded-lg "
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Category:{' '}
        </label>
        <select
          name=""
          value={activity.category}
          id="category"
          className=" border border-indigo-700 p-2 rounded-lg w-full bg-indigo-100 "
          onChange={handleOnChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {' '}
              {category.name}{' '}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 ">
        <label htmlFor="name" className="font-bold">
          Activity:{' '}
        </label>
        <input
          type="text"
          id="name"
          placeholder='e.g. "Running","Cycling","Burger","Pizza" ,"Salad"'
          className="bg-indigo-100 border border-indigo-500 rounded-lg p-2 w-full"
          value={activity.name}
          onChange={handleOnChange}
        />
      </div>
      <div className="grid grid-cols-1 ">
        <label htmlFor="calories" className="font-bold">
          Calories:{' '}
        </label>
        <input
          type="number"
          min={0}
          id="calories"
          placeholder='e.g. "100","200","300"'
          className="bg-indigo-100 border border-indigo-500 rounded-lg p-2 w-full"
          value={activity.calories}
          onChange={handleOnChange}
        />
      </div>
      <input
        type="submit"
        className="bg-indigo-400 cursor-pointer w-full p-2 uppercase rounded-lg text-white font-bold  disabled:opacity-50 "
        value={activity.category === 1 ? 'Add Food' : 'Add Exercise'}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

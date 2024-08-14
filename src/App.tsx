import {useEffect, useReducer} from 'react';
import {Form} from './components/Form';
import {initialState, activityReducer} from './reducers/activityReducer';
import {ActivityList} from './components/ActivityList';
import {CalorieTracker} from './components/CalorieTracker';
import {SocialMedia} from './components/SocialMedia';
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);
  return (
    <>
      <header className="bg-indigo-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold uppercase text-white">
            kcal tracker
          </h1>
          <button
            className="px-5 py-3 bg-indigo-950 rounded-lg hover:opacity-70 text-white"
            onClick={() => dispatch({type: 'reset-activity'})}
          >
            Clear Counter
          </button>
        </div>
      </header>

      <section className="  grid md:grid-cols-2 ">
        <div className="py-10 px-5 w-full  mx-auto bg-indigo-400  ">
          <Form state={state} dispatch={dispatch} />
        </div>
        <div className="  w-full mx-auto text-center bg-indigo-200">
          <ActivityList dispatch={dispatch} activities={state.activities} />
        </div>
      </section>
      <footer className="bg-white space-y-5 mx-44  ">
        <div className="text-center  ">
          <CalorieTracker activities={state.activities} />
        </div>
        <SocialMedia />
      </footer>
    </>
  );
}

export default App;

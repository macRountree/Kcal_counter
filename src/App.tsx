import {useEffect} from 'react';
import {Form} from './components/Form';
// import {initialState, activityReducer} from './reducers/activityReducer';
import {ActivityList} from './components/ActivityList';
import {CalorieTracker} from './components/CalorieTracker';
import {SocialMedia} from './components/SocialMedia';
import {useActivity} from './hooks/useActivity';
function App() {
  // const [state, dispatch] = useReducer(activityReducer, initialState); //*useReducer hook instead of useState
  const {state, dispatch} = useActivity();

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
        <div className="py-10 px-5 w-full  mx-auto bg-indigo-200  ">
          <Form />
        </div>
        <div className="  w-full mx-auto text-center bg-indigo-200">
          <ActivityList />
        </div>
      </section>
      <footer className="bg-white space-y-5 mx-44 my-10 ">
        <div className="text-center  ">
          <CalorieTracker />
        </div>
        <div>
          <SocialMedia />
        </div>
      </footer>
    </>
  );
}

export default App;

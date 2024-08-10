import {Form} from './components/Form';

function App() {
  return (
    <>
      <header className="bg-indigo-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold uppercase text-white">
            kcal tracker
          </h1>
          <button className="px-5 py-3 bg-indigo-950 rounded-lg hover:opacity-70 text-white">
            Clear Counter
          </button>
        </div>
      </header>

      <section className="  grid grid-cols-2 ">
        <div className="py-10 px-5  w-full mx-auto bg-indigo-400  ">
          <Form />
        </div>
        <div className=" w-full mx-auto text-center bg-indigo-200">
          <h2 className="text-2xl font-bold py-5">Calories</h2>
        </div>
      </section>
    </>
  );
}

export default App;

import {useReducer, useEffect, useMemo} from 'react';
import Form from './components/Form';
import { activityReducer, initialState } from './reducers/activityReducer';
import ActivityList from './components/ActivityList';
import CalorieTracker from './components/CalorieTracker';

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities]);
  const canRestartApp = () => useMemo(()=> state.activities.length > 0, [state.activities]);
  console.log(canRestartApp());
  return (
    <>
        <header className="bg-lime-600 py-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <h1 className="text-center text-lg font-bold text-white uppercase">
                  Calorie tracker
                </h1>
                <button 
                  className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm flex items-center gap-2 disabled:opacity-10 disabled:cursor-not-allowed'
                  onClick={()=> dispatch({type: 'restart-app'})}
                  disabled={!canRestartApp()}
                  >
                  Reiniciar app
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
            </div>
        </header>
        <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
              <Form 
                dispatch={dispatch}
                state={state}
              />  
          </div>
        </section>

        <section className='bg-gray-800 p-10'>
          <div className='max-w-4xl mx-auto'>
            <CalorieTracker 
              activities={state.activities}
            />
          </div>
        </section>


        <section className='p-10 mx-auto max-w-4xl'>
          <ActivityList
            activities={state.activities}
            dispatch={dispatch}
          />
        </section>
    </>
  )
}

export default App

import { useState } from "react";
import {v4 as uuidv4} from 'uuid'
import type { ChangeEvent, Dispatch, FormEvent } from "react";
import type { Activity } from "../types";
import categories from "../data/categories";
import type { ActivityActions } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
}
const initialState : Activity={
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
  };
export default function Form({dispatch}: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);
  // podemos utilizar | para indicar que el parametro event puede ser de varios tipos
  const handleChange = (event: ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLInputElement>) =>{
    // esta linea es solo para verificar si el campo es numerico
    const isNumberField = ['category', 'calories'].includes(event.target.id);
    console.log(isNumberField, event.target.id);

    // al utilizar el ...activity estamos copiando el estado actual del objeto activity
    setActivity({
      ...activity,
      // [event.target.id] es una forma dinamica de actualizar la propiedad del objeto activity
      [event.target.id]: isNumberField ? +event.target.value : event.target.value
      // con el + delante de event.target.value convertimos el string a numero
    });
  }
  const isValidActivity = ()=>{
      const {name, calories}=activity;
      // console.log(name.trim()!=='' && calories>0);
      return name.trim() !== '' && calories > 0;
  }

  const handleSumbit = (e : FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      console.log('Actividad guardada', activity);
      dispatch({
        type: 'save-activity',
        payload:{
          newActivity: activity
        }
      })
      setActivity({
        ...initialState,
        id: uuidv4()
      });
  }
  return (
    <>
      <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSumbit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">Categoria:</label>
          <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"  
          id="category"
          value={activity.category}
          onChange={handleChange}
          >
             {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
          </select>
         
        </div>
            <div className="flex flex-row">
                <div className="flex-grow  mr-5">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                  <input type="text" id="name"
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Ej. Comida, jugo de naranja, ejercicio, pesas, bicicleta"
                    value={activity.name}
                    onChange={handleChange}

                  />
            </div>

            <div className="flex-grow">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input 
                type="number" id="calories" 
                className="border border-slate-300 p-2 rounded-lg w-full"
                placeholder="Calorias, ej. 202 o 300"
                value={activity.calories ? activity.calories : ''}
                onChange={handleChange}
                />
            </div>
          </div>
          <input 
          type="submit" 
          className="bg-gray-800 hover:bg-gray-900 w-full font-bold text-white p-2 uppercase cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
          value= {activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
          disabled={!isValidActivity()}
          />

      </form>
    </>
  )
}

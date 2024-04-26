import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

export default function Config({ config, setLoading }) {
    
    const { data, setData, post } = useForm(config);


    function submit(e) {
        e.preventDefault(); 

        //setLoading(true)
        post(route('config.update'), {
            onSuccess: () => {
                //setLoading(false)
            },
            onError: (e) => {
                //setLoading(false)
                console.log(e.response.data)
            }

        });
    }

    return (

        <form onSubmit={submit} className="flex flex-col gap-4 text-gray-700 px-2 p-3">
        <div className="flex gap-2 items-end">
          <span className="text-lg font-semibold">Rango de Habilidades:</span>
          <div className="flex flex-col w-20">
            <label htmlFor="range_level_min" className="text-xs">
              Mínimo
            </label>
            <input
              type="number"
              name="range_level_min"
              id="range_level_min"
              className="h-7 w-full rounded-md border border-gray-300 px-2 outline-none"
              value={data.range_level_min}
              placeholder="Mín."
              onChange={(e) => setData("range_level_min", e.target.value)}
            />
          </div>
          <span>hasta</span>
          <div className="flex flex-col w-20">
            <label htmlFor="range_level_max" className="text-xs">
              Máximo
            </label>
            <input
              type="number"
              name="range_level_max"
              id="range_level_max"
              className="h-7 w-full rounded-md border border-gray-300 px-2 outline-none"
              value={data.range_level_max}
              placeholder="Máx."
              onChange={(e) => setData("range_level_max", e.target.value)}
            />
          </div>
        </div>
      
        <div className="flex gap-2 items-center">
          <span className="text-lg font-semibold">Ponderación cola de trabajo:</span>
          <div className="flex flex-col w-20">
            <input
              type="number"
              name="work_queue"
              id="work_queue"
              className="h-7 w-full rounded-md border border-gray-300 px-2 outline-none"
              value={data.work_queue}
              placeholder="Ponderación"
              onChange={(e) => setData("work_queue", e.target.value)}
            />
          </div>
        </div>
      
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300"
          >
            Guardar
          </button>
        </div>
      </form>
      

    )
}

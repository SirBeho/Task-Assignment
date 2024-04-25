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

        <form onSubmit={submit} className="flex flex-col gap-4 text-textgray px-2 p-3">

            <div className='flex gap-2 items-end'>

                <span className='text-black text-lg font-semibold'>Rango de Habilidades: </span>
                <div className="flex flex-col w-20 ">
                    <label htmlFor="range_level_min" className="text-xs">
                        Minimo
                    </label>
                    <input type="number" name="range_level_min" id="range_level_min" className="h-7 w-full rounded-[4px] outline-none px-2"
                        value={data.range_level_min} placeholder='Min.'
                        onChange={(e) => setData('range_level_min', e.target.value)}
                    />
                </div>
                <span className='text-black '>hasta</span>
                <div className="flex flex-col w-20 ">
                <label htmlFor="range_level_max" className="text-xs">
                        Maximo
                    </label>
                    <input type="number" name="range_level_max" id="range_level_max" className="h-6 w-full rounded-[4px]  outline-none px-2"
                        value={data.range_level_max} placeholder='Máx.'
                        onChange={(e) => setData('range_level_max', e.target.value)}
                    />
                </div>

            </div>

            <label className='flex gap-2 items-end'>

                <span className='text-black text-lg font-semibold'>Ponderacion cola de trabajo:</span>
                <div className="flex flex-col w-20 ">
                   
                    <input type="number" name="work_queue" id="work_queue" className="h-7 w-full rounded-[4px] outline-none px-2"
                        value={data.work_queue} placeholder='Min.'
                        onChange={(e) => setData('work_queue', e.target.value)}
                    />
                </div>
                

            </label>

            <div className='flex justify-end'>
                <button type='submit' className="border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5">
                    Guardar
                </button>
            </div>

        </form>


    )
}

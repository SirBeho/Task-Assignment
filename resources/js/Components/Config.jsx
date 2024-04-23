import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

export default function Config({ config, setLoading }) {
    
    const { data, setData, post } = useForm({
        RNC: config.RNC || '',
        config: config.config || '',
        direccion: config.direccion || '',
        telefono: config.telefono || '',
        telefono2: config.telefono2 || '',
    });

    function submit(e) {
        e.preventDefault(); 
         
        setLoading(true)
        post(route('config.update', 1), {
            onSuccess: () => {
                setLoading(false)
            }
        });
    }

    return (

        <form onSubmit={submit} className="flex flex-col gap-4 text-textgray px-2 p-3">

            <div className='flex gap-8'>

                <div className="flex flex-col w-3/5">
                    <label htmlFor="name" className="text-xs">
                        name de la config
                    </label>
                    <input type="text" name="config" id="config" className="h-9 rounded-md w-full outline-none"
                        value={data.config}
                        onChange={(e) => setData('config', e.target.value)}
                    />
                </div>

                <div className="flex flex-col w-2/5">
                    <label htmlFor="telefono" className="text-xs">
                        RNC
                    </label>
                    <input type="tel" name="telefono" id="telefono" className="h-9 rounded-md full outline-none px-2"
                        value={data.RNC}
                        onChange={(e) => setData('RNC', e.target.value)}
                    />
                </div>

            </div>

            <div className='flex gap-8'>

                <div className="flex flex-col w-full">
                    <label htmlFor="direccion" className="text-xs">
                        Dirección
                    </label>
                    <input type="text" name="direccion" id="direccion" className="h-9 rounded-md w-full outline-none"
                        value={data.direccion}
                        onChange={(e) => setData('direccion', e.target.value)}
                    />
                </div>

            </div>

            <div className='flex gap-8'>

                <div className="flex flex-col w-1/2">
                    <label htmlFor="telefono" className="text-xs">
                        Teléfono
                    </label>
                    <input type="tel" name="telefono" id="telefono" className="h-9 rounded-md w-full outline-none"
                        value={data.telefono}
                        onChange={(e) => setData('telefono', e.target.value)}
                    />
                </div>

                <div className="flex flex-col w-1/2">
                    <label htmlFor="telefono" className="text-xs">
                        Teléfono
                    </label>
                    <input type="tel" name="telefono2" id="telefono2" className="h-9 rounded-md full outline-none px-2"
                        value={data.telefono2}
                        onChange={(e) => setData('telefono2', e.target.value)}
                    />
                </div>

            </div>

            <div className='flex justify-end'>
                <button type='submit' className="border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5">
                    Guardar
                </button>
            </div>

        </form>


    )
}

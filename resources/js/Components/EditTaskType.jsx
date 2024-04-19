import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useForm } from "@inertiajs/react";


export function EditTaskType({ hideModal, show, msj, TaskTypeData, setLoading }) {
    const [mensaje, setMensaje] = useState(msj);

    useEffect(() => {
        setMensaje(msj)
       
    }, [msj])
    
    const categoryTask = [
        { id: 1, category: 'Servicios' },
        { id: 2, category: 'Certificaciones' },
        { id: 3, category: 'Estados Financieros' },
        { id: 4, category: 'Reportes Generales' }
    ]

    const { data, setData, post, reset } = useForm({
        id: TaskTypeData?.id,
        name: TaskTypeData?.name,
        tipo: TaskTypeData?.tipo,
        status: TaskTypeData?.status
    });

    function submit(e) {
        e.preventDefault();
        hideModal()
        setLoading(true);

        post(route('TaskType.update', TaskTypeData.id), {
            onSuccess: () => {
                reset()
                setLoading(false);
            }
        });

    }


    return (

        <Modal show={show} maxWidth='md'>
            <h1 className='w-100% py-4 text-lg text-center font-bold'>Editar Tipo de Task</h1>'

            <form className="flex flex-col gap-4 text-textgray">

                <div className='flex gap-8'>
                    <div className="flex flex-col w-full">
                        <label htmlFor="name" className="text-xs">
                            name de la Task
                        </label>
                        <input type="text" name="name" id="name" required className="h-9 rounded-md w-full outline-none"
                            value={data.name}
                            placeholder='Diseño Web'
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex gap-8'>

                    <div className="flex flex-col w-3/5">
                        <label htmlFor="tipo" className="text-xs">
                            Categoria de la Task
                        </label>

                        <select name="tipo" id="tipo" className="w-full py-1 px-2 bg-white rounded-md outline-none"
                            required
                            defaultValue={data.tipo}
                            onChange={(e) => setData('tipo', e.target.value)}
                        >

                            <option value="">
                                Selecionar Categoria
                            </option>
                            {categoryTask.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>

                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col w-2/5">
                        <label htmlFor="tipo" className="text-xs">
                            Select Status
                        </label>

                        <select name="status" id="status" className="w-full py-1 px-2 bg-white rounded-md outline-none"
                            defaultValue={data.status}
                            required
                            onChange={(e) => setData('status', e.target.value)}
                        >

                            <option value="">
                                Status
                            </option>

                            <option value={1}>
                                Activo
                            </option>
                            <option value={0}>
                                Inactivo
                            </option>

                        </select>
                    </div>
                </div>
                {mensaje?.error && <span className='text-red-500 text-xs italic'>{mensaje?.error[0]}</span>}


            </form>
            <div className='flex justify-end'>
                <button type='button' className="border py-1 w-32 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-4 mt-5"
                    onClick={() => { hideModal(); reset(); }}
                >
                    Cancelar
                </button>

                <button onClick={submit}
                    className="border py-1 w-32 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end  mt-5">
                    Guardar
                </button>
            </div>

        </Modal>
    )
}

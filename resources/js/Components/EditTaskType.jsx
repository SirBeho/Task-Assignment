import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import TransferList from "./transferlist";

export function EditTaskType({
    hideModal,
    show,
    msj,
    TaskTypeData,
    setLoading,
    skills,
}) { 
    const [mensaje, setMensaje] = useState(msj);

    useEffect(() => {
        setMensaje(msj);
    }, [msj]);

    const { data, setData, post, reset } = useForm(TaskTypeData);

    function submit(e) {

        e.preventDefault();
        hideModal();
        setLoading(true);

        post(route("TaskType.update", data.id), {
            onSuccess: () => {
                reset();
                setLoading(false);
            },
        });
    }

    return (
        <Modal show={show}>
            <h1 className="w-full  text-lg text-center font-bold">
                Editar tarea
            </h1>
            <form
                onSubmit={submit}
                className="flex flex-col gap-4 text-textgray"
            >
                <div className="flex flex-col w-full">
                    <label htmlFor="name" className="text-xs">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="h-9 rounded-md w-full outline-none"
                        value={data.type_name}
                        placeholder="Escriba el nombre de la tarea..."
                        onChange={(e) => setData("type_name", e.target.value)}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="name" className="text-xs">
                        Descripcion
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="h-20 rounded-md w-full outline-none"
                        value={data.description}
                        rows={10}
                        placeholder="Describa este servicio..."
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>
                </div>

                <div className="flex gap-2">
                    <div className="flex flex-col w-full">
                        <label htmlFor="name" className="text-xs">
                            Tiempo Estimado (Dias)
                        </label>
                        <input
                            type="number"
                            name="estimated_time"
                            id="estimated_time"
                            required
                            className="h-9 rounded-md w-full outline-none"
                            value={data.estimated_time}
                            placeholder="Diseño Web"
                            onChange={(e) => setData("estimated_time", parseInt(e.target.value))}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="tipo" className="text-xs">
                            Select Status
                        </label>

                        <select
                            name="status"
                            id="status"
                            className="w-full py-1 px-2 bg-white rounded-md outline-none"
                            defaultValue={data.status}
                            required
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="">Status</option>

                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                        </select>
                    </div>
                </div>

                <TransferList
                    selectedSkills={data?.requisitos}
                    setSelectedSkills={(skills) =>
                        setData("requisitos", skills)
                    }
                    skills={skills}
                ></TransferList>

                {mensaje?.error && (
                    <span className="text-red-500 text-xs italic">
                        {mensaje?.error[0]}
                    </span>
                )}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="border py-1 w-32 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-4 mt-5"
                        onClick={() => {
                            hideModal();
                            reset();
                        }}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="border py-1 w-32 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end  mt-5"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
}

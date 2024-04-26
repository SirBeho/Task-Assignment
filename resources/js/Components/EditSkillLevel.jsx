import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import TransferList from "./transferlist";

export function EditSkillLevel({
    hideModal,
    show,
    msj,
    TaskTypeData,
    setLoading,
    skills,
    config,
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

        post(route("SkillLevel.update", data.id), {
            onSuccess: () => {
                reset();
                setLoading(false);
            },
        });
    }

    return (
        <Modal show={show}>
            <h1 className="w-full  text-lg text-center font-bold">
                Editar Nivel
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
                        value={data.name}
                        placeholder="Escriba el nombre de nivel..."
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>

                <div className="flex gap-3">
                <div className="flex flex-col w-full">
                    <label htmlFor="name" className="text-xs">
                        Valor Minimo
                    </label>
                    <input
                        type="number"
                        name="min"
                        id="min"
                        required
                        className="h-9 rounded-md w-full outline-none"
                        value={data.min}
                        placeholder="Valor minimo..."
                        onChange={(e) => setData("min", e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="name" className="text-xs">
                    Valor Maximo
                    </label>
                    <input
                        type="number"
                        name="max"
                        id="max"
                        required
                        className="h-9 rounded-md w-full outline-none"
                        value={data.max}
                        placeholder="Valor maximo..."
                        onChange={(e) => setData("max", e.target.value)}
                    />
                </div>

                </div>

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

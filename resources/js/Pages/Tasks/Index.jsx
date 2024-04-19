import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { set } from "date-fns";

export default function Tasks({
    auth,
    tipos,
    prioridades,
    msj,
    resultado,
    users,
}) {
   
    const [show, setShow] = useState(msj != null);
    const [Asignacion, setAsignacion] = useState(false);

    const [usuariosA, setUsuariosA] = useState([]);
    const [usuarioA, setUsuarioA] = useState({});

    useEffect(() => {
        console.log(msj);
        setShow(msj?.success != undefined);
    }, [msj]);

    useEffect(() => {
        console.log(resultado);
    }, [resultado]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name_tarea: "",
        descripcion_detallada: "",
        priority: "",
        task_type_id: "",
        user_id: "",
    });

    const submit = (e) => {
        e.preventDefault();
        setAsignacion(true);

    }


    const Asignacion_usuario = (e) => {
        e.preventDefault();
        setAsignacion(true);

        const requisitos = tipos
            .find((tipo) => tipo.id == data.task_type_id) // Encontrar el tipo con el id correspondiente
            .requisitos // Obtener los requisitos de ese tipo
            .map((requisito) => requisito.level); // Mapear solo los niveles de los requisitos  

        
        axios
            .post(route("Asignar"), {
                requisitos
            })
            .then((response) => {
                const sortedData = response.data.sort(
                    (a, b) => a.distancia - b.distancia
                );
                setUsuariosA(sortedData);
                setUsuarioA(users.find((user) => user.id === sortedData[0].id));
            })
            .catch((error) => {
                // Manejar errores aquí
                console.error(error);
            });
    };

    useEffect(() => {
        console.log(resultado);
    }, [resultado]);

    const rediret = () => {
        window.location.reload();
    };

    return (
        <AuthenticatedLayout
            countNotificaciones={auth.countNotificaciones}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <Modal show={show} maxWidth="sm" onClose={rediret}>
                <img
                    className="z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  "
                    src="/assets/svg/check.svg"
                    alt=""
                />

                <div className="text-center relative mb-2 ">
                    <h1 className="mt-14 mb-8 font-semibold">
                        {msj?.success || msj?.error}
                    </h1>
                    {msj?.success && (
                        <div className="hover:scale-110">
                            <Link
                                href={route("AdmTasks", { id: msj.id })}
                                className="bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  "
                            >
                                Ver
                            </Link>
                        </div>
                    )}
                </div>
            </Modal>

            <Modal show={Asignacion} maxWidth="2xl" onClose={() => setAsignacion(false)}>
                <div className="text-center relative mb-2 ">
                    
                    {usuariosA.length > 0 && (
                        <div className="flex ">
                            <div className="flex flex-col w-2/3 justify-between bg-green-200 m-2 p-3 rounded-md gray-200 shadow-md" key={usuariosA[0].id} >
                                <div>
                                <h1 className="font-bold">Usuario Elejido</h1>
                                <div className="h-24 mt-3">
                                    <img className="w-full h-full object-contain" src="./assets/user.png" alt="" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row gap-2">
                                        <div className="font-bold">Nombre:</div>
                                        <div>{usuarioA.name}</div>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <div className="font-bold">
                                            Ponderacion:
                                        </div>
                                        <div>{usuariosA[0].distancia}</div>
                                    </div>
                                </div>
                                </div>
                                <button onClick={() => {setData("user_id", usuariosA[0].id),setAsignacion(false)}} className="self-center border py-2 p-4 w-36 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 justify-end mt-5">
                                    Aceptar
                                </button>
                            </div>
                                <div className="w-1/3">
                                <h1 className="font-bold"> Otros Usuario</h1>
                            {
                                // Renderizar usuarios adicionales
                                usuariosA.slice(1).map((usuario, index) => {
                                    const usuarioEncontrado = users.find(
                                        (user) => user.id === usuario.id
                                    );
                                    return (
                                        <div
                                            className="flex flex-row gap-4 border bg-indigo-50 m-2 p-3 rounded-md"
                                            key={usuarioEncontrado.id}
                                        >
                                            <div className="h-10 w-10 mt-3">
                                                    <img className="w-full h-full object-contain" src="./assets/user.png" alt="" />
                                                </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-row gap-2">
                                                    <div className="font-bold">
                                                        Usuario:
                                                    </div>
                                                    <div>
                                                        {usuarioEncontrado.name}
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <div className="font-bold">
                                                        Ponderacion:
                                                    </div>
                                                    <div>
                                                        {usuario.distancia}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                                </div>
                        </div>
                    )}
                </div>
            </Modal>

            <div className=" pb-1  ">
                <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md flex flex-col gap-10 py-4">
                    <form
                        onSubmit={submit}
                        className="flex flex-col mx-24 w-[60rem]  gap-4 text-textgray"
                    >
                        <label className="flex items-center gap-3">
                            <span className="text-xl w-60">Cliente</span>
                            
                            <select 
                                required
                                value={data.name_tarea}
                                onChange={(e) =>
                                    setData("name_tarea", e.target.value)
                                }
                                name="user_id"
                                id="user_id"
                                className="p-3 w-full bg-white rounded-md outline-none"
                            >
                                <option value={""}>
                                    Ningún cliente seleccionado
                                </option>
                                {users
                                    .filter(user => user.rol_id === 5) // Filtrar usuarios con rol_id igual a 2
                                    .map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))
                                }
                            </select>



                        </label>

                        <div className="flex gap-8 w-full">
                            <label className="flex items-center gap-3">
                                <span className="flex text-xl w-[190px]">
                                    Seleccione servicio
                                </span>
                                <select
                                    required
                                    value={data.task_type_id}
                                    onChange={(e) =>
                                        setData("task_type_id", e.target.value)
                                    }
                                    name="task_type_id"
                                    id="task_type_id"
                                    className="p-3 w-98 bg-white rounded-md outline-none"
                                >
                                    <option value={""}>
                                        Ningún servicio seleccionado
                                    </option>
                                    {tipos.map((Task) => (
                                        <option key={Task.id} value={Task.id}>
                                            {Task.type_name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex items-center gap-3">
                                <div>
                                    <span className=" flex  text-xl w-[190px] ">
                                        Seleccione Prioridad
                                    </span>
                                </div>

                                <input
                                    required
                                    type="range"
                                    value={data.priority}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                    name="priority"
                                    id="priority"
                                    className="p-3 w-98 bg-white rounded-md outline-none"
                                    min="1"
                                    max={prioridades.length}
                                    list="task_type2"
                                />
                                <datalist id="task_type2">
                                    <option value={""}>
                                        Ninguna prioridad seleccionada
                                    </option>
                                    {prioridades.map((Task) => (
                                        <option key={Task.id} value={Task.id}>
                                            {Task.type_name}
                                        </option>
                                    ))}
                                </datalist>
                            </label>
                        </div>

                        <label
                            htmlFor="descripcion"
                            className="flex items-center gap-3 text-xl"
                        >
                            <span className="text-xl w-60">Detalles:</span>
                            <textarea
                                placeholder="Escribe una descripcion (Opcional)"
                                name="descripcion"
                                id="descripcion"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                                className="w-full resize-none h-20 p-3 outline-none mt-2 rounded-md"
                            ></textarea>
                        </label>
                        <div className="flex w-full gap-2">
                           
                            <label className="flex items-center gap-3 mt-2 w-full">
                                <span className="text-xl w-60">Usuario Asignado</span>
                                
                                <select 
                                    required
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                    name="user_id"
                                    id="user_id"
                                    className="p-3 w-full bg-white rounded-md outline-none"
                                >
                                    <option value={""}>
                                        Ningún cliente seleccionado
                                    </option>
                                    {users
                                        .filter(user => user.rol_id === 1) // Filtrar usuarios con rol_id igual a 2
                                        .map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))
                                    }
                                </select>



                            </label>

                            <button type="button" onClick={Asignacion_usuario} className="border py-2 p-4 w-36 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 self-end justify-end mr-5 mt-5">
                                Asignar Usuario
                            </button>
                        </div>      

                        <button type="submit"  className="border py-2 p-4 w-36 rounded-xl bg-green-500 text-white hover:bg-green-600 hover:scale-105 self-center justify-end mr-5 mt-5">
                                Registra Tarea
                            </button>

                        <div className="text-red-500">
                            {msj?.error ?? <div>{msj?.error}</div>}
                        </div>

                        
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}

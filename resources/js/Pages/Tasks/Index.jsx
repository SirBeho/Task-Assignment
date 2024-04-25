import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { set } from "date-fns";
import ListSkills from "@/Components/ListSkills";
import Loading from "@/Components/Loading";


export default function Tasks({
    auth,
    config,
    taskTypes,
    msj,
    categorias,
    resultado,
    users,
}) {
    const [show, setShow] = useState(msj != null);
    const [selectedTask, setSelectedTask] = useState({});
    const [Asignacion, setAsignacion] = useState(false);

    const [usuariosA, setUsuariosA] = useState([]);
    const [usuarioA, setUsuarioA] = useState({});

    const [color, setColor] = useState("gray-500");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setShow(msj?.success != undefined);
    }, [msj]);

    const { data, setData, post, processing, errors, reset } = useForm({
        cliente_id: "",
        task_type_id: "",
        task_clasification_id: 1,
        descripcion: "",
        user_id: "",
        prioridad: 0,
    });


    useEffect(() => {   
        console.log(data)
    }, [data]);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        post(route("Task.create"), {
            onSuccess: (e) => {
                console.log(e);
                setLoading(false);
            },
            onError: (e) => {
                setLoading(false);
                console.log(e);

            },
        });
    }


    useEffect(() => {
        const selectTast = taskTypes.find(
            (tipo) => tipo.id == data.task_type_id
        );
        setSelectedTask(selectTast);
    }, [data.task_type_id]);

    const Asignacion_usuario = (e) => {
        e.preventDefault();

        if (!selectedTask) {
            alert("Seleccione un servicio o tarea");
            return;
        }

        if (!data.task_clasification_id) {
            alert("Seleccione una clasificacion");
            return;
        }

       

        setAsignacion(true);

        const requisitos = selectedTask.requisitos.map((requisito) => ({
            [requisito.skill.id]: requisito.level,
        }));

        axios
            .post(route("TaskType.Asignar"), {
                requisitos,data
            })
            .then((response) => {
                console.log(response.data)
                return;
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

            <Modal
                show={Asignacion}
                maxWidth="2xl"
                onClose={() => setAsignacion(false)}
            >
                <div className="text-center relative mb-2 ">
                    {usuariosA.length > 0 && (
                        <div className="flex ">
                            <div
                                className="flex flex-col w-2/3 justify-between bg-green-200 m-2 p-3 rounded-md gray-200 shadow-md"
                                key={usuariosA[0].id}
                            >
                                <div>
                                    <h1 className="font-bold">
                                        Usuario Elejido
                                    </h1>
                                    <div className="flex justify-center w-full">
                                        <div className="h-24 w-24 mt-3 rounded-full overflow-hidden">
                                            <img
                                                className="h-full w-full object-contain "
                                                src={`./assets/users/user_${usuariosA[0].id}.jpg`}
                                                alt="./assets/user.png"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row gap-2">
                                            <div className="font-bold">
                                                Nombre:
                                            </div>
                                            <div>{usuarioA.name}</div>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <div className="font-bold">
                                                Correo:
                                            </div>
                                            <div>{usuarioA.email}</div>
                                        </div>
                                        <div className="flex flex-row gap-2 ">
                                            <div className="font-bold">
                                                Ponderacion:
                                            </div>
                                            <div>{usuariosA[0].distancia}</div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setData("user_id", usuariosA[0].id),
                                            setAsignacion(false);
                                    }}
                                    className="self-center border py-2 p-4 w-36 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 justify-end mt-5"
                                >
                                    Aceptar
                                </button>
                            </div>
                            <div className="w-1/3">
                                <h1 className="font-bold"> Otros Usuario</h1>
                                {
                                    // Renderizar usuarios adicionales
                                    usuariosA
                                        .slice(1, 4)
                                        .map((usuario, index) => {
                                            const usuarioEncontrado =
                                                users.find(
                                                    (user) =>
                                                        user.id === usuario.id
                                                );
                                            return (
                                                <div
                                                    className="flex flex-row gap-2 w-full border bg-indigo-50 m-2 p-3 rounded-md"
                                                    key={usuarioEncontrado.id}
                                                >
                                                    <div>
                                                        <div className="font-bold text-sm">
                                                            Usuario:
                                                        </div>

                                                        <div className="h-12 w-12 rounded-full overflow-hidden">
                                                            <img
                                                                className="h-full w-full object-contain "
                                                                src={`./assets/users/user_${usuarioEncontrado.id}.jpg`}
                                                                alt="./assets/user.png"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2 text-sm">
                                                        <div className="flex flex-row gap-2">
                                                            {
                                                                usuarioEncontrado.name
                                                            }
                                                        </div>
                                                        <div className="flex flex-row gap-2">
                                                            <div className="font-bold">
                                                                Ponderacion:
                                                            </div>
                                                            <div>
                                                                {
                                                                    usuario.distancia
                                                                }
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

            {loading && (
                <Modal maxWidth="sm" show={loading}>
                    <Loading />
                </Modal>
            )}


            <div className=" pb-1  ">
                <div className="w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-gray-50 m-6 rounded-md shadow-md flex flex-col gap-10 py-4">
                    <form
                        onSubmit={submit}
                        className="flex flex-col mx-24 w-[60rem]  gap-5 text-textgray"
                    >
                        <span className="text-black font-bold text-xl">
                            Solicitud de Servicio
                        </span>
                        <label className="flex items-center ">
                            <span className="block text-xl w-60">Cliente</span>

                            <select
                                required
                                value={data.cliente_id}
                                onChange={(e) =>
                                    setData("cliente_id", e.target.value)
                                }
                                name="cliente_id"
                                id="cliente_id"
                                className="p-3 w-full bg-white rounded-md outline-none"
                            >
                                <option value={""}>
                                    Ningún cliente seleccionado
                                </option>
                                {users
                                    .filter((user) => user.rol_id === 5) // Filtrar usuarios con rol_id igual a 2
                                    .map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                            </select>
                        </label>

                        <div className="flex justify-between gap-6 w-full">
                            <div className="flex flex-col gap-5 w-full">
                                <label className="flex items-center  w-full">
                                    <span className="flex text-xl w-[18rem]">
                                        Seleccione servicio
                                    </span>
                                    <select
                                        required
                                        value={data.task_type_id}
                                        onChange={(e) =>
                                            setData(
                                                "task_type_id",
                                                e.target.value
                                            )
                                        }
                                        name="task_type_id"
                                        id="task_type_id"
                                        className="p-3 w-full bg-white rounded-md outline-none"
                                    >
                                        <option value={""}>
                                            Ningún servicio seleccionado
                                        </option>
                                        {taskTypes.map((Task) => (
                                            <option
                                                key={Task.id}
                                                value={Task.id}
                                            >
                                                {Task.type_name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="flex items-center  w-full">
                                    <span className="flex text-xl w-[17.2rem]">
                                        Seleccione clasificacion
                                    </span>
                                    <div className="flex w-full bg-white rounded-md border border-gray-500 overflow-hidden   ">
                                        <select
                                            required
                                            value={data.task_clasification_id}
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                const selectedCategoria = categorias.find(categoria => categoria.id == selectedValue);
                                            
                                                setData({
                                                    ...data,
                                                    task_clasification_id: selectedValue,
                                                    prioridad: selectedCategoria ? selectedCategoria.impact.value : 0
                                                });
                                            
                                                setColor(selectedCategoria ? selectedCategoria.impact.color_label : "gray-500");
                                            }}
                                            name="task_clasification_id"
                                            id="task_clasification_id"
                                            className={`p-3 w-full  !ring-0 !border-none !outline-none `}
                                        >
                                            <option value={""}>
                                                Ningúna clasificaion
                                                seleccionada
                                            </option>
                                            {categorias.map((Task) => (
                                                <option
                                                    onClick={() =>
                                                        setColor(
                                                            categorias.find(
                                                                (categoria) =>
                                                                    categoria.id ==
                                                                    Task.id
                                                            ).impact.color_label
                                                        )
                                                    }
                                                    key={Task.id}
                                                    value={Task.id}
                                                >
                                                    {Task.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span
                                            className={`block w-12  h-12 bg-${color}`}
                                        ></span>
                                    </div>
                                </label>
                            </div>

                            <div className=" w-[31rem] bg-white p-2 rounded-md border border-gray-500 ">
                                <ListSkills
                                    selectedSkills={selectedTask?.requisitos}
                                    config={config}
                                />
                            </div>
                        </div>

                        <label
                            htmlFor="descripcion"
                            className="flex items-center gap-3 text-xl"
                        >
                            <span className="text-xl w-[14rem]">Detalles:</span>
                            <textarea
                                placeholder="Escribe una descripcion (Opcional)"
                                name="descripcion"
                                id="descripcion"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                                className="w-full resize-none h-20 p-3 outline-none rounded-md"
                            ></textarea>
                        </label>
                        <div className="flex w-full gap-2">
                            <label className="flex items-center gap-3 w-full">
                                <span className="text-xl w-60">
                                    Usuario Asignado
                                </span>

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
                                        .filter((user) => user.rol_id === 2)
                                        .map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                </select>
                            </label>

                            <button
                                type="button"
                                onClick={Asignacion_usuario}
                                className="border py-2 p-4 w-36 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 self-end justify-end mr-5 mt-5"
                            >
                                Asignar Usuario
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="border py-2 p-4 w-36 rounded-xl bg-green-500 text-white hover:bg-green-600 hover:scale-105 self-center justify-end mr-5 mt-5"
                        >
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

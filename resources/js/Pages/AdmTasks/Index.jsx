import React, { useEffect, useReducer, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import Modal from "@/Components/Modal";
import Tarea from "@/Components/Tarea";

export default function AdmTasks({
    auth,
    Tasktypes,
    msj,
    Task_id,
    statusList,
    Tasks,
}) {
    const [dato, setdato] = useState(null);
    const [open, setOpen] = useState(0);
    const [select, setSelet] = useState(0);
    const [datos_f, setDatos_f] = useState(Tasks);
    const [edit, setEdit] = useState(false);
    const { data, setData, post } = useForm(null);
    const [show, setShow] = useState(msj != null);
    const [isOpenModalStatus, setIsOpenModalStatus] = useState(false);
    const [comentario, setComentario] = useState("");
    const [verFiltro, setVerFiltro] = useState(false);

    const [filtro, setFiltro] = useState({
        estado: 0,
        todas: false,
        texto: "",
    });

    useEffect(() => {
        setDatos_f(Tasks);
        if (open) {
            const TaskSeleccionada = Tasks.find((Task) => Task.id === open);
            setdato(TaskSeleccionada);
            setData(TaskSeleccionada);
        }
    }, [auth.user.Tasks]);

    useEffect(() => {
        if (msj?.error == null || msj?.error == []) {
            setComentario("");
            setShow(msj != null);
        }
    }, [msj]);

    useEffect(() => {
        if (Task_id && !open) {
            abrir(parseInt(Task_id));
        }
    }, [Task_id]);

    useEffect(() => {
        const filtered = Tasks.filter((soli) => {
            if (filtro.estado && soli.status_id !== filtro.estado) {
                return false;
            }

            if (!filtro.todas && soli.status_id > 4 && filtro.estado < 4) {
                return false;
            }

            if (
                filtro.texto &&
                !JSON.stringify(soli).toLowerCase().includes(filtro.texto)
            ) {
                return false;
            }

            return true;
        });

        setDatos_f(filtered);
    }, [filtro]);

    const abrir = (TaskId) => {
        if (open == TaskId) {
            setOpen(0);
            setTimeout(() => setdato(null), 500);
        } else {
            setOpen(TaskId);
            const TaskSeleccionada = Tasks.find((Task) => Task.id === TaskId);
            setdato(TaskSeleccionada);
            setData(TaskSeleccionada);
        }
    };

    const put = (id) => {
        if (select == id) {
            setSelet(0);
        } else {
            setSelet(id);
        }
    };

    const handleDownload = (archivo) => {
        const id = archivo.id;
        const filename = archivo.name + "." + archivo.extencion;

        axios
            .post("/download", { id }, { responseType: "blob" })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error("Error al descargar el archivo:", error);
            });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("Task.update"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            msj={msj}
            countNotificaciones={auth.countNotificaciones}
            Task_id={open}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Administración de Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className=" pb-1  ">
                <div className=" m-5 h-full bg-white shadow-lg   rounded-md gap-10 p-10 pt-4">
                    <div className="flex gap-3 mb-5 border-b-2 pb-2">
                        <label className=" flex items-center border-2 border-black w-80 h-9 text-sm bg-white rounded-lg overflow-hidden p-2 font-medium">
                            Buscar
                            <input
                                onChange={(e) =>
                                    setFiltro({
                                        ...filtro,
                                        texto: e.target.value,
                                    })
                                }
                                className="border-none h-full w-full outline-none focus:ring-0"
                            />
                        </label>
                        <div
                            className="cursor-pointer flex items-center"
                            onClick={() => {
                                setVerFiltro(!verFiltro),
                                    verFiltro &&
                                        setFiltro({
                                            estado: 0,
                                            todas: false,
                                            texto: filtro.texto,
                                        });
                            }}
                        >
                            <img
                                className="w-5 h-5"
                                src={`/assets/svg/${
                                    verFiltro ? "nofilter.svg" : "filter.svg"
                                }`}
                                alt=""
                            />
                        </div>
                        <div
                            className={`${
                                verFiltro ? "w-[35rem]" : "w-0"
                            } overflow-hidden transition-all duration-500`}
                        >
                            <div className="flex gap-4">
                                <label className="flex gap-3 items-center">
                                    <span className="font-semibold">
                                        {" "}
                                        Estados:
                                    </span>

                                    <select
                                        required
                                        value={filtro.estado}
                                        onChange={(e) =>
                                            setFiltro({
                                                ...filtro,
                                                estado: parseInt(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        name="tipo_id"
                                        id="tipo_id"
                                        className="p-0 px-2 w-fit rounded-md h-8"
                                    >
                                        <option value={0} select>
                                            Todas
                                        </option>
                                        {statusList.map((estado) => (
                                            <option
                                                key={estado.id}
                                                value={estado.id}
                                            >
                                                {estado.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className=" relative inline-flex gap-2 cursor-pointer select-none items-center ">
                                    <span className="whitespace-nowrap">
                                        Mostrar Completas:{" "}
                                    </span>
                                    <input
                                        type="checkbox"
                                        name="autoSaver"
                                        className="sr-only"
                                        checked={filtro.todas}
                                        onChange={(e) =>
                                            setFiltro({
                                                ...filtro,
                                                todas: e.target.checked,
                                            })
                                        }
                                    />
                                    <span
                                        className={` mr-3 flex h-[24px] w-[43px] items-center rounded-full p-1 duration-200  ${
                                            filtro.todas
                                                ? "bg-blue-500"
                                                : "bg-[#CCCCCE]"
                                        }`}
                                    >
                                        <span
                                            className={` h-[17px] w-[17px] rounded-full bg-white duration-200 ${
                                                filtro.todas
                                                    ? "translate-x-4"
                                                    : ""
                                            }`}
                                        ></span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex  gap-16">
                        <ul className="flex flex-col col gap-4 overflow-hidden overflow-y-scroll  h-full max-h-[740px] p-2 rounded-md pe-8  ">
                            {datos_f?.length ? (
                                datos_f.map((Task) => {
                                    return (
                                        <Tarea
                                            key={Task.id}
                                            data={Task}
                                            click={() => abrir(Task.id)}
                                            open={open}
                                        />
                                    );
                                })
                            ) : (
                                <h1>No hay Tasks</h1>
                            )}
                        </ul>

                        <div
                            className={`flex flex-col gap-3  ${
                                open ? "w-[600px]" : "w-0 opacity-0 "
                            }   p-4 bg-gray-200 rounded-md shadow-xl ms-4    overflow-hidden transition-all duration-500 `}
                        >
                            {dato ? (
                                <>
                                    <table>
                                        <tbody className=" bg-white py-2 p-4 rounded-md flex justify-between ">
                                            <tr className="w-full">
                                                <td className="font-bold w-44 py-2 whitespace-nowrap">
                                                    Nombre solicitante
                                                </td>
                                                <td className="">
                                                    {dato.cliente.name}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                  

                                    <div className="bg-white  py-2 p-4 rounded-md overflow-hidden opacity-100">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="font-bold w-44 py-2 whitespace-nowrap">
                                                        Tipo de Tarea
                                                    </td>
                                                    <td>{dato.tipo.type_name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-bold w-44 py-2 whitespace-nowrap">
                                                        Clasificacion
                                                    </td>
                                                    <td className="flex items-center gap-1">
                                                        <span>{dato.clasificacion.name}</span>
                                                        <span className={` block h-3 w-5 rounded-lg bg-${dato.clasificacion.impact.color_label}`}></span>
                                                    </td>

                                                </tr>

                                                <tr>
                                                    <td className="font-bold w-44 py-2 whitespace-nowrap">
                                                        Descripcion
                                                    </td>
                                                    <td>{dato.descripcion}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-bold w-44 py-2 whitespace-nowrap">
                                                        Fecha de Creacion
                                                    </td>
                                                    <td>
                                                        {format(
                                                            new Date(
                                                                dato.created_at

                                                            ),
                                                            "dd/MM/yyyy hh:mm:ss a"
                                                        )}
                                                    </td>
                                                </tr>
                                               
                                                <tr>
                                                    <td className="font-bold w-44 py-2 whitespace-nowrap">
                                                        Usuario Asignado
                                                    </td>
                                                    <td>{dato.usuario_asignado.name}</td>
                                                </tr>
                                               
                                                
                                                <tr>
                                                    <td className="font-bold w-44 py-2 whitespace-nowrap">
                                                        Tiempo Estimado
                                                    </td>
                                                    <td>{dato.estimated_time}</td>
                                                </tr>

                                               

                                            </tbody>
                                        </table>
                                    </div>

                                    <Modal
                                        show={edit}
                                        onClose={() => {
                                            setShow(false), setEdit(false);
                                        }}
                                    >
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setEdit(false)}
                                                className="px-2 font-bold hover:bg-gray-300 rounded-lg"
                                            >
                                                x
                                            </button>
                                        </div>

                                        <form
                                            onSubmit={submit}
                                            className="flex flex-col w-full gap-4 text-textgray p-4"
                                        >
                                            <label
                                                htmlFor="name"
                                                className="text-xs flex flex-col "
                                            >
                                                Numero de Task
                                                <input
                                                    disabled
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={data.numero}
                                                    className="h-9 rounded-md  outline-none px-2"
                                                />
                                            </label>

                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="descripcion"
                                                    className="text-xs"
                                                >
                                                    Descripcion
                                                </label>

                                                <textarea
                                                    value={data.descripcion}
                                                    onChange={(e) =>
                                                        setData(
                                                            "descripcion",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Escribe tu descripcion"
                                                    name="descripcion"
                                                    id="descripcion"
                                                    className="w-full resize-none h-28 p-3 rounded-md outline-none "
                                                ></textarea>
                                            </div>

                                            <div className="flex flex-col">
                                                {msj?.error &&
                                                    Array.isArray(msj?.error) &&
                                                    msj.error.map(
                                                        (msj, index) => (
                                                            <h1
                                                                key={index}
                                                                className="flex w-full text-red-400"
                                                            >
                                                                {msj}
                                                            </h1>
                                                        )
                                                    )}
                                            </div>

                                            <button className="border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-center justify-center mr-5 mt-5">
                                                Guardar
                                            </button>
                                        </form>
                                    </Modal>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

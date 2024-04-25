import React, { useEffect } from "react";
import TransferList from "./TransferList";

export default function EditUser({
    roles,
    changeRol,
    hideModal,
    update,
    setData,
    isCliente,
    msj,
    data,
    skills,
    config,
}) {
 

    return (
        <form onSubmit={update} className="flex flex-col gap-4 text-textgray">
           
            <div className="flex gap-8 items-end">
               
            <div className="h-20 w-20 rounded-full border overflow-hidden">
                              <img className="h-full w-full object-contain " src={`./assets/users/user_${data.id}.jpg`} alt="./assets/user.png" />
                    </div>  
               

                    
                <div className="flex flex-col w-3/5">
                    <label htmlFor="name" className="text-xs">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="h-9 rounded-md w-full outline-none"
                        value={data.name}
                        required
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>

                
            </div>

            <div className="flex gap-8">
            <div className="flex flex-col w-2/5">
                    <label htmlFor="telefono" className="text-xs">
                        Número contacto
                    </label>
                    <input
                        type="tel"
                        name="telefono"
                        id="telefono"
                        className="h-9 rounded-md full outline-none px-2"
                        value={data.telefono}
                        required
                        onChange={(e) => setData("telefono", e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-2/4">
                    <label htmlFor="rol_id" className="text-xs">
                        Rol             
                    </label>

                    <select
                        required
                        name="rol_id"
                        id="rol_id"
                        className="w-full p-1 bg-white rounded-md outline-none"
                        defaultValue={data.rol_id}
                        onChange={changeRol}
                    >
                        <option value="">Seleccione Rol</option>
                        {roles.map((rol) => (
                            <option value={rol.id} key={rol.id}>
                                {rol.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {data.rol_id == 2 && (
                 <TransferList
                 selectedSkills={data?.skills}
                 setSelectedSkills={(skills) => setData("skills", skills)}
                 skills={skills}
                 config={config}
             ></TransferList>
 
            )}
            {msj?.error && (
                <span className="text-red-500 text-xs italic">
                    {msj?.error[0]}
                </span>
            )}

           
            <div className="flex justify-end">
                <button
                    type="button"
                    className="border py-1 w-36 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-5 mt-5"
                    onClick={hideModal}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5"
                >
                    Registrar
                </button>
            </div>
        </form>
    );
}

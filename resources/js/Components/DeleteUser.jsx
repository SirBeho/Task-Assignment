import React from 'react'

export default function DeleteUser({ hideModal, destroy, selectedUser }) {
   
    return (
        < >

            <h1 className='w-full text-center text-xl mb-2'>
                ¿Seguro que deseas eliminar a
                <strong className='uppercase'> {selectedUser?.name || selectedUser?.name}</strong> de la lista?
            </h1>
            <div className='flex justify-end'>
                <button className="border py-1 w-36 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-5 mt-5"
                    onClick={hideModal}
                >
                    Cancelar
                </button>

                <button className="border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5" 
                onClick={destroy} >
                    Eliminar
                </button>
            </div>

        </>
    )
}

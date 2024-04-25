import React from 'react'
import { format } from 'date-fns';


const Task = ({data,click,open}) => {
    console.log(data)
    const formattedDate = format(new Date(data.created_at),'dd/MM/yyyy hh:mm:ss a')

    return (
        
        <li onClick={click} className={`flex w-80 bg-lime-100 duration-300 rounded-md cursor-pointer`}>
            <div className={`max-h-[740px] min-h-full w-2 bg-blue-500 rounded-l-lg`}>
                {data.descripcion}
            </div>

                
        </li>
    )
}

export default Task;
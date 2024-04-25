import React from 'react'
import { format } from 'date-fns';


const Task = ({data,click,open}) => {
    
    const formattedDate = format(new Date(data.created_at),'dd/MM/yyyy hh:mm:ss a')

    return (
        
        <li onClick={click} className={`flex w-80 bg-lime-100 ${open == data.id ? "border-2 scale-90": "" } duration-300 rounded-md cursor-pointer`}>
            <div className={`max-h-[740px] min-h-full w-2 bg-${data.clasificacion.impact.color_label} rounded-l-lg`}></div>

            <div className="flex flex-col gap-2 p-2 text-textgray w-full">
           
                <div className='flex justify-between'> 
                    <span>{data.cliente.name}</span>
                </div>
           
                <div className='flex flex-col'>
                    <span>{data.tipo.type_name}</span>
                </div>

                <div className='flex justify-between pe-5 '>
                    <span className="text-xs">
                        {formattedDate}
                    </span>
                    
                </div>
                
            </div>
        </li>
    )
}

export default Task;
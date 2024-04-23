
import React, { useEffect, useState } from "react";
import Progresbar from "./progresbar";
import { sk } from "date-fns/locale";

const TransferList = ({ selectedSkills,setSelectedSkills, skills , config  }) => {


    config = {
        rangelevel:{
            min: 1,
            max: 5
        }
    }

    const [availableSkills, setAvailableSkills] = useState(
        skills?.filter((skill) =>
            selectedSkills?.every(
                (selectedSkill) =>
                    selectedSkill.skill_id !== skill.id
            )
        )
        .map((skill) => ({
            level: 1,
            skill: skill,
            skill_id: skill.id
        }))
    );

    
    const handleTransfer = (skill) => {
        setSelectedSkills([...selectedSkills, skill]);

        // Eliminar de la lista de habilidades disponibles
        setAvailableSkills(availableSkills.filter((s) => s.skill.id !== skill.skill_id));
    };

    const handleRemove = (skill) => {
      
        // Eliminar de la lista de habilidades seleccionadas
        setSelectedSkills(selectedSkills.filter((s) => s.skill_id !== skill.skill_id));
        // Añadir de nuevo a la lista de habilidades disponibles
        setAvailableSkills([...availableSkills, skill]);
    };


    return (
        <div className="flex w-full gap-3 h-56 ">
            <div className="flex flex-col w-3/4 bg-white dark:bg-gray-700 rounded-md shadow-md  ">
                <span className="flex border-b p-2">
                    Habilidades Seleccionadas
                </span>
                <div className="flex w-full p-4 overflow-auto">
                    <table
                        id="table_selected"
                        className="display table table-bordered select-none"
                    >
                        <thead>
                            <tr>
                                <th className="text-left w-80 ">Habilidad</th>
                                <th className="text-left">Nivel</th>
                                <th className="text-left w-80">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSkills?.map((skill,index) => (
                                <tr key={index}>
                                    <td className="w-80">{skill.skill.skill_name}</td>
                                    <td className="flex">
                                        
                                    <Progresbar
                                        min={config.rangelevel?.min}
                                        max={config.rangelevel?.max}
                                        value={skill.level}
                                        onChange={(newLevel) => {
                                            setSelectedSkills(
                                                selectedSkills.map((s) =>
                                                    s.skill.id === skill.skill.id
                                                        ? {
                                                              ...s,
                                                              level: newLevel,
                                                          }
                                                        : s
                                                )
                                            );
                                        }}
                                    ></Progresbar>

                                        
                                    </td>
                                    <td className="w-80 h-4">
                                        <svg onClick={() => handleRemove(skill)} className="fill-red-500 hover:cursor-pointer hover:fill-red-700 h-4 ps-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col w-1/4 bg-white dark:bg-gray-700 rounded-md shadow-md">
                <span className="flex border-b p-2">Otras Habilidades</span>
                <div className="flex w-full p-4 overflow-auto">
                    <table
                        id="table_available"
                        className="table table-bordered"
                    >
                        <thead>
                            <tr>
                                <th className="text-left w-80">Habilidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableSkills.map((skill,index) => (
                                <tr key={index}>
                                    <td
                                        className="w-80 cursor-pointer hover:bg-gray-200 p-1"
                                        onClick={() => handleTransfer(skill)}
                                    >
                                        {skill.skill.skill_name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransferList;


import React, { useEffect, useState } from "react";
import Progresbar from "./progresbar";

const ListSkills = ({ selectedSkills,config ,labels }) => {

    console.log(labels)
    

    return (
        <div className="flex w-full h-full ">
            <div className="flex flex-col w-full bg-white dark:bg-gray-700 rounded-md ">
                <span className="text-xl font-semibold text-gray-800 mb-2">
                    Habilidades Requeridas
                </span>
                <div className="flex w-full  ">
                    <table id="table_selected" className="display select-none" >
                        <thead>
                            <tr>
                                <th className="text-left w-90 pe-2 text-gray-800">Habilidad</th>
                                <th className="text-left text-gray-800">Nivel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSkills?.map((skill,index) => (
                                <tr key={index}>
                                    <td className="w-90 text-gray-800 ">{skill.skill.skill_name}</td>
                                    <td className="w-5">
                                    <Progresbar
                                        min={config.rangeLevel?.min}
                                        max={config.rangeLevel?.max}
                                        value={skill.level}
                                        labels={labels}
                                    ></Progresbar>
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

export default ListSkills;

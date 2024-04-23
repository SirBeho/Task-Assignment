import { min } from "date-fns";
import React, { useEffect, useState } from "react";

const Progresbar = ({ min = 0 , max = 100, value ,onChange  }) => {
  



    const addsubstract = (num) => {
        if(value+num <= max && value+num >= min){
            onChange(value + num);
        }
    }

    return (
            <div className="relative  flex gap-1 items-center w-52 h-5 text-white">
                {onChange && (
                    <div onClick={() => addsubstract(-1)} className="h-6 w-6 hover:cursor-pointer hover:scale-105  ">
                    <svg className="fill-blue-500 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                    </div>
                )}
               
                <div className="relative overflow-hidden h-full text-xs flex rounded bg-blue-200 w-full ">
                <span className="absolute left-1  text-sm font-semibold inline-block ">
                            {value}
                        </span>
                    <div
                        style={{ width: `${(value/max)*100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap  justify-center bg-blue-500"
                    ></div>
                </div>
                {onChange && (
                    <div onClick={() => addsubstract(1)} className="h-6 w-6 hover:cursor-pointer hover:scale-105 ">
                        <svg className="fill-blue-500 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                    </div>
                )}
        </div>
    );
};

export default Progresbar;

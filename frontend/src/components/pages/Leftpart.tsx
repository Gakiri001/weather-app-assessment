import React from "react";
import { CiCloudSun } from "react-icons/ci";

type Props = {};

export default function Leftpart({}: Props) {
  return (
    <div className="w-[30%] border-r-1 border-black h-full flex flex-col items-center justify-between p-8">
      <div className="flex flex-col items-center justify-center">
        <CiCloudSun className="text-[200px] text-[#FFB800] m-4" />
        <p className="text-3xl font-bold">13 ºC</p>
        <p className="text-3xl font-bold capitalize">sunny</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold">
          10 <sup>th</sup> May 2025
        </p>
        <p className="text-2xl font-bold capitalize">murang'a</p>
      </div>
    </div>
  );
}

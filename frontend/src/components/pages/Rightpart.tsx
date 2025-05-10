'use client'; // 👈 Required for interactivity
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaCloudRain } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { CiCloudOn } from "react-icons/ci";
import { IoIosArrowDropright } from "react-icons/io";
import  {handleSearch} from "../../search"

type Props = {}

export default function Rightpart({}: Props) {
    const [city, setCity] = React.useState<string>("Nairobi");
  return (
     <div className='w-[70%]'>
        <div className='flex items-center justify-between p-4'>
            <div className='flex items-center justify-between w-[70%] gap-x-1'>
                <Input className=' border-1 border-gray-300' placeholder='Search Area'/>
                <Button className='cursor-pointer' onClick={()=>handleSearch("kenya")}>Go</Button>
            </div>
            <div className='w-[20%] gap-x-1 flex justify-end'>
                <Button className='cursor-pointer'>ºC</Button> 
                <Button variant="ghost" className='border-2 border-gray-300 cursor-pointer'>ºF</Button>
            </div>
        </div>
        <div className='flex items-center justify-between p-4 gap-2'>
            <div className='flex items-center flex-col p-4 justify-center border-1 border-gray-400 rounded-[10px] w-[90%] h-[80%]'>
                <p>22 May 2025</p>
                <FaCloudRain className='text-[100px] text-blue-500 m-4'/>
                <p className='text-1xl font-bold'>13-15 ºC</p>
            </div>
            <div className='flex items-center flex-col p-4 justify-center border-1 border-gray-400 rounded-[10px] w-[90%] h-[80%]'>
                <p>23 May 2025</p>
                <IoSunnyOutline className='text-[100px] text-[#FFB800] m-4'/>
                <p className='text-1xl font-bold'>19-22 ºC</p>
            </div>
            <div className='flex items-center flex-col p-4 justify-center border-1 border-gray-400 rounded-[10px] w-[90%] h-[80%]'>
                <p>24 May 2025</p>
                <CiCloudOn className='text-[100px] text-blue-200 m-4'/>
                <p className='text-1xl font-bold'>15-17 ºC</p>
            </div>
        </div>
        <div className='flex items-center justify-between p-4 gap-2'>
            <div className='flex items-center flex-col p-4 justify-between border-1 border-gray-400 rounded-[10px] w-[90%] h-[30vh]'>
                <p className='text-1xl font-semibold'>Wind Status</p>
                <p className='text-3xl font-bold'>3 Km/hr</p>
                <IoIosArrowDropright className='text-[60px] text-yellow-200'/>
            </div>
            <div className='flex items-center flex-col p-4 justify-between border-1 border-gray-400 rounded-[10px] w-[90%] h-[30vh]'>
                <p className='text-1xl font-semibold'>Humidity Infomation</p>
                <p className='text-3xl font-bold'>80%</p>
                <div className='h-[20px] w-[100%] bg-gray-200 rounded-[10px]'>
                    <div className='h-[20px] w-[80%] bg-blue-200 rounded-[10px]'></div>
                </div>
            </div>
        </div>
     </div>
  )
}
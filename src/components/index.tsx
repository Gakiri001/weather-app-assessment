import React from 'react'
import { CiCloudSun } from "react-icons/ci";
import Leftpart from './pages/Leftpart';
import Rightpart from './pages/Rightpart';

type Props = {}

export default function WeatherApp({}: Props) {
  return (
    <div className='flex items-center justify-center h-[90vh] border-1 border-black m-4 rounded-[10px]'>
        {/* bg-gradient-to-r from-blue-500 to-purple-500 */}
        <Leftpart/>
       <Rightpart/>
    </div>
  )

}
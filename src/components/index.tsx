import React from 'react'
import { Button } from './ui/button'

type Props = {}

export default function WeatherApp({}: Props) {
  return (
    <div className='flex items-center justify-center h-[90vh] border-1 border-black m-4 rounded-[10px]'>
        {/* bg-gradient-to-r from-blue-500 to-purple-500 */}
        <div className='w-[30%] border-r-1 border-black h-full'>
            
        </div>
        <div className='w-[70%]'>B</div>
    </div>
  )

}
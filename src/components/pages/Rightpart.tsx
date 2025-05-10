import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type Props = {}

export default function Rightpart({}: Props) {
  return (
     <div className='w-[70%]'>
        <div className='flex items-center justify-between p-4'>
            <div className='flex items-center justify-between w-[70%]'>
                <Input className='mr-1 border-1 border-gray-300' placeholder='Search Area'/>
                <Button className='cursor-pointer'>Go</Button>
            </div>
            <div className='w-[20%]'>
                <Button className='cursor-pointer'>ºC</Button> 
                <Button variant="ghost" className='border-2 border-gray-300 cursor-pointer'>ºF</Button>
            </div>
        </div>
        <div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div></div>
     </div>
  )
}
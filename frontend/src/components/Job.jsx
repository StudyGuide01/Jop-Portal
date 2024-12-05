import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'

const Job = () => {
  return (
    <>
      <div className='rounded-md  shadow-xl bg-white border border-gray-100 p-5 w-80'>
        <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>2 days ago</p>
        <Button variant="outline" className="bg-none hover:bg-none hover:bg-[#f0f0f0] bg-[#f0f0f0] bg-opacity-30 hover:bg-opacity-30 text-black rounded-full" size="icon">
          <Bookmark />
        </Button>
        </div>
        
        
        <div className='flex items-center gap-2 my-2 ml-[-20px]'>
          <Avatar>
            <AvatarImage 
              src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg' 
              className='w-20 h-20' 
              alt="Company Logo" 
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-medium text-lg'>Company name</h1>
            <p className='text-sm text-gray-500'>India</p>
          </div>
        </div>

        <div className="">
            <h1 className='font-bold text-lg my-2'>Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam inventore delectus totam sequi earum voluptatum omnis quae recusandae corporis illo.</p>

        </div>
        <div className='flex items-center gap-2 mt-4'>
    <Badge className={'text-blue-700 font-bol'} variant={'ghost'}>12 Position</Badge>
    <Badge className={'text-[#F83002] font-bol'} variant={'ghost'}>Part Time</Badge>
    <Badge className={'text-[#720B90] font-bol'} variant={'ghost'}>12 LPA</Badge>

</div>
<div className='mt-5 flex gap-5'>
    <Button variant="outline"><Link to={'/description'}>Details</Link></Button>
    <Button className="bg-[#7209b7]">Save Fort Later</Button>
</div>
      </div>
    </>
  )
}

export default Job
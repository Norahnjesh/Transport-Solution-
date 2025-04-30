import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const GetStartedPage = () => {
  return (
    <><div className='min-h-screen bg-primary flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24'>
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold text-white'>LOGISTICS MOVERS</h1>
      <p className='text-2xl mt-4'>Your trusted partner in logistics and transportation.</p>
      <p className='text-xl mt-2'>We deliver your goods with care and efficiency.</p>

    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
      <Link href="register" className="w-full sm:w-auto">
        <Button variant="secondary" className="w-full sm:w-auto">
          Get Started
        </Button>
      </Link>
      <Link href="login" className="w-full sm:w-auto">
        <Button variant="outline" className="w-full sm:w-auto">
          I have an account
        </Button>
      </Link>
    </div>   
    </div>
 
    </div></>
  )
}

export default GetStartedPage
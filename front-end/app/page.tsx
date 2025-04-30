import React from 'react'
import  './globals.css'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Home = () => {
  return (
    <><div className='min-h-screen bg-primary flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-white'>LOGISTICS MOVERS</h1>
        <p className='text-white text-center mt-4'>Welcome to our logistics service! We are here to help you with all your shipping needs.</p>
        <Link href="get-started" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Next
                </Button>
              </Link>
      </div>
      </div>
      </>
  )
}

export default Home
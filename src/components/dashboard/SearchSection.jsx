import { Search } from 'lucide-react'
import React from 'react'

const SearchSection = ({onSearchInput}) => {

 
  return (
    <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
      <h2 className='text-3xl font-bold'>Browse All Templates</h2>
      <p>what would you like today?</p>
      <div className='w-full flex justify-center items-center'>
        <div className='flex gap-2 items-center p-2 border rounded bg-white my-5'>
            <Search className='text-primary'/>
            <input type="text" onChange={(e)=>onSearchInput(e.target.value)} placeholder='Search...' className='bg-transparent outline-none text-black' />
        </div>
      </div>
    </div>
  )
}

export default SearchSection
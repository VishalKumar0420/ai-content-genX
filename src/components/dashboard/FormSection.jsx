import { Loader } from "lucide-react";
import React, { useState } from "react"



const FormSection = ({selectedTemplate,isPending,userFormInput}) => {
    
    const [formData,setFormData]=useState({})
    const onSubmit=(e)=>{
        e.preventDefault();        
        userFormInput(formData)
        
    }
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
  
  return (
    <div className='p-5 shadow-md border rounded-lg bg-whiten dark:bg-boxdark border-stroke dark:border-strokedark dark:text-white'>
      <img src={selectedTemplate?.icon || ""} alt='icon' width={70} height={70}/>
      <h2 className='font-bold text-2xl mb-2'>{selectedTemplate?.name}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

       <form className='mt-6' onSubmit={onSubmit}>
            {
                selectedTemplate?.form?.map((item,index)=>{
                    return(
                        <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                            <label className='font-bold '>{item?.label}</label>
                            {
                                item?.field==='input'?<input name={item?.name} required={item?.required} onChange={handleInputChange} className="px-3 py-2 dark:text-black"/>:item?.field==='textarea'?<textarea name={item?.name} className="px-3 py-2 dark:text-black" onChange={handleInputChange}/>:null
                            }
                        </div>
                    )
                })
            }
            <button type='submit' className='w-full py-3 border rounded-lg text-white bg-[#7E5FF9] flex justify-center items-center' disabled={isPending}>{isPending && <Loader className='animate-spin'/>}Generate Content</button>
      </form>
    </div>
  )
}

export default FormSection
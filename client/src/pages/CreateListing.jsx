import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>ثبت آگهی جدید</h1>
        <form className='flex flex-col sm:flex-row'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='عنوان آگهی' className='border p-3 rounded-lg' id='title' maxLength={62} minLength={10} required/>
                <textarea type="text" placeholder='شرح آگهی' className='border p-3 rounded-lg' id='description'required/>
            </div>
        </form>
    </main>
  )
}

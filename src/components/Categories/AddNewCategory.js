import React, { useState } from 'react';
import iconArrowLeft from '../../assets/icons/arrowLeft.svg';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../../utils/api';
import {toast} from 'react-toastify'
import { cookies } from '../Users/Login/Login';

const AddNewCategory = () => {
  const [title,setTitle] = useState('');
  const navigate  = useNavigate();


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const token = window.localStorage.getItem('token') || cookies.get('token')
    const id = window.localStorage.getItem('id');
    

      const dataValidation = await fetchApi('/category', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          user: id,
        }),
      });
      if (dataValidation.response.OK) {
        alert('berhasil buat kategori');
        navigate('/categories')
      } else {
        alert('gagal buat kategori')
      }

  }

  return <div className='mt-5 pt-5 px-44 bg-[#D8E7FF]'>
  <span className='font-bold text-xl flex gap-4 items-center'>
    <img 
      src={iconArrowLeft} 
      alt="arrowleft" 
      className='w-2 cursor-pointer' 
      onClick={()=>{
      navigate('/categories');
    }}
  /> Manage Kategori</span>
  <div className='mt-9 h-screen bg-white shadow-md py-7 px-7 flex flex-col rounded-2xl'>
    <div className='flex justify-between items-center'>
      <h2 className='font-bold text-2xl'>Buat Kategori </h2>
    </div>
    <form onSubmit={handleSubmit} className='pt-2'>
      <div className='flex gap-3 flex-col'>
        <label htmlFor="title" className='font-bold'>Title  Kategori</label>
        <div className="w-full">
          <input
            type="text"
            placeholder="Tulis kategori Disini"
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full p-5 placeholder:text-black placeholder:font-bold border-black border-[2px] rounded-lg"
          />
        </div>
      </div>
      <button className="flex justify-end pt-9 gap-2 items-center">
        <span className='bg-[#E3EEFF] px-5 py-1 rounded-md font-bold flex gap-2'>Buat Kategori</span>
      </button>
    </form>
  </div>
</div>;
};

export default AddNewCategory;

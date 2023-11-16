import React from 'react';
import iconArrowLeft from '../../assets/icons/arrowLeft.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchApi } from '../../utils/api';
import { useEffect } from 'react';
import moment from 'moment';
import {toast} from 'react-toastify'
import { cookies } from '../Users/Login/Login';

const CategoryList = () => {
  const [dataCategories,setDataCategories] = useState([]);
  const [dataPosts, setDataPosts] = useState({});
  const [postsInCategory, setPostsInCategory] = useState([])
  const navigate  = useNavigate();
  const token = window.localStorage.getItem('token') || cookies.get('token')

  const getAllCategories = async()=>{
      const dataValidation = await fetchApi('/category', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (dataValidation.response.OK) {
        setDataCategories(dataValidation.data)
      } else {
        alert('gagal memuat kategori')
      }
  }

  const deleteCategory = async(id)=>{
    const confirmDelete =  window.confirm('Yakin hapus kategori?')
    if(confirmDelete){
      const dataValidation = await fetchApi(`/category/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (dataValidation.response.OK) {
        alert('Kategori berhasil dihapus!')
      } else {
        alert('gagal hapus kategori')
      }

      getAllCategories()
    }
  }

  const getAllPosts = async()=>{
    const dataValidation = await fetchApi('/posts', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (dataValidation.response.OK) {
      setDataPosts(dataValidation.data)
      setPostsInCategory([])
      dataValidation.data.forEach((e)=>{
        setPostsInCategory(arr => [...arr, e?.category?.title])
      })
    } else {
      alert('gagal buat kategori')
    }
  }

  useEffect(()=>{
    getAllCategories();
    getAllPosts();
  },[])


  return <div className='mt-5 pt-5 px-44 bg-[#D8E7FF]'>
  <span className='font-bold text-xl flex gap-4 items-center'><img src={iconArrowLeft} alt="arrowleft" className='w-2 cursor-pointer' onClick={()=>{
    navigate('/');
  }}/> Manage Kategori</span>
  <div className='mt-9 h-screen bg-white shadow-md py-7 px-7 flex flex-col rounded-2xl'>
    <div className='flex justify-between items-center'>
      <h2 className='font-bold text-2xl'>List Kategori </h2>
      <div className='flex gap-3 items-center'>
        <span className='bg-[#E3EEFF] px-2 py-1 rounded-md font-bold flex gap-2 cursor-pointer' onClick={()=>{
          navigate('/categories/add')
        }}>Tambah Kategori</span>
      </div>
    </div>
    <div className='mt-5 flex flex-col gap-4'>
      {dataCategories.map((item,index)=>{
        return       <div key={`categories-${index}`} className='flex justify-between bg-[#D8E7FF] rounded-lg w-full p-5'>
        <div className='flex gap-8 items-center justify-center'>
          <h1 className='font-bold text-5xl'>{index+1}</h1>
          <span className='font-bold w-1 h-full bg-black'></span>
          <div>
            <p>Dibuat: {moment(item.created_at).format('LL')}</p>
            <p className='text-2xl font-semibold'>{item.title}</p>
            <p className='font-medium text-xs'>Author : {item.user.firstName}</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 items-start justify-center'>
          <p className='font-semibold'>{postsInCategory.filter(e => e === item.title).length} Item Diskusi</p>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          <a href={`/categories/${item._id}/edit`} onClick={()=>{
            toast.info("'Ingat saya' tidak dicentang", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }}><button className='py-1 px-7 rounded-full bg-white font-medium'>Edit</button></a>
          <button onClick={()=>{
            deleteCategory(item._id)}} className='py-1 px-7 rounded-full bg-white font-medium'>Hapus</button>
        </div>
      </div>
      })}

    </div>
  </div>
</div>;
};

export default CategoryList;

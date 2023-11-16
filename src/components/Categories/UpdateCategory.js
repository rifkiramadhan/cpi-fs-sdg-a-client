import React, { useEffect, useState } from 'react';
import iconArrowLeft from '../../assets/icons/arrowLeft.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchApi } from '../../utils/api';
import {toast} from 'react-toastify'
import { cookies } from '../Users/Login/Login';

const UpdateCategory = () => {
	const { id } = useParams();
	const [title, setTitle] = useState('');
  const [category, setCategory] = useState({});
	const navigate = useNavigate();
  const token = window.localStorage.getItem('token') || cookies.get('token');
  console.log(id)
	const handleSubmit = async (e) => {
		e.preventDefault();

		const dataValidation = await fetchApi(`/category/${id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
			}),
		});
		if (dataValidation.response.OK) {
			alert('berhasil edit kategori');
      console.log(dataValidation)
			navigate('/categories');
		} else {
			alert('gagal buat kategori');
		}
	};

  const getCategory = async() =>{
    const categoryById = await fetchApi(`/category/${id}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    if(categoryById.response.OK){
      setCategory(categoryById.data)
      setTitle(categoryById.data.title)
    }
  }

  useEffect(()=>{
    getCategory()
  },[])

	return (
		<div className="mt-5 pt-5 px-44 bg-[#D8E7FF]">
			<span className="font-bold text-xl flex gap-4 items-center">
				<img
					src={iconArrowLeft}
					alt="arrowleft"
					className="w-2 cursor-pointer"
					onClick={() => {
						navigate('/categories');
					}}
				/>{' '}
				Manage Kategori
			</span>
			<div className="mt-9 h-screen bg-white shadow-md py-7 px-7 flex flex-col rounded-2xl">
				<div className="flex justify-between items-center">
					<h2 className="font-bold text-2xl">Buat Kategori </h2>
				</div>
				<form onSubmit={handleSubmit} className="pt-2">
					<div className="flex gap-3 flex-col">
						<label htmlFor="title" className="font-bold">
							Title Kategori
						</label>
						<div className="w-full">
							<input
								type="text"
                value={title}
								placeholder="Tulis kategori Disini"
								onChange={(e) => setTitle(e.target.value)}
								className="w-full p-5 placeholder:text-black placeholder:font-bold border-black border-[2px] rounded-lg"
							/>
						</div>
					</div>
					<button className="flex justify-end pt-9 gap-2 items-center">
						<span className="bg-[#E3EEFF] px-5 py-1 rounded-md font-bold flex gap-2">
							Edit Kategori
						</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateCategory;

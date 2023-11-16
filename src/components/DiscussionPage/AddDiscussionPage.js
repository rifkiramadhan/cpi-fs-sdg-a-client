import React, { useEffect } from "react";
import iconArrowLeft from "../../assets/icons/arrowLeft.svg";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { fetchApi } from "../../utils/api";
import {toast} from 'react-toastify'
import { cookies } from "../Users/Login/Login";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const AddDiscussionPage = () => {
  const [title,setTitle] = useState("");
  const [value, setValue] = useState("");
  const [selectedCategory,setSelectedCategory] = useState('');
  const navigate = useNavigate();
  if (!window.localStorage.token && !cookies.get('token')) {
    window.location.href = "/login";
  }
  const [dataCategories,setDataCategories] = useState([]);
  const getAllCategories = async()=>{
    const token = window.localStorage.getItem('token') || cookies.get('token')
    
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
        alert('gagal buat kategori')
      }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const token = window.localStorage.getItem('token') || cookies.get('token')
    const id = window.localStorage.getItem('id');
    

      const dataValidation = await fetchApi('/posts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          user: id,
          description:value,
          title:title
        }),
      });
      if (dataValidation.response.OK) {
        alert('berhasil buat post');
        navigate('/')
      } else {
        alert('gagal buat post')
      }

  }

  useEffect(()=>{
    getAllCategories();
  },[])
  return (
    <div className="pt-5 px-44 bg-[#D8E7FF] h-full">
      <span className="font-bold text-xl flex gap-4 items-center">
        <img
          src={iconArrowLeft}
          alt="arrowleft"
          className="w-2 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />{" "}
        Buat Diskusi
      </span>

      <form onSubmit={handleSubmit} className="mt-9 h-screen bg-white shadow-md py-7 px-7 flex flex-col rounded-2xl">
        <div className="w-full">
          <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Tulis Judul Disini"
            className="w-full p-5 placeholder:text-black placeholder:font-bold border-black border-[2px] rounded-lg"
          />
        </div>
        <div className="flex justify-end pt-3 gap-2 items-center">
          <label htmlFor="category" className="font-bold">Pilih Kategori Diskusi</label>
          <select defaultValue={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} name="category" id="category" className="bg-[#E3EEFF] px-2 py-1 rounded-md font-bold flex gap-2">
          <option  value={""}>Pilih Kategori</option>
            {dataCategories.map((item,index)=>{
              return <option key={`categories-select-${index}`} value={item._id}>{item.title}</option>
            })}
          </select>
        </div>
        <div className="w-full mt-5">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
          />
        </div>
        <div className="flex justify-end w-full items-center">
        <button type="submit" className="pt-9 gap-2">
          <span className="bg-[#E3EEFF] px-5 py-1 rounded-md font-bold flex gap-2">
            Post Diskusi
          </span>
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default AddDiscussionPage;

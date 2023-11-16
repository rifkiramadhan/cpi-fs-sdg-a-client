import React from 'react';
import iconSearch from '../../assets/icons/Search.svg';
import iconViews from '../../assets/icons/arrowViews.svg';
import iconDot from '../../assets/icons/dot.svg';
import iconBack from '../../assets/icons/back-icon.png';
import Carousel from 'react-elastic-carousel';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../../utils/api';
import moment from 'moment';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {toast} from 'react-toastify'
import Cookies from 'universal-cookie';
import { cookies } from '../Users/Login/Login';

const HomePage = () => {
	const [dataPosts, setDataPosts] = useState([]);
	const [dataCategories, setDataCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);
	const [isSearching, setIsSearching] = useState(false);
	const navigate = useNavigate();

	console.log(cookies.get('token'))

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
	const getAllPosts = async () => {
		const dataValidation = await fetchApi('/posts', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (dataValidation.response.OK) {
			setDataPosts(dataValidation.data);
		} else {
			alert('gagal buat kategori');
		}
	};
	const getAllCategories = async () => {
		const token = window.localStorage.getItem('token');

		const dataValidation = await fetchApi('/category', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (dataValidation.response.OK) {
			setDataCategories(dataValidation.data);
		} else {
			alert('gagal buat kategori');
		}
	};

	const handleDelete = async (id) => {
		const token = window.localStorage.getItem('token') || cookies.get('token');
		if (window.confirm('Yakin hapus post?')) {
			const deleteTopic = await fetchApi(`/posts/${id}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			getAllPosts();
		}
	};

	useEffect(() => {
		getAllPosts();
		getAllCategories();
	}, []);
	// if (!window.localStorage.token) {
	// 	window.location.href = '/login';
	// }
	return (
		<div className="pt-5 px-44 bg-[#D8E7FF] h-full pb-20">
			{isSearching ? (
				<h2 className="font-bold text-xl">Pencarian</h2>
			) : (
				<h2 className="font-bold text-xl">Kategori</h2>
			)}
			<div className="flex items-center gap-5">
				{!isSearching && (
					<div className="flex items-center mt-2 bg-white rounded-lg shadow-md h-16 px-5 gap-2 w-full">
						<Carousel itemsToShow={5} pagination={false}>
							{dataCategories.map((item, index) => (
								<span
									key={`carousel-category-${index}`}
									className={`bg-${
										activeCategory === index ? 'blue-200 font-bold' : 'white'
									} py-1 px-7 rounded-md cursor-pointer`}
									onClick={() => setActiveCategory(index)}>
									{item.title}
								</span>
							))}
						</Carousel>
					</div>
				)}
				{isSearching ? (
					<div className="relative w-full items-center">
						<input
							onChange={(e) => setIsSearching(e.target.value)}
							className="mt-2 pl-16 pr-5 bg-white font-bold rounded-lg shadow-md h-16 w-full relative placeholder:text-black"
							placeholder="Mau cari forum apa ?"
						/>
						<img
							src={iconBack}
							alt="Back"
							className="absolute mt-1 left-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
							style={{ width: '40px', height: '40px' }} // Sesuaikan ukuran gambar
							onClick={() => setIsSearching(false)}
						/>
					</div>
				) : (
					<button
						onClick={() => {setIsSearching(true)
						}}
						className="bg-white shadow-md mt-2 h-16 flex items-center py-1 px-4 rounded-md cursor-pointer">
						<img src={iconSearch} alt="iconsearch" />
					</button>
				)}
			</div>
			<div className="mt-9 h-52 bg-white shadow-md rounded-2xl flex justify-center items-center px-2">
				<Carousel itemsToShow={1} pagination={false}>
					<div className="flex justify-center items-center flex-col gap-3  py-4">
						<h2 className="font-bold text-4xl">WellNest Forum</h2>
						<p className="font-medium text-xl">
							Tempatnya mencari informasi, berdiskusi, dan berkontribusi tentang
							serba serbi kesehatan dan medis
						</p>
					</div>
					<div className="flex justify-center items-center flex-col gap-3  py-4">
						<h2 className="font-bold text-4xl">WellNest Forum</h2>
						<p className="font-medium text-xl">
							Tempatnya mencari informasi, berdiskusi, dan berkontribusi tentang
							serba serbi kesehatan dan medis
						</p>
					</div>
					<div className="flex justify-center items-center flex-col gap-3  py-4">
						<h2 className="font-bold text-4xl">WellNest Forum</h2>
						<p className="font-medium text-xl">
							Tempatnya mencari informasi, berdiskusi, dan berkontribusi tentang
							serba serbi kesehatan dan medis
						</p>
					</div>
				</Carousel>
			</div>

			<div className="mt-9 h-full mb-10 bg-white shadow-md py-7 px-7 flex flex-col rounded-2xl">
				<div className="flex justify-between items-center">
					<h2 className="font-bold text-2xl">Hot Topics</h2>
					<div className="flex gap-3 items-center">
						<h2 className="font-medium">Urutkan berdasarkan:</h2>
						<span className="bg-[#E3EEFF] px-2 py-1 rounded-md font-bold flex gap-2">
							Views <img src={iconViews} alt="arrowviews" />
						</span>
					</div>
				</div>
				<div className="mt-5 flex flex-col gap-4">
					{dataPosts.map((item, index) => {
						return (
							<div
								key={`post-homepage-${index}`}
								className="flex justify-between bg-[#D8E7FF] rounded-lg w-full p-5 cursor-pointer">
								<div
									onClick={() => {
										navigate(`/discussion/${item._id}`);
									}}
									className="flex flex-col gap-2 items-start justify-center">
									<p>{moment(item.created_at).format('LL')}</p>
									<p className="text-2xl font-semibold hover:bg-sky-300 p-2 rounded-sm">{item.title}</p>
									<p className="font-medium text-xs">
										Oleh : {item?.user?.firstName}
									</p>
								</div>
								<div className="flex flex-col gap-2 items-start justify-center">
									{(window.localStorage.getItem('token') || cookies.get('token')) && (
										<Menu as="div" className={'w-full text-right'}>
											<Menu.Button>
												<button onClick={() => {}}>
													<img
														src={iconDot}
														alt="icondot"
														className="w-8 ml-auto z-10"
													/>
												</button>
											</Menu.Button>

											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95">
												<Menu.Items className="absolute right-20 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<div className="py-1">
														{
															<Menu.Item>
																{({ active }) => (
																	<a
																	onClick={()=>{
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
																	}}
																		href={`/discussion/${item._id}`}
																		className={classNames(
																			active
																				? 'bg-gray-100 text-gray-900'
																				: 'text-gray-700',
																			'block px-4 py-2 text-sm text-left'
																		)}>
																		Lihat
																	</a>
																)}
															</Menu.Item>
														}
														{window.localStorage.getItem('email') ===
															item.user?.email && (
															<Menu.Item>
																{({ active }) => (
																	<a
																	onClick={()=>{
																	}}
																		href={`/discussion/${item._id}/edit`}
																		className={classNames(
																			active
																				? 'bg-gray-100 text-gray-900'
																				: 'text-gray-700',
																			'block px-4 py-2 text-sm text-left'
																		)}>
																		Edit
																	</a>
																)}
															</Menu.Item>
														)}
														{window.localStorage.getItem('email') ===
															item.user?.email && (
															<Menu.Item>
																{({ active }) => (
																	<button
																		onClick={() => {
																			handleDelete(item.id);
																		}}
																		type="submit"
																		className={classNames(
																			active
																				? 'bg-gray-100 text-gray-900'
																				: 'text-gray-700',
																			'block w-full px-4 py-2 text-left text-sm'
																		)}>
																		Delete
																	</button>
																)}
															</Menu.Item>
														)}
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
									)}
									<p>{item.numViews} Views</p>
									<p>{item.likes.length === 0 ? 0 : item.likes.length} Suka</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default HomePage;

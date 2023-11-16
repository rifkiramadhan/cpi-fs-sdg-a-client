import React, { useEffect, useState, useReducer } from 'react';
import '../../../index.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/users/usersSlices';
import { fetchApi } from '../../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie'

export const cookies = new Cookies(null, {maxAge: 12*60*60})
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [ingatSaya, setIngatSaya] = useState(false);

	if (window.localStorage.token || cookies.get('token')) {
		window.location.href = '/';
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);

		const dataValidation = await fetchApi('/users/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		if (dataValidation.response.OK) {
			if (!ingatSaya) {
				toast.info("'Ingat saya' tidak dicentang", {
					position: 'top-right',
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
			setTimeout(() => {
				setLoading(false);
				window.localStorage.setItem('email', dataValidation.data?.email);
				window.localStorage.setItem(
					'fullName',
					dataValidation.data?.firstName + ' ' + dataValidation.data?.lastName
				);
				if(!ingatSaya){
					cookies.set('token', dataValidation.data?.token)
				}else{
					window.localStorage.setItem('token', dataValidation.data?.token);
				}
				window.localStorage.setItem('id', dataValidation.data?._id);
				window.location.href = '/';
			}, 2500);
		} else {
			setLoading(false);
			setError(dataValidation.data?.message);
		}
	};

	useEffect(() => {
	}, [ingatSaya]);

	return (
		<div className="bg-blue-100 h-screen font-['poppins'] flex justify-center items-center">
			<div className="bg-white w-[980px] h-[600px] rounded-lg">
				<div className="flex justify-between place-items-center">
					<div className="w-1/2 ml-5">
						<div className="relative">
							<div className="text-center py-10 w-full">
								<h3 className="absolute h-full top-0  flex items-center">
									<a href="/#">
										<IoIosArrowBack className="text-4xl ml-5" />
									</a>
								</h3>
								<p className="font-bold">WellNest</p>
							</div>
						</div>
						<h1 className="text-3xl mb-4 font-bold text-center">
							Login Member Area
						</h1>
						<p className="text-center font-bold text-[13px] mb-5">
							Masukkan Email dan Password anda untuk masuk
						</p>
						{loading && (
							<p className="text-center mb-5 text-blue-500">Loading...</p>
						)}
						{error && <p className="text-center mb-5 text-red-500">{error}</p>}
						<form
							className="text-center mx-16"
							onSubmit={(e) => handleSubmit(e)}>
							<input
								onChange={(e) => setEmail(e.target.value)}
								name="email"
								className="p-1 w-full border-b border-neutral-400 mb-5"
								type={'text'}
								placeholder="Email"
								value={email}
							/>
							<input
								name="password"
								className="p-1 w-full border-b border-neutral-400 mb-5"
								type={'password'}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								value={password}
							/>
							<div className=" flex justify-between mb-7">
								<div className="flex items-center inline">
									<input
										type={'checkbox'}
										name="ingatSaya"
										value={'0'}
										onChange={(e) => setIngatSaya(e.target.checked)}
									/>
									<p className="text-sm ml-1">Ingat saya</p>
								</div>
								<p>
									<a href="/#" className="text-sm">
										Lupa password
									</a>
								</p>
							</div>
							<button
								type="submit"
								name="submit"
								className="bg-blue-200 p-1 w-full rounded font-bold text-[20px]">
								Login
							</button>
						</form>
						<div className="text-center mt-14">
							<p className="mb-2">
								Belum punya akun?{' '}
								<a href="/register" className="font-bold">
									Daftar di sini
								</a>
							</p>
							<div className="flex px-20 justify-evenly w-full mt-8">
								<img width={'30px'} src="fb.png" />
								<img width={'30px'} src="ig.png" />
								<img width={'30px'} src="tele.png" />
								<img width={'30px'} src="tiktok.png" />
								<img width={'30px'} src="yt.png" />
								<img width={'30px'} src="wa.png" />
							</div>
						</div>
					</div>
					<div className="w-5"></div>
					<div className="w-1/2 ">
						<div className="px-15 text-center">
							<img className="h-80 m-auto" src="7317079.jpg" alt="img doctor" />
							<h1 className="font-bold text-3xl mb-3">WellNest Forum</h1>
							<p className="text-sm">
								Tempatnya mencari informasi, berdiskusi, dan berkontribusi
								tentang serba serbi kesehatan dan medis
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

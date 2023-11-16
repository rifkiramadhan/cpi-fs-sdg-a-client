import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchApi } from '../../../utils/api';

const Register = () => {
	const [register, setRegister] = useState({});
	const [errors, setErrors] = useState({});

	let registerApi;

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(register);
		registerApi = await fetchApi('/users/register', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(register),
		});
		console.log(registerApi);

		setErrors({
			errorsData: { ...registerApi.data?.errors },
			message: !registerApi.data?.errors && registerApi.data?.message,
		});

		if (register.konfirmasiPassword !== register.password) {
			setErrors({
				...errors,
				errorsData:
					{...errors.errorsData, konfirmasiPassword: { message: 'Konfirmasi password is not suit' },}
			});
		}
		console.log(registerApi.data.id);

		if (registerApi.data.id) {
			window.location.href = '/login';
		}
	};

	console.log(errors);

	return (
		<div className="bg-blue-100 h-fit font-['poppins']">
			<div className="h-10"></div>
			<div className="bg-white w-1/3 min-w-[500px] text-center  rounded-lg m-auto pb-16">
				<div className="relative">
					<div className="text-center py-8 w-full">
						<h3 className="absolute h-full top-0  flex items-center">
							<a href="/#">
								<IoIosArrowBack className="text-4xl ml-5" />
							</a>
						</h3>
						<p className="font-bold">WellNest</p>
					</div>
				</div>
				<h1 className="font-bold text-3xl mb-3">Buat Akun</h1>
				<p className="font-bold text-sm mb-7 ">Isi data anda untuk mendaftar</p>
				<p className="text-red-500">{errors?.message}</p>
				<form className="w-2/3 mx-auto" onSubmit={(e) => handleSubmit(e)}>
					<input
						placeholder="Username"
						type={'text'}
						name="username"
						value={register.username}
						onChange={(e) => {
							setRegister({
								...register,
								username: e.target.value,
							});
						}}
						className="w-full p-1 w-full border-b border-black mb-6"></input>
					<p className="text-left -mt-4 text-xs mx-1 text-red-500 mb-1">
						{errors?.errorsData?.username?.message}
					</p>
					<input
						placeholder="Nama Depan"
						type={'text'}
						name="namaDepan"
						value={register.firstName}
						onChange={(e) => {
							setRegister({
								...register,
								firstName: e.target.value,
							});
						}}
						className="w-full p-1 w-full border-b border-black mb-6"></input>
					<p className="text-left -mt-4 text-xs mx-1 text-red-500 mb-1">
						{errors?.errorsData?.firstName?.message}
					</p>
					<input
						placeholder="Nama Belakang"
						type={'text'}
						name="namaBelakang"
						value={register.lastName}
						onChange={(e) => {
							setRegister({
								...register,
								lastName: e.target.value,
							});
						}}
						className="w-full p-1 w-full border-b border-black mb-6"></input>
					<p className="text-left -mt-4 text-xs mx-1 text-red-500 mb-1">
						{errors?.errorsData?.lastName?.message}
					</p>
					<input
						placeholder="Email"
						type={'email'}
						name="email"
						value={register.email}
						onChange={(e) => {
							setRegister({
								...register,
								email: e.target.value,
							});
						}}
						className="w-full p-1 w-full border-b border-black mb-b mb-6"></input>
					<p className="text-left -mt-4 text-xs mx-1 text-red-500 mb-1">
						{errors?.errorsData?.email?.message}
					</p>
					<input
						placeholder="Password"
						type={'password'}
						name="password"
						value={register.password}
						onChange={(e) => {
							setRegister({
								...register,
								password: e.target.value,
							});
						}}
						className="w-full p-1 w-full border-b border-black mb-6"></input>
					<p className="text-left -mt-4 text-xs mx-1 text-red-500 mb-1">
						{errors?.errorsData?.password?.message}
					</p>
					<input
						placeholder="Konfirmasi Password"
						type={'password'}
						name="konfirmasiPassword"
						value={register?.konfirmasiPassword}
						onChange={(e) => {
							setRegister({
								...register,
								konfirmasiPassword: e.target.value,
							});
						}}
						className="w-full p-1 w-full border-b border-black mb-6"></input>
					<p className="text-left -mt-4 text-xs mx-1 text-red-500 mb-1">
						{errors?.errorsData?.konfirmasiPassword?.message}
					</p>

					<button
						type="submit"
						className="w-full bg-blue-200 p-1 rounded-md font-bold text-lg text-14 my-7">
						Daftar
					</button>
				</form>
				<p className="mb-2 text-sm">
					Sudah punya akun?{' '}
					<a href="/login" className="font-bold">
						Masuk di sini
					</a>
				</p>
			</div>
			<div className="h-10"></div>
		</div>
	);
};

export default Register;

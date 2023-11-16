import React from 'react';
import './../../index.css';
import { cookies } from '../Users/Login/Login';

const Navbar = () => {
	return (
		<div className="bg-white font-['Poppins'] z-40 sticky top-0 drop-shadow">
			<nav className="mx-[15%] h-16 flex items-center">
				<div className="flex items-center">
					<h1 className="text-2xl text-center px-4 font-black">WellNest</h1>
				</div>
				<div className="flex justify-between w-full ml-5 font-medium">
					<div className="">
						<ul className="">
							<li className="inline mr-5"><a href='/'>Forum</a></li>
							<li className="inline mr-5"><a href='/aboutUs'>About Us</a></li>
							<li className="inline"><a href='/contact'>Contact</a></li>
						</ul>
					</div>
					{console.log(cookies.get('token'))}
					{(!window.localStorage.token && !cookies.get('token')) ? <div className="">
						<ul className="">
							<li className="inline mr-8">
								<a href='/register'>Daftar</a>
							</li>
							<li className="inline">
								<button className="bg-blue-100 px-4 py rounded-full py-[2px]">
									<a href="/login">Masuk</a>
								</button>
							</li>
						</ul>
					</div> : 
					<div className="">
					<ul className="">
						<li className="inline mr-8">
						</li>
						<li className="inline mr-8">
							<button className="bg-blue-100 px-4 py rounded-full py-[2px]">
								<a href="/discussion/add">Buat Diskusi</a>
							</button>
						</li>
						<li className="inline mr-8">
							<button className="bg-blue-100 px-4 py rounded-full py-[2px]">
								<a href="/categories">Kategori</a>
							</button>
						</li>
						<li className="inline">
							<button className="bg-blue-100 px-4 py rounded-full py-[2px]">
								<a href="/logout">Keluar</a>
							</button>
						</li>
					</ul>
				</div>
					}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

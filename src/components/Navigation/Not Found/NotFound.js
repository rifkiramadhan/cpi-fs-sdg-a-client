import react from 'react';

const NotFound = () => {
	return (
		<div className='bg-[#D8E7FF] h-screen w-full place-content-center font-["poppins"]'>
			<img
				src="404.png"
				className="w-[80%] max-w-[700px] m-auto pt-10"
				alt="404 Error - 404 Not Found Png@pngkey.com"></img>
			<div className='text-center'>
			<p className="font-bold font-sm">Halaman tidak tersedia</p>
				<a className="text-center m-auto" href="/">
					<button className="bg-[#a5c8FF] py-2 px-4 rounded-full text-sm mt-3">
						Ke Homepage
					</button>
				</a>
			</div>
		</div>
	);
};

export default NotFound;

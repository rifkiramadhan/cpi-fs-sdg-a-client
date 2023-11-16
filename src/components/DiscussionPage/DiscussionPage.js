import React, { useEffect, useState } from 'react';
import iconArrowLeft from '../../assets/icons/arrowLeft.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsShareFill } from 'react-icons/bs';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { fetchApi } from '../../utils/api';
import { useCallback } from 'react';
import moment from 'moment';
import {toast} from 'react-toastify';
import Cookies from 'universal-cookie';
import { cookies } from '../Users/Login/Login';

const DiscussionPage = () => {
	const { id } = useParams();
	const [dataPostDetail, setDataPostDetail] = useState({});
	const [isLike, setIsLike] = useState();

	const getPostDetail = useCallback(async () => {
		const dataValidation = await fetchApi(`/posts/${id}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (dataValidation.response.OK) {
			setDataPostDetail(dataValidation.data.post);
		} else {
			alert('gagal buat kategori');
		}
	}, [id]);
	const isUserLike =
		dataPostDetail.likes &&
		dataPostDetail.likes.includes(window.localStorage.getItem('id'));

	const handleLike = async () => {
		const likeToggle = await fetchApi('/posts/likes', {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${window.localStorage.token || cookies.get('token')}`,
			},
			body: JSON.stringify({
				_id: dataPostDetail._id,
			}),
		});
		await getPostDetail();
	};

	const isUserDislike =
		dataPostDetail.disLikes &&
		dataPostDetail.disLikes.includes(window.localStorage.getItem('id'));

		console.log(dataPostDetail)

	const handleDislike = async () => {
		const dislikeToggle = await fetchApi('/posts/dislikes', {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${window.localStorage.token || cookies.get('token')}`,
			},
			body: JSON.stringify({
				_id: dataPostDetail._id,
			}),
		});
		await getPostDetail();

	};

	useEffect(() => {
		getPostDetail();
	}, [getPostDetail]);
	const navigate = useNavigate();

	return (
		<div className="pt-5 px-44 bg-[#D8E7FF] h-full">
			<span className="font-bold text-xl flex gap-4 items-center">
				<img
					src={iconArrowLeft}
					alt="arrowleft"
					className="w-2 cursor-pointer"
					onClick={() => {
						navigate('/');
					}}
				/>{' '}
				Forum : {dataPostDetail.title}
			</span>

			<div className="mt-9 h-full bg-white shadow-md py-7 px-7 flex flex-col rounded-2xl">
				<div className="flex justify-start">
					<div className="flex gap-4">
						<div className="w-14 h-14 rounded-full bg-slate-300 flex justify-center items-center">
							<CiUser size={30} />
						</div>
						<div className="flex flex-col">
							<span className="text-sm">
								Di Forum: <strong>{dataPostDetail?.category?.title}</strong>
							</span>
							<strong className="text-base">
								{dataPostDetail?.user?.firstName}
							</strong>
							<span className="text-sm">
								{moment(dataPostDetail.created_at).format('LL')}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-6 mt-6">
					<h2 className="font-semibold text-4xl">{dataPostDetail.title}</h2>
					<div
						dangerouslySetInnerHTML={{ __html: dataPostDetail.description }}
					/>
					<div className="flex gap-16 justify-center w-full">
						<button onClick={()=>{
							handleLike()}}>
							<div className="flex flex-col gap-2">
								{isUserLike ? (
									<span className="w-16 h-16 rounded-lg bg-[#D8E7FF] flex justify-center items-center text-blue-500">
										<AiFillLike size={30} />
									</span>
								) : (
									<span className="w-16 h-16 rounded-lg bg-[#D8E7FF] flex justify-center items-center">
										<AiFillLike size={30} />
									</span>
								)}
								<p>{dataPostDetail?.likes?.length} Suka</p>
							</div>
						</button>

						<button onClick={handleDislike}>
							{isUserDislike ? (
								<div className="flex flex-col gap-2">
									<span className="w-16 h-16 rounded-lg bg-[#D8E7FF] flex justify-center items-center text-blue-500">
										<AiFillDislike size={30} />
									</span>
									<p>{dataPostDetail?.disLikes?.length} Tidak Suka</p>
								</div>
							) : (
								<div className="flex flex-col gap-2">
									<span className="w-16 h-16 rounded-lg bg-[#D8E7FF] flex justify-center items-center">
										<AiFillDislike size={30} />
									</span>
									<p>{dataPostDetail?.disLikes?.length} Tidak Suka</p>
								</div>
							)}
						</button>
						<div className="flex flex-col gap-2">
							<span className="w-16 h-16 rounded-lg bg-[#D8E7FF] flex justify-center items-center">
								<BiSolidCommentDetail size={30} />
							</span>
							<p>Komentar</p>
						</div>
						<div className="flex flex-col gap-2">
							<span className="w-16 h-16 rounded-lg bg-[#D8E7FF] flex justify-center items-center">
								<BsShareFill size={30} />
							</span>
							<p>Bagikan</p>
						</div>
					</div>
				</div>
				<div className="mt-12">
					<div className="flex py-12 border-t-2">
						<div className="flex gap-4 w-full">
							<div className="w-14 h-14 rounded-full bg-slate-300 flex justify-center items-center">
								<CiUser size={30} />
							</div>
							<textarea
								className="w-full border-[2px] p-2"
								rows={10}></textarea>
						</div>
					</div>
					<div className="flex py-12 border-t-2 flex-col gap-5">
						<div className="flex gap-4 w-full justify-between items-center">
							<div className="flex gap-2">
								<div className="w-14 h-14 rounded-full bg-slate-300 flex justify-center items-center">
									<CiUser size={30} />
								</div>
								<div className="flex flex-col justify-center">
									<strong className="text-base">User01</strong>
									<span className="text-sm">9 September 2023</span>
								</div>
							</div>
							<span>#1</span>
						</div>
						<p>
							Donec vel consectetur lectus, ut imperdiet turpis. Etiam dui
							ipsum, lacinia eu dui vel, tincidunt interdum nibh. Donec in
							tincidunt nibh, non malesuada eros. Sed elementum auctor erat
							vitae maximus. Quisque nec iaculis leo. Suspendisse interdum neque
							volutpat odio imperdiet dictum. Duis fringilla et lectus eget
							tincidunt. Quisque mattis tempus malesuada. Suspendisse at arcu id
							tellus cursus semper id at mi.
						</p>
					</div>
					<div className="flex py-12 border-t-2 border-b-2 flex-col gap-5">
						<div className="flex gap-4 w-full justify-between items-center">
							<div className="flex gap-2">
								<div className="w-14 h-14 rounded-full bg-slate-300 flex justify-center items-center">
									<CiUser size={30} />
								</div>
								<div className="flex flex-col justify-center">
									<strong className="text-base">User12</strong>
									<span className="text-sm">9 September 2023</span>
								</div>
							</div>
							<span>#2</span>
						</div>
						<p>
							Donec vel consectetur lectus, ut imperdiet turpis. Etiam dui
							ipsum, lacinia eu dui vel, tincidunt interdum nibh. Donec in
							tincidunt nibh, non malesuada eros. Sed elementum auctor erat
							vitae maximus. Quisque nec iaculis leo. Suspendisse interdum neque
							volutpat odio imperdiet dictum. Duis fringilla et lectus eget
							tincidunt. Quisque mattis tempus malesuada. Suspendisse at arcu id
							tellus cursus semper id at mi.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DiscussionPage;

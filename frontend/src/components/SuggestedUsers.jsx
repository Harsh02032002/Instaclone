import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { useGetSuggestedUsers } from '@/hooks/useGetSuggestedUsers';

const SuggestedUsers = () => {
    const dispatch = useDispatch();
    const { suggestedUsers } = useSelector(store => store.auth);

    useGetSuggestedUsers(); // fetch suggested users

    const handleFollow = async (userId) => {
        try {
            const res = await axios.post(
                `https://instaclone-axnu.onrender.com/api/v1/user/follow/${userId}`,
                {},
                { withCredentials: true }
            );
            if (res.data.success) {
                // refetch users
                dispatch({ type: 'auth/setSuggestedUsers', payload: suggestedUsers.map(user => {
                    if(user._id === userId){
                        return {...user, isFollowing: !user.isFollowing};
                    }
                    return user;
                })});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    const isFollowing = user.followers?.includes(user._id);
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user._id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span
                                onClick={() => handleFollow(user._id)}
                                className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuggestedUsers;

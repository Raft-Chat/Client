import { FiEdit2 } from 'react-icons/fi'
import { BsFillSendPlusFill, BsPlusCircle } from 'react-icons/bs'
import { CiHashtag } from 'react-icons/ci'
import { ImageCard } from '../../components'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from './AccountProvider'
import { gql, useMutation } from '@apollo/client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { TbMoodEmpty } from 'react-icons/tb'

const MUTATION = gql`
mutation Mutation($email: String!, $payload: UpdateUser!) {
  response:updateUserByEmail(email: $email, payload: $payload)
}
`
const FOLLOW_MUTATION = gql`
mutation Mutation($payload: FollowInput!) {
  follow(payload: $payload)
}
`

const UNFOLLOW_MUTATION = gql`
mutation Mutation($payload: FollowInput!) {
  unFollow(payload: $payload)
}
`

const AccountPage = () => {
    const { data, user, viewUser, refetch }: any = useContext(AccountContext)
    const [formData, setFormData] = useState({
        name: data?.name,
        tagLine: data?.tagLine,
        avatar: data?.avatar,
        posts: data?.posts ?? [],
        followers: data?.followers.length ?? 0,
        followings: data?.followings.length ?? 0,
    })
    const [selectedMenu, setSelectedMenu] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [updateUser] = useMutation(MUTATION)
    const [followUser] = useMutation(FOLLOW_MUTATION)
    const [UnFollowUser] = useMutation(UNFOLLOW_MUTATION)
    const [isFollowed, setIsFollowed] = useState(false)
    const Id = localStorage.getItem('user-id')
    const followId = data?._id
    const navigate = useNavigate()

    const handleFollow = async () => {
        followUser({
            variables: {
                payload: { Id, followId }
            }
        })
            .then(() => {
                refetch()
            })
            .catch(err => {
                toast.error(err.message, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            })
        setIsFollowed(true)
    }

    const handleUnFollow = async () => {
        UnFollowUser({
            variables: {
                payload: { Id, followId }
            }
        })
            .then(() => {
                refetch()
            })
            .catch(err => {
                toast.error(err.message, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            })
        setIsFollowed(false)
    }

    const handleChange = (e: any) => {
        const label = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [label]: value
        })
    }

    const handleUpdate = async () => {
        updateUser({
            variables: {
                email: user?.email,
                payload: {
                    name: formData?.name,
                    avatar: formData?.avatar,
                    tagLine: formData?.tagLine
                }
            }
        })
            .then(() => {
                toast.success('Updated !', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                setIsEdit(false)
            }
            )
            .catch(() => {
                toast.error('Update failed!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            });
    }

    useEffect(() => {
        const isSameUser = data?._id === Id
        if (isSameUser) {
            navigate('/account')
        }
    }, [data])

    useEffect(() => {
        const isFollowed = data?.followers.filter((val: any) => val === localStorage.getItem('user-id'))
        if (isFollowed.length !== 0) {
            setIsFollowed(true)
        }
        const path = window.location.pathname.split('/')[1]
        if (path === 'account') {
            refetch()
        }

    }, [])

    if (viewUser) {
        return (
            <>
                <ToastContainer />
                <div className='flex flex-col flex-grow justify-between gap-10'>

                    {/* Top */}
                    <div className="flex flex-col justify-center items-center">
                        {/* Avatar */}
                        <div>
                            <label htmlFor='updateImg'>
                                <div className="avatar">
                                    <div className="w-48 rounded-full">
                                        <img src={formData?.avatar} />
                                    </div>
                                </div>
                            </label>
                            <input disabled multiple={false} className='hidden' type='file' accept='image/*' id='updateImg' />
                        </div>

                        {/* User Details */}
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <div className='flex gap-5'>
                                <h2>Followers: {data?.followers.length ?? 0}</h2>
                                <h2>Following: {data?.followings.length ?? 0}</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-3'>
                                <h2 className="text-4xl">{formData?.name}</h2>
                                <h2 className='text-md md:text-lg text-gray-500'>{formData?.tagLine}</h2>
                            </div>
                            <div className='mt-3'>
                                {
                                    isFollowed ?
                                        <button onClick={handleUnFollow} className='btn btn-active'>UnFollow</button>
                                        :
                                        <button onClick={handleFollow} className='btn btn-primary'>Follow</button>
                                }
                            </div>
                        </div>
                    </div>


                    {/* Middle */}
                    <div className='flex flex-wrap gap-10 justify-center items-center'>
                        <button onClick={() => setSelectedMenu(true)} className='flex justify-center items-center gap-1'>
                            <BsFillSendPlusFill />
                            <h2 className={`${selectedMenu && 'underline underline-offset-4'}`}>POST</h2>
                        </button>
                    </div>


                    {/* Content */}
                    <div className='flex flex-wrap gap-3 justify-center'>
                        {formData.posts.length === 0 ?
                            <div className="flex flex-col mt-10 justify-center items-center gap-3">
                                <h2 className="text-lg">No Posts</h2>
                                <TbMoodEmpty className='text-4xl' />
                            </div>
                            :
                            formData?.posts.map((val: { picture: string }, index: number) => {
                                return (
                                    <ImageCard
                                        key={index}
                                        src={val?.picture}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <ToastContainer />
                <div className='flex flex-col flex-grow justify-between gap-10'>

                    {/* Top */}
                    <div className="flex flex-col justify-center items-center">
                        {/* Avatar */}
                        <div>
                            <label htmlFor='updateImg'>
                                <div className="avatar">
                                    <div className="w-48 rounded-full">
                                        <img src={formData?.avatar} />
                                    </div>
                                </div>
                            </label>
                            <input multiple={false} className='hidden' type='file' accept='image/*' id='updateImg' />
                        </div>

                        {/* User Details */}
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <div className='flex gap-5'>
                                <h2>Followers: {formData?.followers}</h2>
                                <h2>Following: {formData?.followings}</h2>
                            </div>
                            <div className='flex justify-center items-center gap-1'>
                                {isEdit ?
                                    <input
                                        onChange={handleChange}
                                        type='text'
                                        className='input input-primary'
                                        defaultValue={formData?.name}
                                        name='name'
                                    />
                                    :
                                    <>
                                        <h2 className="text-4xl">{formData?.name}</h2>
                                        <FiEdit2
                                            onClick={() => setIsEdit(!isEdit)}
                                            className='text-sm cursor-pointer'
                                        />
                                    </>
                                }

                            </div>

                            {isEdit &&
                                <input
                                    onChange={handleChange}
                                    type='text'
                                    className='input input-primary'
                                    name='tagLine'
                                    value={formData?.tagLine}
                                />}
                            {!isEdit && <h2 className='text-md md:text-lg text-gray-500'>{formData?.tagLine}</h2>}
                            {isEdit &&
                                <button
                                    onClick={handleUpdate}
                                    className='btn btn-secondary btn-sm'>Update</button>}
                        </div>
                    </div>


                    {/* Middle */}
                    <div className='flex flex-wrap gap-10 justify-center items-center'>
                        <button onClick={() => setSelectedMenu(true)} className='flex justify-center items-center gap-1'>
                            <BsFillSendPlusFill />
                            <h2 className={`${selectedMenu && 'underline underline-offset-4'}`}>POST</h2>
                        </button>
                        <button onClick={() => setSelectedMenu(false)} className='flex justify-center items-center gap-1'>
                            <CiHashtag />
                            <h2 className={`${!selectedMenu && 'underline underline-offset-4'}`}>TAGGED</h2>
                        </button>
                    </div>


                    {/* Content */}
                    <div>
                        {selectedMenu ?
                            <div className='flex flex-wrap gap-3 justify-center'>
                                {formData.posts.length === 0 ?
                                    <div className="flex flex-col mt-10 justify-center items-center gap-3">
                                        <Link to={'/post'}>
                                            <BsPlusCircle
                                                className='text-2xl cursor-pointer'
                                            />
                                        </Link>
                                        <h2 className="text-lg">Click Here To Add Post</h2>
                                    </div>
                                    :
                                    formData?.posts.map((val: { picture: string }, index: number) => {
                                        return (
                                            <ImageCard
                                                key={index}
                                                src={val?.picture}
                                            />
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className='flex justify-center items-center'>
                                <h2>Feature Coming Soon...</h2>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default AccountPage
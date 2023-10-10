import { BsPlusCircle } from "react-icons/bs"
import { PostCard } from "../../components"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"


const MUTATION = gql`
mutation Mutation($payload: CreatePost!) {
  message:createPost(payload: $payload)
}
`

const index = () => {
    const navigate = useNavigate()
    const [isPostVisible, setIsPostVisible] = useState(true)
    const [createPost] = useMutation(MUTATION)

    const handlePost = async ({ picture, title, email, mentions }: { picture: string, title: string, email: string, account: {}, mentions: {} }) => {
        if (!title) {
            toast.error('Title Required', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
        else if (!email) {
            toast.error('Email Required', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }

        else {
            createPost({
                variables: {
                    payload: {
                        email,
                        picture,
                        title,
                        mentions
                    }
                }
            })
                .then((res) => {
                    const message = (res?.data?.message)
                    toast.success(message, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    setTimeout(() => {
                        navigate('/')
                    }, 500);
                })
                .catch((err) => {
                    toast.error(err.message, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                })
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="flex flex-grow h-[80vh] justify-center items-center">
                {
                    isPostVisible ?
                        <PostCard
                            handlePost={handlePost}
                        />
                        :
                        <div className="flex flex-col items-center gap-3">
                            <BsPlusCircle
                                onClick={() => setIsPostVisible(true)}
                                className='text-2xl cursor-pointer'
                            />
                            <h2 className="text-lg">Click Here To Add Post</h2>
                        </div>
                }
            </div>
        </>
    )
}

export default index
import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { VscMention } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"

const Query = gql`
query ($email: String!) {
  data:getUserByEmail(email: $email) {
    _id
    name
    avatar
  }
}
`

const TAG_USER_QUERY = gql`
  query Query($name: String!) {
    result:getUserByName(name: $name) {
      avatar
      name
      email
    }
  }
`

const index = () => {
    const { logout, user } = useAuth0()
    const navigate = useNavigate()
    const [searchUser] = useLazyQuery(TAG_USER_QUERY)
    const { data: userData } = useQuery(Query, {
        variables: { email: user?.email }
    })
    const [account, setAccount] = useState({
        picture: userData?.data?.avatar,
        name: userData?.data?.name,
        _id: userData?.data?._id
    })
    const [suggested, setSuggested] = useState([])
    const [isToggle, setIsToggle] = useState(false)


    useEffect(() => {
        setAccount({ ...account, picture: userData?.data?.avatar, name: userData?.data?.name })
        localStorage.setItem('user-name',  userData?.data?.name)
        localStorage.setItem('user-id', userData?.data?._id)
    }, [userData])


    const handleSuggestions = (e: { target: { value: string } }) => {
        const name = e.target.value
        if (name) {
            searchUser({
                variables: {
                    name
                }
            })
                .then((res) => {
                    const { result } = res.data
                    setSuggested(result)
                })

        }
    }

    const handleSuggestionClick = (email: string) => {
        navigate('/account-details', {
            state: { email }
        })
        setSuggested([])
    }

    const handleLogout = () =>{
        localStorage.removeItem('user-name')
        localStorage.removeItem('user-id')
        logout()
    }

    return (
        <div className="p-2 md:p-3 flex justify-between items-center  shadow-md">
            {/* Left */}
            <div className="flex justify-center items-center gap-1">
                <img
                    src={'/Logo.PNG'}
                    className="h-10 md:h-14"
                />
                <h2 className="text-xl md:text-2xl font-bold">Raft</h2>
            </div>

            {/* Middle */}
            <div>
                <div className="flex justify-center items-center relative">
                    <input
                        onChange={handleSuggestions}
                        className="border-b w-[50%] bg-transparent md:w-[100%] border-b-secondary pb-1 placeholder:text-sm outline-none"
                        placeholder="Search User"
                    />
                    <AiOutlineSearch />

                    {/* Suggestion Div */}
                    {
                        suggested.length !== 0 &&
                        <div className="absolute z-50 top-10 p-2 flex flex-col gap-3 bg-[rgba(000,000,000,.6)] h-40 rounded-b-lg overflow-scroll text-white w-96 mx-auto">
                            {
                                suggested.map((val: any, index: number) => {
                                    return (
                                        <div
                                            onClick={() => handleSuggestionClick(val?.email)}
                                            key={index} className="flex items-center cursor-pointer justify-between px-3 py-2 gap-4 rounded-md bg-[rgba(255,255,255,.8)] text-black">
                                            <div className="flex justify-center items-center gap-3">
                                                <img
                                                    src={val?.avatar}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                                <h2 className="text-xl">{val?.name}</h2>
                                            </div>
                                            <button className="text-3xl"><VscMention /></button>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    }
                </div>
            </div>


            {/* Right */}
            <div className="flex flex-col justify-center items-center">
                <div className="avatar relative tooltip tooltip-left tooltip-primary" data-tip={`Hi, ${account?.name}`}>
                    <div
                        onClick={() => setIsToggle(prev => !prev)}
                        className="w-12 md:w-14 rounded-full cursor-pointer">
                        <img
                            src={account?.picture}
                            alt={account?.name}
                        />
                    </div>
                </div>
                {
                    isToggle
                    &&
                    <button
                        onClick={handleLogout}
                        className='btn btn-error z-50 text-white absolute top-20 right-1'>
                        Logout
                    </button>
                }
            </div>
        </div>
    )
}

export default index
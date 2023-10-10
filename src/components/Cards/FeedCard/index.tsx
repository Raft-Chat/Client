import { AiOutlineHeart } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

type FeedCardProps = {
  picture: string,
  title: string,
  email: string
  account: {
    name: string,
    avatar: string
  }
  mentions: {
    name: string
  }[]
}

const index = ({ picture, title, account, email, mentions }: FeedCardProps) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/account-details', {
      state: { email }
    })
  }

  return (
    <div className="card shadow-md overflow-hidden flex flex-col border">
      {/* Image */}
      <div>
        <img
          className="w-full "
          src={picture}
        />
      </div>

      {/* Title & Tags */}
      <div className="flex justify-between items-center p-3">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="avatar ring-1 ring-secondary rounded-full ring-offset-2">
              <div className="w-6 h-6 rounded-full">
                <img src={account.avatar} />
              </div>
            </div>
            <button onClick={handleNavigate}>{account.name}</button>
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex text-sm gap-2 text-secondary">
            {mentions?.map((val, index) => {
              return <p key={index} className="cursor-pointer">@{val.name}</p>
            })}
          </div>
        </div>
        <AiOutlineHeart className='text-2xl cursor-pointer' />
      </div>
    </div>
  )
}

export default index
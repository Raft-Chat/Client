import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import { VscMention } from "react-icons/vsc"
import { FiEdit2 } from "react-icons/fi"
import { gql, useLazyQuery } from "@apollo/client"

const TAG_USER_QUERY = gql`
  query Query($name: String!) {
    result:getUserByName(name: $name) {
      avatar
      name
      _id
    }
  }
`

interface FormDataProps {
  picture: string,
  title: string,
  email: string,
  mentions: {}[]
}

const index = ({ handlePost }: { handlePost: any }) => {
  const { user } = useAuth0()
  const [searchUser] = useLazyQuery(TAG_USER_QUERY)
  const [formData, setFormData] = useState<FormDataProps>({
    picture: null ?? "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    title: '',
    email: user?.email ?? '',
    mentions: []
  })
  const [isUserSearch, setIsUserSearch] = useState(false)
  const [suggested, setSuggested] = useState([])

  const handleChange = (e: { target: { name: string, value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSuggestions = (e: { target: { value: string } }) => {
    const name = e.target.value
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

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <label htmlFor="uploadImage">
          <img
            className="cursor-pointer"
            src={formData.picture}
            alt="img"
          />
        </label>
        <input
          // defaultValue={}
          name="picture"
          onChange={handleChange}
          type="file"
          className="hidden"
          id="uploadImage"
        />
      </figure>

      <div className="card-body flex flex-col gap-5">
        <h2 className="card-title">
          <FiEdit2 />
          <input
            name="title"
            defaultValue={formData?.title}
            onChange={handleChange}
            placeholder="Leonardo Da-Vinci"
            className=" placeholder:text-[17px] bg-transparent placeholder:font-normal border-b-2 outline-none"
          />
        </h2>
        <textarea
          className="textarea textarea-lg textarea-secondary"
          placeholder="Feelings !"
        />
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="card-actions">
            {formData.mentions.length !== 0 &&
              formData?.mentions?.map((val: any, index: number) => {
                return <div key={index} className="badge badge-outline badge-secondary">@ {val?.name}</div>
              })}

            {/* Search Div For Mentions */}
            <div className="flex justify-center items-center gap-3">
              <>
                {isUserSearch &&
                  <div className="relative justify-center items-center flex">
                    <input
                      onChange={handleSuggestions}
                      className="badge badge-secondary text-white placeholder:text-white outline-none p-3"
                    />
                    <span className="absolute left-[-35px] font-semibold text-gray-500 badge badge-ghost">@</span>
                    {
                      suggested.length !== 0 &&
                      <div className="absolute top-7 p-2 ms-10 flex flex-col gap-3 bg-[rgba(000,000,000,.6)] h-40 rounded-b-lg overflow-scroll text-white w-96 mx-auto">
                        {
                          suggested.map((val: { avatar: string, name: string, _id: string }, index) => {
                            return (
                              <div
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    mentions: [...formData.mentions, { name: val.name, _id: val?._id, avatar: val?.avatar }]
                                  })
                                  setIsUserSearch(false)
                                  setSuggested([])
                                }}
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
                }
                <button
                  onClick={() => setIsUserSearch(prev => !prev)}
                  className="badge badge-secondary">{isUserSearch ? '-' : '+'}</button>
              </>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => handlePost(formData)} className="btn btn-secondary"><VscMention className='text-2xl' /> Post</button>
    </div>
  )
}

export default index
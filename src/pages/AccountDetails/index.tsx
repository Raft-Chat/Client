import { useLocation, useNavigate } from "react-router-dom"
import { AccountPage } from ".."
import { useEffect } from "react"

const index = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email


  useEffect(() => {
    if (!email) navigate('/')
  }, [])

  return (
    <AccountPage
      viewUser={true}
      email={email}
    />
  )
}

export default index
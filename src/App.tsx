import { useAuth0 } from "@auth0/auth0-react"
import Layout from "./pages/Layout"


function App() {
  const {user} = useAuth0()


  return (
    <Layout />
  )
}

export default App

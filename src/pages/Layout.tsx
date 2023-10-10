import { useAuth0 } from "@auth0/auth0-react"
import { AccountDetailsPage, AccountPage, FeedPage, LandingPage, PostPage } from "."
import { ErrorPage, Header, Loader, Navigation } from "../components"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <BrowserRouter>
      {isLoading ?
        <Loader />
        :
        isAuthenticated
          ?
          <div className="flex flex-col h-screen">
            < Header />
            <div className="my-3 mx-3 pb-20">
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/post" element={<PostPage />} />
                <Route path="/account" element={<AccountPage  />} />
                <Route path="/account-details/" element={<AccountDetailsPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>

            <Navigation />
          </div>
          :
          <LandingPage />
      }



    </BrowserRouter >
  )
}

export default Layout

import { gql, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { createContext } from 'react'
import { ErrorPage, Loader } from '../../components'
const AccountContext = createContext({})

const Query = gql`
query ($email: String!) {
  data:getUserByEmail(email: $email) {
    _id
    name
    posts {
      picture
    }
    avatar
    tagLine
    followers
    followings
  }
}
`

const AccountProvider = ({ children, viewUser = false, email }: any) => {
  const { user } = useAuth0()
  const { error, loading, data, refetch } = useQuery(Query, {
    variables: {
      email: email ?? user?.email
    }
  })

  if (error) {
    return <ErrorPage
      serverMessage={error?.message}
    />
  }

  else {
    return (
      <AccountContext.Provider value={{ ...data, user, viewUser, refetch }}>
        {loading ? <Loader /> : children}
      </AccountContext.Provider>
    )
  }
}

export default AccountProvider
export { AccountContext }
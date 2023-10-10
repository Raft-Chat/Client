import { gql, useQuery } from '@apollo/client'
import { createContext } from 'react'
import { ErrorPage, Loader } from '../../components'

const FeedContext = createContext({})

const Query = gql`
query Query {
  result:getPosts {
    title
    picture
    email
    account {
      name
      avatar
    }
    mentions{
      name
    }
  }
}
`

const FeedProvider = ({ children }: any) => {
  const { error, loading, data, refetch } = useQuery(Query)

  if (error) {
    return <ErrorPage
      serverMessage={error?.message}
    />
  }

  else {
    return (
      <FeedContext.Provider value={{ ...data, refetch }}>
        {loading ? <Loader /> : children}
      </FeedContext.Provider>
    )
  }
}

export default FeedProvider
export { FeedContext }
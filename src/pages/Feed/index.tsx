import FeedPage from "./FeedPage"
import FeedProvider from "./FeedProvider"

const index = () => {
  return (
    <FeedProvider>
      <FeedPage />
    </FeedProvider>
  )
}

export default index
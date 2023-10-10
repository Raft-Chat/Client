import AccountProvider from './AccountProvider'
import AccountPage from './AccountPage'

type AccountPageProps = {
  viewUser?: boolean,
  email?: string
}

const index = ({ viewUser, email }: AccountPageProps) => {
  return (
    <AccountProvider
      viewUser={viewUser}
      email={email}
    >
      <AccountPage />
    </AccountProvider>
  )
}

export default index
import { FeedCard } from '../../components'
import { useContext, useEffect } from 'react'
import { FeedContext } from './FeedProvider'

const AccountPage = () => {
    const { result: posts, refetch }: any = useContext(FeedContext)

    useEffect(() => {
        refetch()
    }, [])

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap flex-grow items-center justify-center gap-8">
            {
                posts.length === 0 ?
                    <div className='flex flex-col h-[80vh] justify-center items-center text-2xl gap-16'>
                        <h2 className='font-semibold'>Nothing to show !</h2>
                    </div>
                    :
                    posts.map((val: { picture: string, email: string, title: string, mentions: { name: string }[], account: { name: string, avatar: string } }, index: number) => {
                        return (
                            <FeedCard
                                mentions={val?.mentions}
                                email={val?.email}
                                key={index}
                                account={val?.account}
                                picture={val?.picture}
                                title={val?.title}
                            />
                        )
                    })
            }
        </div>
    )
}

export default AccountPage
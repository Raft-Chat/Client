import { AiOutlineHome } from 'react-icons/ai'
import { BsFillSendPlusFill } from 'react-icons/bs'
import { RxAvatar } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const index = () => {
    return (
        <div className="btm-nav">
            <NavLink to={'/'} activeClassName='active'>
                <AiOutlineHome className='text-xl' />
            </NavLink>
            <NavLink to={'/post'} activeClassName='active'>
                <BsFillSendPlusFill className='text-xl' />
            </NavLink>
            <NavLink to={'/account'} activeClassName='active'>
                <RxAvatar className='text-xl' />
            </NavLink>
        </div>
    )
}

export default index
import { AiOutlineHome } from 'react-icons/ai'
import { BsFillSendPlusFill } from 'react-icons/bs'
import { RxAvatar } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const index = () => {
    return (
        <div className="btm-nav">
            <NavLink to={'/'} className={({ isActive }) => isActive ? "active" : ""}>
                <AiOutlineHome className='text-xl' />
            </NavLink>
            <NavLink to={'/post'} className={({ isActive }) => isActive ? "active" : ""}>
                <BsFillSendPlusFill className='text-xl' />
            </NavLink>
            <NavLink to={'/account'} className={({ isActive }) => isActive ? "active" : ""}>
                <RxAvatar className='text-xl' />
            </NavLink>
        </div>
    )
}

export default index
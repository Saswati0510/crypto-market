import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ToggleTheme from './ToggleTheme'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { UserAuthStates } from '../context/AuthContext'

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const { user, logout } = UserAuthStates();
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div className='rounded-div flex items-center justify-between h-[60px] font-bold' >
            <Link to='/'><div className='text-2xl'>CryptoBase</div></Link>
            <div className='hidden md:block'>
                <ToggleTheme></ToggleTheme>
            </div>

            {user?.email ? (
                <div className='hidden md:block'>
                    <Link to='/account' className='p-4 hover:text-accent'>Account</Link>
                    <Link to='/' className='px-5 py-2 bg-button rounded-xl ml-2 text-btnText' onClick={handleLogout}>Sign Out</Link>
                </div>
            ) : (
                <div className='hidden md:block'>
                    <Link to='/signin' className='p-4 hover:text-accent'>Sign In</Link>
                    <Link to='/signup' className='px-5 py-2 bg-button rounded-xl ml-2 text-btnText'>Sign Up</Link>
                </div>
            )}
            {/*  for mobile */}

            <div onClick={() => setMenu(!menu)} className='md:hidden cursor-pointer'>
                {!menu ? <AiOutlineMenu></AiOutlineMenu> : <AiOutlineClose></AiOutlineClose>}

            </div>
            <div className={menu ? 'fixed top-20 right-0 left-0 flex flex-col justify-between items-center w-full h-[90%] bg-primary ease-in duration-300 z-10  md:hidden' :
                'hidden'}>
                <ul className='w-full p-4'>
                    <li className='border-b py-6' onClick={() => setMenu(!menu)}><Link to='/'>Home</Link></li>
                    <li className='border-b py-6' onClick={() => setMenu(!menu)}>{user?.email ? (<Link to='/account'>Account</Link>) : (<Link to='/signin'>Account</Link>)}</li>
                    <li className='py-6' onClick={() => setMenu(!menu)}><ToggleTheme></ToggleTheme></li>
                </ul>
                {user?.email ? (<div className='flex flex-col w-full p-4'>
                    <Link to='/'>
                        <button className='w-full bg-button text-btnText rounded-xl my-2 p-3' onClick={() => {
                            setMenu(!menu);
                            handleLogout()
                        }}>Logout</button>
                    </Link>
                </div>) : (
                    <div className='flex flex-col w-full p-4'>
                        <Link to='/signin'>
                            <button className='w-full bg-primary text-primary rounded-xl my-2 p-3' onClick={() => setMenu(!menu)}>Sign In</button>
                        </Link>
                        <Link to='/signup'>
                            <button className='w-full bg-button text-btnText rounded-xl my-2 p-3' onClick={() => setMenu(!menu)}> Sign Up</button>
                        </Link>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Navbar
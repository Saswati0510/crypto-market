import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF, FaGithub, FaTiktok, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { UserAuthStates } from '../context/AuthContext'
import ToggleTheme from './ToggleTheme'

const Footer = () => {
    const { user } = UserAuthStates();
    return (
        <div className='rounded-div my-4 p-2'>
            <div className='flex items-start justify-between text-xs md:text-sm'>
                <div className='flex flex-col justify-between'>
                    <p className='font-semibold'>SUPPORT</p>
                    <p>HELP CENTER</p>
                    <p>CONTACT US</p>
                    <p>API STATUS</p>
                    <p>DOCUMENTATION</p>
                </div>
                <div className='flex flex-col justify-between text-xs md:text-sm'>
                    <p className='font-semibold'>INFO</p>
                    <p>ABOUT US</p>
                    <p>CAREERS</p>
                    <p>INVEST</p>
                    <p>LEGAL</p>
                </div>
                <div className='flex flex-col items-end justify-between h-full text-xs md:text-sm'>
                    <ToggleTheme></ToggleTheme>
                    <p className='font-medium'>Sign up for crypto news</p>
                    <div className='flex justify-center mt-2'>
                        {user?.email ? (null) : (<form>
                            <input type="text" placeholder='enter email' className='border rounded-lg p-1 mr-2 shadow-lg' />
                            <Link to='/signup'> <button className='bg-button rounded-lg p-1 text-btnText font-semibold'>Sign Up</button></Link>
                        </form>)}

                    </div>
                    <div className='flex justify-between items-center w-full mt-2 text-accent'>
                        <AiOutlineInstagram />
                        <FaTiktok />
                        <FaTwitter />
                        <FaFacebookF />
                        <FaGithub />
                    </div>

                </div>

            </div>
            <div className='text-sm font-medium text-center my-1 pt-2'>Powered by coingecko</div>
        </div>
    )
}

export default Footer
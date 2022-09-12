import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthStates } from '../context/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { signin } = UserAuthStates();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signin(email, password);
            navigate('/account');
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div className='min-h-[60vh]'>
            <div className='max-w-[400px] max-h-[600px] mx-auto my-auto mt-12 p-4'>
                <h2 className='font-bold text-2xl'>Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <div className='pt-4 text-lg font-medium'>
                        <label>Email</label>
                        <div className='relative'>
                            <input type="text" className='w-full shadow xl rounded-lg p-1 mt-2' onChange={(e) => setEmail(e.target.value)} />
                            <AiOutlineMail className='absolute right-2 top-4'></AiOutlineMail>
                        </div>
                    </div>
                    <div className='py-4 text-lg font-medium'>
                        <label>Password</label>
                        <div className='relative'>
                            <input type="Password" className='w-full shadow xl rounded-lg p-1 mt-2' onChange={(e) => setPassword(e.target.value)} />
                            <AiFillLock className='absolute right-2 top-4'></AiFillLock>
                        </div>
                    </div>
                    <button className='w-full bg-button text-btnText rounded-lg p-1 shadow-xl text-lg font-semibold'>Sign In</button>
                </form>
                <p className='mt-3 font-medium'>Don't have an account? <Link to='signup' className='text-accent'>Sign Up</Link></p>


            </div>
        </div>
    )
}

export default SignIn
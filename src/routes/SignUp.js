import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthStates } from '../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { signup } = UserAuthStates();
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(`running submit with ${email} and ${password}`)
        try {
            await signup(email, password);
            navigate('/signin')

        } catch (error) {
            alert(error.message);
        }

    }
    return (
        <div className='min-h-[55vh] pb-10'>
            <div className='max-w-[400px] max-h-[600px] mx-auto my-auto mt-10 p-2'>
                <h2 className='font-bold text-2xl'>Sign Up</h2>
                <form onSubmit={handlesubmit}>
                    <div className='pt-4 text-lg font-medium'>
                        <label>Email</label>
                        <div className='relative'>
                            <input type="text" className='w-full shadow xl rounded-lg p-1 mt-2' required onChange={(e) => setEmail(e.target.value)} />
                            <AiOutlineMail className='absolute right-2 top-4'></AiOutlineMail>
                        </div>
                    </div>
                    <div className='py-4 text-lg font-medium'>
                        <label>Password</label>
                        <div className='relative'>
                            <input type="Password" className='w-full shadow xl rounded-lg p-1 mt-2' required onChange={(e) => setPassword(e.target.value)} />
                            <AiFillLock className='absolute right-2 top-4'></AiFillLock>
                        </div>
                    </div>
                    <div className='text-lg font-medium'>
                        <label>Confirm Password</label>
                        <div className='relative'>
                            <input type="Password" className='w-full shadow xl rounded-lg p-1 mt-2' required />
                            <AiFillLock className='absolute right-2 top-4'></AiFillLock>
                        </div>
                    </div>
                    <button className='w-full bg-button text-btnText rounded-lg p-1 shadow-xl text-lg font-semibold mt-6'>Sign Up</button>
                </form>
                <p className='mt-3 font-medium'>Already have an account? <Link to='/signin' className='text-accent'>Sign In</Link></p>


            </div>
        </div>
    )
}

export default SignUp
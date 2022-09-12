import React, { useEffect, useState } from 'react'
import { UserAuthStates } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlineClose } from 'react-icons/ai';


const Account = () => {
    const { user, logout } = UserAuthStates();
    const [mycoins, setMycoins] = useState([]);
    const navigate = useNavigate()
    const coinPath = doc(db, 'users', `${user?.email}`)

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMycoins(doc.data()?.watchList)
        })
    }, [user.email]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    }

    const deleteCoin = async (toBeRemovedCoinId) => {
        const result = mycoins.filter((item) => item.id !== toBeRemovedCoinId)
        try {
            await updateDoc(coinPath, {
                watchList: result
            })

        } catch (error) {
            alert(error.message);
        }

    }


    return (
        <div>
            <div className='my-8 rounded-div'>
                <h2 className='font-bold text-2xl pb-4'>Account</h2>
                <div className='flex justify-between pb-4'>
                    <p>Welcome! {user?.email}</p>
                    <button className='border p-1 shadow-lg rounded-lg ' onClick={handleLogout}>Sign Out</button>
                </div>
            </div>
            <div className='rounded-div my-8 min-h-[40vh]'>
                <div>
                    <h1 className='text-2xl font-bold py-4'>Watch List</h1>
                    {mycoins?.length === 0 ? <p>You don't have any coins saved. Please save a coin to add it to your
                        watch list. <Link to='/' className='cursor-pointer text-accent'>Click here</Link>to search coins.</p> :
                        <table className='border-collapse w-full text-center'>
                            <thead>
                                <tr className='border-b'>
                                    <th className='pb-2'>Rank #</th>
                                    <th className='text-left pb-2'> Coin</th>
                                    <th className='pb-2'>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mycoins?.map((c) => (
                                    <tr key={c.id} className='h-[60px] overflow-hidden'>
                                        <td>{c.rank}</td>
                                        <td>
                                            <Link to={`/coin/${c.id}`}>
                                                <div className='flex justify-start items-center'>
                                                    <img src={c.image} alt={c.id} className='w-6 mr-2' />
                                                    <p className='mr-2'>{c.name}</p>
                                                    <p>{c.symbol.toUpperCase()}</p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <div className='flex justify-center items-center'>
                                                <AiOutlineClose
                                                    onClick={() => deleteCoin(c.id)}
                                                    className='cursor-pointer'
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>



                    }


                </div>
            </div>
        </div>
    )
}

export default Account
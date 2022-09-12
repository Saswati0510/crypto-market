import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { UserAuthStates } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const CoinItem = ({ coin }) => {
    const [isSaved, isSetSaved] = useState(false);
    const { user } = UserAuthStates();
    const coinPath = doc(db, 'users', `${user?.email}`)

    const saveCoin = async () => {
        if (user?.email) {
            isSetSaved(true);
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id: coin.id,
                    name: coin.name,
                    image: coin.image,
                    rank: coin.market_cap_rank,
                    symbol: coin.symbol
                })
            })

        } else {
            alert('please sign in to save a coin to your watchlist!')

        }


    }
    return (
        <tr className='w-full h-[80px] overflow-hidden border-b'>
            <td onClick={saveCoin}>{isSaved ? (<AiFillStar></AiFillStar>) : (<AiOutlineStar></AiOutlineStar>)}</td>
            <td>{coin.market_cap_rank}</td>
            <td>
                <Link to={`/coin/${coin.id}`}>
                    <div className='flex items-center'>
                        <img className='w-5 rounded-full mr-3' src={coin.image} alt={coin.id} />
                        <p className='hidden sm:table-cell'>{coin.name}</p>
                    </div>
                </Link>
            </td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td>{coin.price_change_24h > 0 ? (<p className='text-green-700'>{coin.price_change_24h.toFixed(1)}%</p>) : (<p className='text-red-700'>{coin.price_change_24h.toFixed(1)}%</p>)}</td>
            <td className='w-[180px] hidden md:table-cell'>${coin.total_volume.toLocaleString()}</td>
            <td className='w-[180px] hidden sm:table-cell'>${coin.market_cap.toLocaleString()}</td>
            <td>
                <Sparklines data={coin.sparkline_in_7d.price}>
                    <SparklinesLine color="teal" />
                </Sparklines>
            </td>
        </tr>
    )
}

export default CoinItem
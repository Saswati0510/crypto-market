import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Trending = () => {
    const [trending, setTrending] = useState([]);
    const trendingUrl = 'https://api.coingecko.com/api/v3/search/trending';

    useEffect(() => {
        axios.get(trendingUrl).then((res) => {
            console.log(res.data.coins)
            setTrending(res.data.coins);
        })

    }, [trendingUrl]);
    return (
        <div className='rounded-div my-10 py-4'>
            <div className='my-4 px-1'><h1 className='font-bold text-2xl'>Trending Coins</h1></div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-1' >
                {trending.map((tr, id) => (
                    <div key={id} className='flex justify-between items-center border shadow-xl rounded-xl p-2'>
                        <div className='flex items-center'>
                            <div>
                                <img className='w-10 mr-2 rounded-full' src={tr.item.small} alt={tr.item.id} />
                            </div>
                            <div className='flex flex-col justify-center'>
                                <p>{tr.item.name}</p>
                                <p>{tr.item.symbol}</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <img className='w-4 mr-2' src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="/" />
                            <p>{tr.item.price_btc.toFixed(7)}</p>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Trending
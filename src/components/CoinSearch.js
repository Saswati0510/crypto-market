import React, { useState } from 'react'
import CoinItem from './CoinItem';

const CoinSearch = ({ coins }) => {
    const [search, setSearch] = useState('');
    /* console.log(coins); */
    return (
        <div className='rounded-div my-2'>
            <div className='flex  flex-col md:flex-row justify-between text-center md:text-right pt-4 pb-6'>
                <h1 className='font-bold text-2xl my-2'>Search Crypto</h1>
                <form>
                    <input type="text" placeholder='search a coin' className='border border-input bg-primary w-full rounded-xl shadow-xl px-4 py-2' onChange={(e) => setSearch(e.target.value)} />
                </form>
            </div>

            {/*  build table */}
            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th></th>
                        <th className='px-4'>#</th>
                        <th className='text-left'>Coin</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>24hr</th>
                        <th className='hidden md:table-cell'>24hr Volume</th>
                        <th className='hidden sm:table-cell'>Market</th>
                        <th>Last 7 days</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.filter(
                        (c) =>
                            c.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            c.symbol.toLowerCase().includes(search.toLocaleLowerCase())
                    ).map((coin) => (<CoinItem key={coin.id} coin={coin}></CoinItem>))}
                </tbody>
            </table>
        </div>
    )
}

export default CoinSearch
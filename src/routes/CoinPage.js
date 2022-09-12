import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa'
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';

const CoinPage = () => {
    const [coin, setCoin] = useState({});
    /* to access the params from path */
    const params = useParams();

    const url =
        `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

    useEffect(() => {
        axios.get(url).then((response) => {
            setCoin(response.data);
            console.log(response.data);
        });
    }, [url]);
    return (
        <div className='rounded-div my-2' >

            <div className='mt-12 mb-6 flex'>
                <img src={coin.image?.large} alt='/' className='w-16 mr-6 items-center' />
                <div className='flex flex-col'>
                    <h2 className='font-bold text-2xl'>{coin?.name} Price</h2>
                    <p className='uppercase'>({coin.symbol} / USD)</p>
                </div>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
                <div>
                    <div className='flex justify-between'>
                        {coin.market_data?.current_price ? (
                            <p className='text-3xl font-bold'>${coin.market_data.current_price.usd.toLocaleString()}</p>
                        ) : null}
                        <p>7 Day</p>
                    </div>
                    <div>
                        <Sparklines data={coin.market_data?.sparkline_7d.price}>
                            <SparklinesLine color="teal" />
                        </Sparklines>

                    </div>
                    <div className='flex flex-col justify-center mt-4'>
                        <div className='flex justify-between p-1 my-4'>
                            <div>
                                <p>Market Cap</p>
                                {coin.market_data?.market_cap ? (<p className='font-medium'>${coin.market_data.market_cap.usd.toLocaleString()}</p>) : null}
                            </div>
                            <div>
                                <p>{`Volume (24h)`}</p>
                                {coin.market_data ? (<p className='font-medium'>${coin.market_data.high_24h.usd.toLocaleString()}</p>) : null}
                            </div>
                        </div>
                        <div className='flex justify-between p-1 my-4'>
                            <div>
                                <p>24h High</p>
                                {coin.market_data ? (<p className='font-medium'>${coin.market_data.high_24h.usd.toLocaleString()}</p>) : null}

                            </div>
                            <div>
                                <p>24h Low</p>
                                {coin.market_data ? (<p className='font-medium'>${coin.market_data.low_24h.usd.toLocaleString()}</p>) : null}

                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <div><h2 className='font-bold text-2xl'>Market Stats</h2></div>
                    <div className='mt-4'>
                        <div className='flex justify-between items-center py-4'>
                            <div>
                                <p>Market Rank</p>
                                <p className='font-medium'>{coin.market_cap_rank}</p>
                            </div>
                            <div>
                                <p>Hashing Algorithm</p>
                                <p className='font-medium'>{coin.hashing_algorithm}</p>
                            </div>
                            <div>
                                <p>Trust score</p>
                                <p className='font-medium'>{coin.liquidity_score}</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center py-4'>
                            <div>
                                <p>Price change (24h)</p>
                                {coin.market_data ? (
                                    <p className='font-medium'>
                                        {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                                    </p>
                                ) : null}
                            </div>
                            <div>
                                <p>Price change (7d)</p>
                                {coin.market_data ? (
                                    <p className='font-medium'>
                                        {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                                    </p>
                                ) : null}
                            </div>
                            <div>
                                <p>Price Change (14d)</p>
                                {coin.market_data ? (
                                    <p className='font-medium'>
                                        {coin.market_data.price_change_percentage_14d.toFixed(2)}%
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className='flex justify-between items-center py-4'>
                            <div>
                                <p>Price change (30d)</p>
                                {coin.market_data ? (
                                    <p className='font-medium'>
                                        {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                                    </p>
                                ) : null}
                            </div>
                            <div>
                                <p>Price change (60d)</p>
                                {coin.market_data ? (
                                    <p className='font-medium'>
                                        {coin.market_data.price_change_percentage_60d.toFixed(2)}%
                                    </p>
                                ) : null}
                            </div>
                            <div>
                                <p>Price Change (1yr)</p>
                                {coin.market_data ? (
                                    <p className='font-medium'>
                                        {coin.market_data.price_change_percentage_1y.toFixed(2)}%
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-evenly items-center my-4 text-accent pt-3'>
                        <FaTwitter></FaTwitter>
                        <FaFacebook></FaFacebook>
                        <FaGithub></FaGithub>
                        <FaReddit></FaReddit>
                    </div>
                </div>
            </div>

            <div className='my-10'>
                <div><h1 className='font-bold text-2xl pt-5'>About {coin?.name} </h1></div>
                <div className='mt-4'>
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''), }} ></p>
                </div>
            </div>
        </div>


    )
}

export default CoinPage


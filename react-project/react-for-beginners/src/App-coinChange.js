import Button from "./Button";
import styles from "./App.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { func } from "prop-types";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [money, setMoney] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [countCoin, setCountCoin] = useState(0);

    const handleSelectChange = (event) => {
        const coinId = event.target.value;
        const selectedCoin = coins.find((coin) => coin.id === coinId);
        setSelectedCoin(selectedCoin);
    };

    const onChange = (event) => {
        setMoney(event.target.value);
    };
    const onClickMoney = () => {
        if (!selectedCoin) {
            console.log("please select a coin before transforming");
            return;
        }
        const coinPrice = selectedCoin.quotes["USD"].price;
        const countCoin = Math.round(money / coinPrice);
        setCountCoin(countCoin);
    };
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
            <div>
                <input value={money} onChange={onChange} type="text" placeholder="Input Your Money"></input>
                <button onClick={onClickMoney}>transform</button>
                <div>My Money: ${money}</div>
                <div>Buy Coin Count: $ {countCoin}</div>
            </div>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <select onChange={handleSelectChange}>
                    <option value="">Select Your Coin</option>
                    {coins.map((coin, id) => (
                        <option key={id} value={coin.id}>
                            {coin.name} ({coin.symbol}): ${coin.quotes["USD"].price} USD
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
export default App;

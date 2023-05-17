import React, {useContext, useEffect, useMemo, useState} from 'react';
import {COLORS} from '../constants';
import {ethers} from 'ethers';
import {DataContext} from '../App';
import {useProviders} from './Providers';
export const useBalances = () => {
  const {loggedInUser} = useContext(DataContext);
  const [provider] = useProviders();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenUSD, setTokenUSD] = useState(0);
  useEffect(() => {
    async function getBalance() {
      const balance = (
        await provider.getBalance(loggedInUser?.address)
      ).toString();
      const formatted = ethers.utils.formatUnits(balance, 'ether');
      const formattedWithDecimals = Number.parseFloat(formatted).toFixed(3);
      setTokenBalance(formattedWithDecimals);
    }

    getBalance();
  }, [provider, loggedInUser]);

  useEffect(() => {
    async function getBalanceInUSD() {
      try {
        const exchangeRate = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        )
          .then(response => response.json())
          .then(data => data.ethereum.usd);
        const balanceInUSD = (tokenBalance * exchangeRate).toFixed(3);
        setTokenUSD(balanceInUSD);
      } catch (error) {
        console.log(error);
      }
    }
    getBalanceInUSD();
  }, [tokenUSD]);
  return [tokenBalance, tokenUSD];
};

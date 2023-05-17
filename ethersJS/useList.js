import {ethers} from 'ethers';
import React, {useState, useEffect, useContext} from 'react';
import {DataContext} from '../App';
import {providerList} from './providerslist';
export const useProvbalance = () => {
  const {loggedInUser} = useContext(DataContext);
  const [listBalance, setListBalance] = useState([]);

  useEffect(() => {
    const fetchBalances = async () => {
      const promises = providerList.map(async provider => {
        console.log(provider);
        const balance = await provider.getBalance(loggedInUser?.address);
        const formatted = ethers.utils.formatUnits(balance, 'ether');
        const rounded = Number.parseFloat(formatted).toFixed(3);
        return rounded;
      });
      const balances = await Promise.all(promises);
      setListBalance(balances);
    };
    fetchBalances();
  }, [providerList, loggedInUser]);

  return [listBalance];
};

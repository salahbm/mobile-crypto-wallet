import {ethers} from 'ethers';
import React, {useState, useEffect} from 'react';
export const useProvbalance = ({provider, loggedInUser}) => {
  const [listBalance, setListBalance] = useState(0);

  useEffect(() => {
    async function getBalance() {
      const balance = (
        await provider.getBalance(loggedInUser?.address)
      ).toString();
      const formatted = ethers.utils.formatUnits(balance, 'ether');
      const formattedWithDecimals = Number.parseFloat(formatted).toFixed(3);
      setListBalance(formattedWithDecimals);
    }

    getBalance();
  }, [loggedInUser]); // Add loggedInUser as a dependency to the useEffect dependency array

  return [listBalance];
};

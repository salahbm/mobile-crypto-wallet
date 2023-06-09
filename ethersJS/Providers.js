import React, {useEffect, useMemo, useState} from 'react';
import {COLORS} from '../constants';
import {ethers} from 'ethers';

export const useProviders = () => {
  const [network, setNetwork] = useState('Mainnet');
  const [provider, setProvider] = useState(
    new ethers.providers.StaticJsonRpcProvider(
      'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
    ),
  );
  const [netColor, setNetColor] = useState(COLORS.green);

  // function to toggle the network
  const toggleNetwork = () => {
    if (network === 'Mainnet') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-goerli.g.alchemy.com/v2/9fNSQ8sQ7nVqaeqeZeK5ELbs7mW-R3gA',
        ),
      );
      setNetwork('Goerli');
      setNetColor('orange');
    } else if (network === 'Goerli') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://polygon-mumbai.g.alchemy.com/v2/lDL61yz-2Ys5pmxneawlm9GKUwGwRgyW',
        ),
      );
      setNetwork('Polygon');
      setNetColor('gray');
    } else if (network === 'Polygon') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://data-seed-prebsc-1-s1.binance.org:8545/QFFPDBA1HKFQG8IB9PM1HZ4YR5UFMATBEQ',
        ),
      );
      setNetwork('Binance');
      setNetColor('yellow');
    } else if (network === 'Binance') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-sepolia.g.alchemy.com/v2/2cvWsxQJ8A0TPOd-_V4eKlAQi6MI71DU',
        ),
      );
      setNetwork('Sepolia');
      setNetColor('blue');
    } else if (network === 'Sepolia') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://opt-goerli.g.alchemy.com/v2/wWoEinTD6ok4yN7n5ff5wPi4eUIYF4ET',
        ),
      );
      setNetwork('Optimism');
      setNetColor(COLORS.red);
    } else {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
        ),
      );
      setNetwork('Mainnet');
      setNetColor(COLORS.green);
    }
  };
  return [toggleNetwork, netColor, provider, network];
};

import 'react-native-gesture-handler';
import {ethers, providers} from 'ethers';
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import RootStackScreen from './screens/RootStackScreen';
import {COLORS} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DataContext = React.createContext();
import {Loading} from './components/Loading';
import {useProviders} from './ethersJS/Providers';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggleNetwork, netColor, provider, network] = useProviders();
  // const {toggleNetwork, netColor, provider, network} = 0;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1100);
    //LOGIN LOGICS
    // Check if there's a logged-in user
    const checkLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        console.log(user);
        if (user) {
          setLoggedInUser(JSON.parse(user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoggedInUser();
  }, []);

  //log out logic

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('loggedInUser');
    //to delete all the data in storage
    // await AsyncStorage.removeItem('users');

    setLoggedInUser(null);
  }, [loggedInUser]);

  return (
    <DataContext.Provider
      value={{
        handleLogout,
        loggedInUser,
        setLoggedInUser,
        toggleNetwork,
        netColor,
        provider,
        network,
      }}>
      <NavigationContainer>
        {loading ? <Loading /> : loggedInUser ? <Tabs /> : <RootStackScreen />}
      </NavigationContainer>
    </DataContext.Provider>
  );
};

export default App;

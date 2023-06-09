import axios from 'axios';

import React, {useCallback, useEffect, useState, useContext} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import Chart from '../components/Chart';
import {COLORS, icons} from '../constants';
import {useBalances} from '../ethersJS/useBalances';
import {Loading} from '../components/Loading';
import {DataContext} from '../App';
const Home = () => {
  const {toggleNetwork, netColor, provider, network} = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const [searchedCoin, setSearchedCoin] = useState([]);
  const [searchedText, setSearchedText] = useState([]);
  const [tokenBalance, tokenUSD] = useBalances();

  // getting tokens through coingecko api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`,
        );
        setCoin(response.data);
        setSearchedText(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const timer = setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // search logic
  const handleSearch = e => {
    const exData = [...coin];
    const newData = exData.filter(ex => {
      return ex.id.startsWith(e);
    });
    setSearchedText(newData);
  };

  //charts

  const handleSearchedCoin = element => {
    setSearchedCoin(element);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.powderBlue,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingBottom: 10,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text
            style={{
              color: COLORS.white,

              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Balance:
          </Text>

          <Text
            style={{
              fontSize: 20,
              paddingLeft: 5,
              color: '#ffff',
              fontWeight: '600',
              letterSpacing: 1,
            }}>
            USD {tokenUSD}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: COLORS.white,

              fontSize: 25,
              fontWeight: 'bold',
              flex: 1,
            }}>
            {network}:
          </Text>
          <>
            <Image
              source={icons.eth}
              style={{
                width: 30,
                height: 30,
                tintColor: 'gray1',
                marginRight: 7,
              }}
            />

            <Text
              style={{
                fontSize: 20,
                paddingLeft: 5,
                color: '#ffff',
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {tokenBalance}.000
            </Text>
          </>
        </View>
      </View>
      <View
        style={{paddingTop: 5, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Seach Token"
          placeholderTextColor={'white'}
          textAlign="center"
          autoCapitalize="none"
          style={{
            backgroundColor: COLORS.powderBlue,
            borderRadius: 20,
            width: 300,
            color: COLORS.white,
            height: Platform.OS === 'ios' ? 50 : 40,
          }}
          onChangeText={val => handleSearch(val)}
        />
      </View>
      <View>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
            paddingLeft: 15,
            paddingTop: 5,
          }}>
          Scroll Up
        </Text>
      </View>

      <View style={{overflow: 'visible'}}>
        {loading ? (
          <Loading text={'Downloading Data...'} />
        ) : (
          <ScrollView style={{height: 320}}>
            {searchedText.map(element => (
              <TouchableOpacity
                key={element.id}
                onPress={() => handleSearchedCoin(element)}
                style={{
                  paddingTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Image
                  source={{uri: element.image}}
                  style={{
                    height: 30,
                    width: 30,
                    alignContent: 'flex-start',
                  }}
                />
                <Text style={{color: 'white'}}>{element.name}</Text>
                <Text style={{color: COLORS.green}}>
                  ${element.current_price}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <Chart
        chartPrices={
          searchedCoin.length !== 0
            ? searchedCoin?.sparkline_in_7d?.price
            : coin[0]?.sparkline_in_7d?.price
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.violent, flex: 1},
});

import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS, icons} from '../constants';
import {Authcontext} from '../components/context';
import Entypo from 'react-native-vector-icons/Entypo';
import Clipboard from '@react-native-clipboard/clipboard';
import {DataContext} from '../App';
import {SwitchButton} from '../components/SwitchButton';

const Settings = ({navigation}) => {
  const {
    tokenBalance,
    wallet,
    tokenUSD,
    toggleNetwork,
    netColor,
    provider,
    network,
    handleLogout,
    loggedInUser,
  } = useContext(DataContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: height >= 800 ? 50 : 20,
          marginBottom: 20,
        }}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <MoreScreenBtn btnName={'Username'} btnTxt={loggedInUser?.username} />
      <MoreScreenBtn btnName={'Address'} btnTxt={loggedInUser?.address} />
      <MoreScreenBtn btnName={'Change user data'} />
      <MoreScreenBtn btnName={'Biometrics'} />
      <MoreScreenBtn btnName={'FAQ'} />
      <MoreScreenBtn btnName={'Help Center'} />
      <MoreScreenBtn btnName={'Terms and Conditions'} />
      <MoreScreenBtn btnName={'Delete user data'} />
      <MoreScreenBtn btnName={'Log out'} onPress={handleLogout} color="red" />
    </View>
  );
};

const MoreScreenBtn = ({onPress, btnName, btnTxt, color}) => {
  console.log(color);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View
        style={{
          width: width * 0.85,
          height: 36,

          backgroundColor: COLORS.powderBlue,
          borderRadius: 8,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',

            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: '#FFFF',
              marginLeft: 19,
            }}>
            {btnName}
          </Text>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: color !== undefined ? color : '#FFFF',
              marginLeft: 19,
              width: 100,
              textAlign: 'right',
            }}
            ellipsizeMode="middle"
            numberOfLines={1}>
            {btnTxt}
          </Text>
          {/* <Entypo name="chevron-right" size={20} color="#CBCCD4" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.violent,
  },
  header: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    paddingTop: 20,
    marginEnd: 50,
    fontWeight: 'bold',
  },
  text1: {color: COLORS.white, fontSize: 15, paddingTop: 20},
});

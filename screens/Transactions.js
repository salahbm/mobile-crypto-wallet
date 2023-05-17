import React, {useContext, useMemo, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, icons, SIZES} from '../constants';
import {DataContext} from '../App';
import {FlatList} from 'react-native-gesture-handler';
import {providerList} from '../ethersJS/providerslist';
import {useProvbalance} from '../ethersJS/useList';
const Transactions = ({navigation}) => {
  const {toggleNetwork, netColor, network} = useContext(DataContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.violent,
      }}>
      <Animatable.View
        animation="bounceInDown"
        duration={1000}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: Platform.OS === 'ios' ? 60 : 40,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SendScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: SIZES.radius,
            width: 150,
            backgroundColor: COLORS.white,
            marginBottom: 20,
          }}>
          <Text
            style={{
              marginLeft: SIZES.base,
              paddingEnd: 10,
            }}>
            Send
          </Text>
          <Image
            source={icons.send}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ReceiveScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: 150,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <Text
            style={{
              marginLeft: SIZES.base,
              paddingEnd: 10,
            }}>
            Receive
          </Text>
          <Image
            source={icons.withdraw}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}></Image>
        </TouchableOpacity>
      </Animatable.View>
      <TouchableOpacity
        onPress={toggleNetwork}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 12,
          borderColor: 'white',
          width: '85%',
          borderWidth: 1,
          height: 45,
          justifyContent: 'center',
        }}>
        <Animatable.Text
          style={{fontWeight: 'bold', color: COLORS.white, fontSize: 20}}
          animation="bounceInDown">
          Tap to change Network
        </Animatable.Text>
        <Image
          source={icons.swap}
          style={{
            marginLeft: 15,
            width: 20,
            height: 20,
            tintColor: 'white',
          }}
        />
      </TouchableOpacity>
      <Animatable.View
        duration={1000}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          alignSelf: 'center',
        }}
        animation="bounceInUp">
        <Text
          style={{
            color: netColor,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Your Current Network: {network}
        </Text>
      </Animatable.View>
      <Animatable.View animation="bounceInUp" duration={1000}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={providerList}
          renderItem={Networks}
          scrollEnabled={false}
          keyExtractor={item => item.id}
        />
      </Animatable.View>
    </View>
  );
};

export default Transactions;
const Networks = ({item}) => {
  return (
    <View
      style={{
        paddingHorizontal: 24,
        marginVertical: 5,
        borderRadius: 12,
        borderColor: '#ffff',
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        height: 35,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',

          color: '#FFFF',
        }}>
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',

          color: '#FFFF',
        }}>
        0.000
      </Text>
    </View>
  );
};

import {ethers} from 'ethers';
import React, {useEffect, useState, Component, useContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, icons, FONTS} from '../constants';
import {DataContext} from '../App';
const SendScreen = ({navigation}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(undefined);
  const [result, onChangeResult] = useState('(result)');
  const {loggedInUser, provider, network} = useContext(DataContext);

  // Connection

  async function sendTx() {
    // const gasPrice = await provider.getGasPrice();
    // const gasPrice = ethers.utils.parseUnits('5', 'gwei');
    const signer = new ethers.loggedInUser(loggedInUser.privateKey);
    const tx = {
      from: loggedInUser.address,
      to: recipient,
      value: ethers.utils.parseUnits(amount, 'ether'),
      //value: ethers.utils.parseEther('0.1'),
      // gasPrice: gasPrice,
      gasPrice: ethers.utils.hexlify(5000000000),
      gasLimit: ethers.utils.hexlify(21000),
      nonce: await provider.getTransactionCount(loggedInUser.address, 'latest'),
    };

    const signed = await signer.signTransaction(tx);
    const transaction = await provider.sendTransaction(signed);

    setStatus('pending');

    const pending = await transaction.wait();

    setStatus('sent');
    setAmount('');
    setRecipient('');
  }

  useEffect(() => {
    async function cleanTheBox(transaction) {
      if (transaction) {
        let transaction = onChangeResult(result);
      } else {
        return;
      }
    }
    cleanTheBox();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.violent,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
        paddingLeft: 15,
        padding: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 24,
        }}>
        <Image
          source={icons.leftarrow}
          style={{tintColor: COLORS.white, height: 15, width: 15}}
        />
        <Text style={[styles.text, {flex: 0.63}]}>Send</Text>
      </TouchableOpacity>

      <Animatable.View
        style={styles.views}
        animation="bounceInLeft"
        duration={1500}>
        <Text style={styles.text}>Provider:</Text>

        <Text style={styles.text1} ellipsizeMode="middle" numberOfLines={1}>
          {network}
        </Text>
      </Animatable.View>

      <Animatable.View
        style={styles.views}
        animation="bounceInLeft"
        duration={1500}>
        <Text style={styles.text}>From:</Text>

        <Text
          style={[styles.text1, {width: 170}]}
          ellipsizeMode="middle"
          numberOfLines={1}>
          {loggedInUser?.address}
        </Text>
      </Animatable.View>
      <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center'}}>
        <Animatable.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            alignItems: 'center',
            borderColor: COLORS.powderBlue,
            width: '87%',
            paddingHorizontal: 10,
            height: 50,
          }}
          animation="bounceInRight"
          duration={1500}>
          <Text style={styles.text}>To:</Text>
          <TouchableOpacity>
            <TextInput
              style={styles.text1}
              ellipsizeMode="middle"
              numberOfLines={1}
              placeholder="Recepient"
              placeholderTextColor={COLORS.bluish}
              value={recipient}
              onChangeText={val => setRecipient(val)}></TextInput>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          style={{
            marginLeft: 15,
          }}
          animation="bounceInRight"
          duration={1500}>
          <TouchableOpacity onPress={() => navigation.navigate('QrScreen')}>
            <Image
              source={icons.qrCode}
              style={{width: 35, height: 35, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <Animatable.View
        style={styles.views}
        animation="bounceInUp"
        duration={1500}>
        <Text style={styles.text}>Value:</Text>
        <TouchableOpacity>
          <TextInput
            style={styles.text1}
            placeholder="Token"
            placeholderTextColor={COLORS.bluish}
            value={amount}
            onChangeText={val => setAmount(val)}></TextInput>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation="bounceIn"
        duration={1500}
        style={{
          marginHorizontal: '29%',
          marginTop: 60,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            textAlign: 'center',
            borderRadius: 30,
            height: 30,
            paddingTop: 5,
          }}
          onPress={() => {
            sendTx();
          }}>
          <Text
            style={{
              textAlign: 'center',
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      {status ? (
        <Animatable.View
          animation="bounceInDown"
          duration={1500}
          style={styles.views}>
          <Text style={styles.text}>Status:</Text>
          <Text style={styles.text1} ellipsizeMode="middle" numberOfLines={1}>
            {status}
          </Text>
        </Animatable.View>
      ) : null}
    </View>
  );
};

export default SendScreen;
const styles = StyleSheet.create({
  views: {
    paddingHorizontal: 15,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: COLORS.powderBlue,
    height: 50,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
  },
  text1: {
    color: COLORS.bluish,
    fontSize: 20,
    fontWeight: '500',
  },
});

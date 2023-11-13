import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import Modal from 'react-native-modal';
import Loader from '../../utils/helpers/Loader';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import {
  getpaymentmethodRequest,
  getpaymentmethodSuccess,
  getpaymentmethodFailure,
  removecardRequest,
  removecardSuccess,
  removecardFailure,
} from '../../redux/reducer/ProfileReducer';
import moment from 'moment';
let status = '';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';

export default function Paymentmethod(props) {
  const [modalvisible, setmodalvisible] = useState(false);
  const [redeem, setredeem] = useState(0);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [firstdataset, setfirstdataset] = useState(false);
  const [seconddataset, setseconddataset] = useState(false);
  const [selecteddata, setselecteddata] = useState('');
  const [query, setquery] = useState('');
  const [selectid, setselectid] = useState('');
  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(getpaymentmethodRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, [isFocused]);

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getpaymentmethodRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/getpaymentmethodSuccess':
        status = ProfileReducer.status;
        console.log(ProfileReducer?.getpaymentmethodResponse);
        // console.log(ProfileReducer?.historyResponse?.data)
        break;
      case 'Profile/getpaymentmethodFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/removecardRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/removecardSuccess':
        status = ProfileReducer.status;
        // console.log(ProfileReducer?.getpaymentmethodResponse)
        dispatch(getpaymentmethodRequest());
        // console.log(ProfileReducer?.historyResponse?.data)
        break;
      case 'Profile/removecardFailure':
        status = ProfileReducer.status;
        break;
    }
  }
  function deletefunction() {
    let obj = {
      card_id: selectid,
    };
    connectionrequest()
      .then(() => {
        dispatch(removecardRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }

  function renderdata({item, index}) {
    //    console.log(item?.card_no?.split(''));
    console.log(item);
    let sp = [];
    sp = item?.card_no?.split('');
    return (
      <>
        <View
          style={{
            backgroundColor: Colors.cardview,
            width: '100%',
            padding: normalize(15),
            marginTop: normalize(20),
            borderRadius: normalize(10),
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Image source={item.image} style={{width:normalize(45),height:normalize(45),resizeMode:'stretch'}}/> */}
              <View style={{marginLeft: normalize(8)}}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontFamily: Fonts.Poppins_Medium,
                    color: Colors.lightpink,
                    textTransform: 'capitalize',
                  }}>
                  {item?.card_holder_name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(11),
                      fontFamily: Fonts.Poppins_Regular,
                    }}>
                    {'*************' + sp[13] + sp[14] + sp[15]}
                  </Text>

                  {/* <Text style={{color: Colors.lightgreen,marginLeft:normalize(4),
                fontSize:normalize(11),fontFamily:Fonts.Poppins_Medium}}>{moment(item?.payment_details?.created_at).format('D MMM yyyy')}</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            {selectid == item?.id && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setselectid(false),
                      props.navigation.navigate('Addcard', {
                        id: item?.id,
                      });
                  }}
                  style={{
                    backgroundColor: Colors.pink,
                    width: normalize(60),
                    paddingVertical: normalize(5),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: normalize(4),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: Fonts.Poppins_Medium,
                      textTransform: 'capitalize',
                      fontSize: normalize(11),
                    }}>
                    edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Are you sure you want to remove your card?',
                      '',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            setselectid(false), console.log('Cancel Pressed');
                          },
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => deletefunction()},
                      ],
                    )
                  }
                  style={{
                    backgroundColor: Colors.pink,
                    width: normalize(60),
                    paddingVertical: normalize(5),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: normalize(4),
                    marginTop: normalize(3),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: Fonts.Poppins_Medium,
                      textTransform: 'capitalize',
                      fontSize: normalize(11),
                    }}>
                    remove
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() =>
                selectid == item?.id ? setselectid('') : setselectid(item?.id)
              }
              style={{}}>
              <Image
                source={Icons.ellipsis}
                style={{
                  width: normalize(25),
                  height: normalize(15),
                  resizeMode: 'contain',
                  tintColor: Colors.white,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: Colors.darkblue, flex: 1}}>
      <Loader
        visible={
          ProfileReducer.status == 'Profile/getpaymentmethodRequest' ||
          ProfileReducer.status == 'Profile/removecardRequest'
        }
      />
      <View
        style={{
          height: normalize(60),
          // flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: normalize(15),
          backgroundColor: Colors.themeblue,
          marginTop: Platform.OS == 'ios' ? 0 : normalize(15),
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: normalize(10)}}>
          <Image
            source={Icons.left}
            style={{
              width: normalize(20),
              height: normalize(15),
              resizeMode: 'stretch',
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.white,
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(24),
          }}>
          Payment Method
        </Text>
      </View>
      <ScrollView>
        <FlatList
          data={ProfileReducer?.getpaymentmethodResponse?.data}
          renderItem={renderdata}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{width: '90%', alignSelf: 'center', marginTop: normalize(10)}}
          contentContainerStyle={{paddingBottom: normalize(30)}}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Addcard', {page: 'addcard'})
              }
              style={{
                backgroundColor: Colors.pink,
                width: '100%',
                padding: normalize(15),
                marginTop: normalize(20),
                borderRadius: normalize(10),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(14),
                  fontFamily: Fonts.Poppins_Medium,
                  textAlign: 'center',
                }}>
                Add a New Payment Method
              </Text>
            </TouchableOpacity>
          }
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: Colors.cardview,
                width: '100%',
                padding: normalize(15),
                marginTop: normalize(20),
                borderRadius: normalize(10),
              }}>
              {/* <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',
       }}> */}
              {/* <View style={{flexDirection:'row',alignItems:'center'}}> */}
              {/* <Image source={item.image} style={{width:normalize(45),height:normalize(45),resizeMode:'stretch'}}/> */}

              <Text
                style={{
                  fontSize: normalize(14),
                  fontFamily: Fonts.Poppins_Medium,
                  color: Colors.lightpink,
                  textTransform: 'capitalize',
                  textAlign: 'center',
                }}>
                {'No Payment Method Found'}
              </Text>

              {/* </View> */}

              {/* </View> */}
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

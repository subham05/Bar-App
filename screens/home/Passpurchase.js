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
  Alert,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import MaskInput, {Masks} from 'react-native-mask-input';
import normalize from '../../utils/helpers/dimen';
import Modal from 'react-native-modal';
import Loader from '../../utils/helpers/Loader';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';
import {
  getCardRequest,
  passDetailsRequest,
  purchaseRequest,
} from '../../redux/reducer/HomeReducer';
export default function Passpurchase(props) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  // console.log(props?.route?.params?.id);
  // console.log(props?.route?.params?.senddata);
  const [downarrow, setdownarrow] = useState(false);
  const [qty, setQty] = useState(1);
  const [cardCVC, setCardCVC] = useState('');
  const [isModalVisible1, setModalVisible1] = useState(false);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [cardid, setcardid] = useState('');
  const [totalPass, setTotalPass] = useState();
  const [increaseCnt, setIncreaseCount] = useState(0);
  const [decreaseCnt, setDecreaseCount] = useState(0);
  const [curPrice, setCurrentPrice] = useState(0);
  const [cardDetails, setCardDetails] = useState('');
  const [currentTire, setCurrentTire] = useState();
  const [arrTier, setArrTier] = useState();
  const [flag, setFlag] = useState(0);
  const [newtotal, setNewTotal] = useState(0);
  const [page, setPage] = useState();
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const cvvl = [/\d/, /\d/, /\d/, /\d/];
  // function CalTotalPass() {
  //   let passCount = 0;
  //   let amount;
  //   console.log('---', HomeReducer?.passDetailsResponse?.tier_amounts);
  //   for (
  //     let index = 0;
  //     index < HomeReducer?.passDetailsResponse?.tier_amounts.length;
  //     index++
  //   ) {
  //     if (
  //       HomeReducer?.passDetailsResponse?.tier_amounts[index].current_tire == 1
  //     ) {
  //       passCount =
  //         HomeReducer?.passDetailsResponse?.tier_amounts[index].no_of_remaining;
  //       amount = HomeReducer?.passDetailsResponse?.tier_amounts[index].amount;
  //       setCurrentTire(
  //         HomeReducer?.passDetailsResponse?.tier_amounts[index].id,
  //       );
  //     }
  //   }
  //   setTotalPass(passCount);
  //   setCurrentPrice(amount);
  // }

  function Increase() {
    if (qty < HomeReducer?.passDetailsResponse?.remaining_ticket) {
      setQty(qty + 1);
      setIncreaseCount(increaseCnt + 1);
    } else if (qty == HomeReducer?.passDetailsResponse?.remaining_ticket) {
      Alert.alert('No More Pass Available');
    }

    // var newQTY = totalPass;   //130
  }

  console.log('arrayof tier', arrTier);
  useEffect(() => {
    if (increaseCnt != 0) {
      for (
        let index = 0;
        index < HomeReducer?.passDetailsResponse?.tierAmounts_new?.length;
        index++
      ) {
        if (
          qty >=
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index]
              .StartRemaining &&
          qty <=
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index]
              ?.EndRemaining
        ) {
          setNewTotal(
            prev =>
              prev +
              HomeReducer?.passDetailsResponse?.tierAmounts_new[index].amount,
          );

          setCurrentPrice(
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index].amount,
          );
          console.log(
            'tier index',
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id,
          );
          console.log(
            'TOTAL',
            qty <
              HomeReducer?.passDetailsResponse?.tierAmounts_new[index].amount
              ? qty * 10
              : qty,
          );

          if (
            currentTire !=
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id
          ) {
            setArrTier([
              ...arrTier,
              HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id,
            ]);
            Alert.alert('Pass Price Has been Changed');
            setCurrentTire(
              HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id,
            );

            // setNewTotal(
            //   prev =>
            //     prev +
            //     HomeReducer?.passDetailsResponse?.tierAmounts_new[index]
            //       .amount *
            //       qty -
            //     HomeReducer?.passDetailsResponse?.tierAmounts_new[index]
            //       .no_of_remaining,
            // );
          }
        }
      }
    }
  }, [increaseCnt]);

  //no. of passs =17
  //price of pass = $10
  //total price = 17 *10 =170

  // console.log('quantity', qty, HomeReducer?.passDetailsResponse?.tierAmounts_new?.map((e, i) => i > 0));
  useEffect(() => {
    if (decreaseCnt != 0) {
      for (
        let index = 0;
        index < HomeReducer?.passDetailsResponse?.tierAmounts_new?.length;
        index++
      ) {
        if (
          qty >=
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index]
              .StartRemaining &&
          qty <=
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index]
              ?.EndRemaining
        ) {
          if (
            qty ==
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index]
              ?.EndRemaining
          ) {
            setNewTotal(
              prev =>
                prev -
                HomeReducer?.passDetailsResponse?.tierAmounts_new[index + 1]
                  .amount,
            );
          } else {
            setNewTotal(
              prev =>
                prev -
                HomeReducer?.passDetailsResponse?.tierAmounts_new[index].amount,
            );
          }

          setCurrentTire(
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id,
          );
          setCurrentPrice(
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index].amount,
          );
          console.log(
            'tier index',
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id,
          );
          if (
            currentTire !=
            HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id
          ) {
            let arr = arrTier;

            arr.splice(-1);
            setArrTier(arr);
            setCurrentTire(
              HomeReducer?.passDetailsResponse?.tierAmounts_new[index].id,
            );
            Alert.alert('Pass Price Has been Changed');
          }
        }
      }
    }
  }, [decreaseCnt]);
  console.log('current', curPrice);
  // for (
  //   let index = 0;
  //   index < HomeReducer?.passDetailsResponse?.tier_amounts?.length;
  //   index++
  // ) {
  //   let range = 0;
  //   range = HomeReducer?.passDetailsResponse?.tier_amounts[index].no_of_pass;

  //   console.log('range :>> ', range);
  //   if (qty > range) {
  //     console.log('range extend :>> ');
  //   } else if (qty == range) {
  //     console.log(
  //       'current ID :>> ',
  //       HomeReducer?.passDetailsResponse?.tier_amounts[index].id,
  //     );
  //   }
  //   range =
  //     range + HomeReducer?.passDetailsResponse?.tier_amounts[index].no_of_pass;
  // if (
  //   HomeReducer?.passDetailsResponse?.tier_amounts[index].current_tire == 1
  // ) {
  //   if (
  //     qty >
  //     HomeReducer?.passDetailsResponse?.tier_amounts[index].no_of_remaining
  //   ) {
  //     console.log('Alert !st tire DOne');
  //   }
  // }
  // }
  console.log('=====>NEW', newtotal);
  function Decrease() {
    if (qty != 1) {
      setDecreaseCount(decreaseCnt + 1);
      setQty(qty - 1);
    }
  }
  useEffect(() => {
    console.log('---home Get', HomeReducer.getCardResponse);
    connectionrequest()
      .then(() => {
        dispatch(getCardRequest());
        dispatch(passDetailsRequest(props?.route?.params?.id));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, [isFocused]);
  function Purchase() {
    console.log('entering');
    if (qty == 0) {
      showErrorAlert('Please Select At least one qty');
    } else if (cardDetails == '') {
      showErrorAlert('Please Choose a Card');
    } else if (cardCVC == '') {
      showErrorAlert('Enter Your Card CVV');
    } else if (qty > 25) {
      showErrorAlert('You can not buy more than 25 Passes at a Time');
    } else {
      const tempDate = cardDetails?.exp_date;
      let obj = new FormData();

      obj.append(
        'bar_owner_id',
        HomeReducer?.passDetailsResponse?.bar_owner_id,
      );
      obj.append('pass_id', HomeReducer?.passDetailsResponse?.id);
      obj.append('card_no', Number(cardDetails?.card_no));
      obj.append('exp_month', tempDate.substring(0, 2));
      obj.append('exp_year', Number(tempDate.substring(3, 5)));
      obj.append('cvc', Number(cardCVC));
      for (let index = 0; index < arrTier.length; index++) {
        obj.append('tier_amount_id[]', arrTier[index]);
      }
      // obj.append('tier_amount_id', arrTier);
      obj.append('amount', curPrice);
      obj.append('quantity', qty);
      console.log('obj', obj);

      connectionrequest()
        .then(() => {
          dispatch(purchaseRequest(obj));

          setModalVisible1(false);
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  useEffect(() => {
    if (HomeReducer.status == 'Home/purchaseSuccess') {
      connectionrequest()
        .then(() => {
          setQty(1);
          dispatch(passDetailsRequest(props?.route?.params?.id));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
      props.navigation.navigate('TabNavigator', {screen: 'Home'});
    } else if (HomeReducer.status == 'Home/passDetailsSuccess') {
      if (HomeReducer?.passDetailsResponse?.tierAmounts_new.length > 0) {
        setCurrentTire(
          HomeReducer?.passDetailsResponse?.tierAmounts_new[0]?.id,
        );
        setCurrentPrice(
          HomeReducer?.passDetailsResponse?.tierAmounts_new[0]?.amount,
        );
        setArrTier([HomeReducer?.passDetailsResponse?.tierAmounts_new[0]?.id]);
        setNewTotal(
          HomeReducer?.passDetailsResponse?.tierAmounts_new[0]?.amount * 1,
        );
      } else {
        setNewTotal(0);
      }
    } else if (HomeReducer.status == 'Home/getCardSuccess') {
      for (let index = 0; index < HomeReducer.getCardResponse.length; index++) {
        if (HomeReducer.getCardResponse[index].is_primary == 1) {
          setcardid(HomeReducer.getCardResponse[index].id);
          setCardDetails(HomeReducer.getCardResponse[index])
        }
      }
    }
  }, [HomeReducer.status]);

  function renderdata({item, index}) {
    //   console.log(item?.card_no?.split(''));
    let sp = [];
    sp = item?.card_no?.split('');
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            cardid == item?.id ? setcardid('') : setcardid(item?.id);
            setCardDetails(item);
          }}
          style={{
            backgroundColor: '#030721',
            width: '100%',
            padding: normalize(15),
            marginTop: normalize(20),
            borderRadius: normalize(10),
            borderWidth: 1,
            borderColor: cardid == item?.id ? Colors.pink : '#030721',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
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
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
      <SafeAreaView style={{backgroundColor: Colors.darkblue, flex: 1}}>
        <Loader visible={HomeReducer.status == 'Home/purchaseRequest'} />
        <View
          style={{
            height: normalize(60),
            // flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',

            backgroundColor: Colors.themeblue,
            marginTop: Platform.OS == 'android' ? STATUSBAR_HEIGHT : null,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '76%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                height: normalize(30),
                width: normalize(30),
                borderRadius: normalize(6),
                backgroundColor: '#D73F9D',
                // alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: normalize(15),
              }}
              onPress={() => props.navigation.goBack('')}>
              <Image
                source={Icons.Arrow}
                resizeMode={'contain'}
                style={{
                  height: normalize(6),
                  width: normalize(8),
                  transform: [{rotate: '90deg'}],

                  marginHorizontal: normalize(15),
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.Poppins_Medium,
                fontSize: normalize(24),
              }}>
              Your
              <Text
                style={{color: Colors.pink, fontFamily: Fonts.Poppins_Medium}}>
                {' '}
                Passes
              </Text>
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: normalize(70)}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              padding: normalize(15),
              backgroundColor: Colors.themeblue,
              marginTop: normalize(20),
              borderRadius: normalize(10),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    color: Colors.pink,
                    fontSize: normalize(15),
                    fontFamily: Fonts.Poppins_Medium,
                    marginRight: normalize(14),
                  }}>
                  {HomeReducer?.passDetailsResponse?.bar_owner?.full_name}
                </Text>
                <Text
                  style={{
                    color: Colors.pink,
                    fontSize: normalize(15),
                    fontFamily: Fonts.Poppins_Medium,
                    marginRight: normalize(14),
                  }}>
                  {HomeReducer?.passDetailsResponse?.message}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(11),
                    marginBottom: normalize(4),
                    alignSelf: 'flex-end',
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  Qty
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => Decrease()}
                    style={{
                      backgroundColor: Colors.pink,
                      height: normalize(24),
                      width: normalize(24),
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: Colors.white, fontSize: normalize(18)}}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(15),
                      marginHorizontal: normalize(8),
                      fontFamily: Fonts.Poppins_Bold,
                    }}>
                    {qty}
                  </Text>
                  <TouchableOpacity
                    onPress={() => Increase()}
                    style={{
                      backgroundColor: Colors.pink,
                      height: normalize(24),
                      width: normalize(24),
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: Colors.white, fontSize: normalize(18)}}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(10),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Pass Holder
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Regular,
                }}>
                Use By
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(10),
              }}>
              <Text
                style={{
                  color: Colors.lightgreen,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Medium,
                  marginRight: normalize(14),
                }}>
                {ProfileReducer?.profileResponse?.user?.full_name}
              </Text>
              <Text
                style={{
                  color: Colors.lightgreen,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {moment(props?.route?.params?.expDate).format('D MMM yyyy')},
                {moment(props?.route?.params?.exptime, 'h:mm').format(
                  '  hh:mm A',
                )}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              padding: normalize(15),
              backgroundColor: '#0E1648',
              marginTop: normalize(20),
              borderRadius: normalize(10),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={Icons.payment}
                  style={{
                    width: normalize(16),
                    height: normalize(16),
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: Colors.lightpink,
                    fontSize: normalize(13),
                    fontFamily: Fonts.Poppins_Medium,
                    marginLeft: normalize(10),
                  }}>
                  Payment Methods
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setdownarrow(!downarrow)}
                style={{
                  width: normalize(25),
                  height: normalize(25),
                  backgroundColor: Colors.pink,
                  borderRadius: normalize(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Icons.rightarrow}
                  style={{
                    width: normalize(5),
                    height: normalize(15),
                    resizeMode: 'contain',
                    transform: [{rotate: downarrow ? '270deg' : '90deg'}],
                  }}
                />
              </TouchableOpacity>
            </View>
           
            {downarrow && (
              <>
               <TouchableOpacity
                    onPress={() => props.navigation.navigate('Yourpasses')}
                    style={{
                      width: '100%',
                      paddingVertical: normalize(13),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#030721',
                      borderRadius: normalize(8),
                      marginTop: normalize(20),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(14),
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      Add a New Payment Method
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                data={HomeReducer.getCardResponse}
                renderItem={renderdata}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={{width: '100%', alignSelf: 'center'}}
                // contentContainerStyle={{ paddingBottom: normalize(30) }}

                ListEmptyComponent={
                  <Text style={{color:Colors.white,fontFamily:Fonts.Poppins_Regular,alignSelf:'center',marginTop:normalize(14)}}>No Card Found</Text>
                }
              />
              </>
             
            )}
          </View>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              padding: normalize(15),
              backgroundColor: '#0E1648',
              marginTop: normalize(20),
              borderRadius: normalize(10),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: Colors.lightpink,
                  fontSize: normalize(14),
                  fontFamily: Fonts.Poppins_Medium,
                  marginLeft: normalize(10),
                }}>
                Total
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(14),
                  fontFamily: Fonts.Poppins_Medium,
                  marginLeft: normalize(10),
                }}>
                {/* {HomeReducer?.passDetailsResponse?.is_pre_sale_available ==
                  1 && (
                  <Text
                    style={{
                      color: Colors.lightgreen,
                      fontFamily: Fonts.Poppins_Medium,
                      paddingRight: normalize(4),
                    }}>
                    Pre Sale :{' '}
                  </Text>
                )}
                $
                {HomeReducer?.passDetailsResponse?.is_pre_sale_available == 0
                  ? HomeReducer?.passDetailsResponse?.amount * qty
                  : HomeReducer?.passDetailsResponse?.pre_amount * qty} */}
                $ {newtotal}
              </Text>
            </View>
            {HomeReducer?.passDetailsResponse?.remaining_ticket > 0 ? (
              <TouchableOpacity
                onPress={() => setModalVisible1(true)}
                // onPress={()=>props.navigation.navigate('Wallet')}
                // onPress={() =>
                //   cardid == ''
                //     ? ProfileReducer?.getpaymentmethodResponse?.data?.length < 1
                //       ? showErrorAlert('Please add a card')
                //       : showErrorAlert('Please select a card')
                //     : props.navigation.navigate('Shop', {cardid: cardid})
                // }
                style={{
                  width: '100%',
                  paddingVertical: normalize(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.pink,
                  borderRadius: normalize(8),
                  marginTop: normalize(20),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Purchase Now
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: '100%',
                  paddingVertical: normalize(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.darkblue,
                  borderRadius: normalize(8),
                  marginTop: normalize(20),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  No Pass Available
                </Text>
              </View>
            )}
          </View>
          {/* <View style={{flexDirection:'row',alignSelf:'center',marginTop:normalize(15),alignItems:'center'}}>
          <Image source={Icons.warning} style={{resizeMode:'contain',width:normalize(15),height:normalize(15)}}/>
          <Text style={{color:Colors.white,fontFamily:Fonts.Poppins_Medium,marginLeft:normalize(6),fontSize:normalize(14)}}>Warning</Text>
      </View> */}
          <Text
            style={{
              color: '#555B83',
              textAlign: 'center',
              width: '80%',
              alignSelf: 'center',
              marginTop: normalize(20),
              marginBottom: normalize(30),
              fontSize: normalize(10),
            }}>
            Purchase this pass to skip to the front of the line. Must wear
            appropriate attire. Does not guarantee immediate entry. Must be 21
            or over. No Refunds.
          </Text>
          {/* <Text style={{color:'#555B83',textAlign:'center',width:'80%',alignSelf:'center',marginTop:normalize(20),
    fontSize:normalize(10)}}>No Rufund</Text> */}
          <Modal
            isVisible={isModalVisible1}
            onBackdropPress={() => setModalVisible1(false)}>
            <View
              style={{
                height: normalize(230),
                // borderRadius: normalize(15),
                alignSelf: 'center',
                paddingVertical: normalize(12),
                width: normalize(300),
                alignItems: 'center',
                backgroundColor: '#08103A',
                borderRadius: normalize(10),
              }}>
              <View
                style={{
                  height: '100%',
                  width: normalize(275),
                  backgroundColor: '#161F5C',

                  borderRadius: normalize(10),
                }}>
                <View
                  style={{
                    padding: normalize(14),
                  }}>
                  <View>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                        textAlign: 'center',
                        marginBottom: normalize(7),
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      Enter Your CVV
                    </Text>
                    <MaskInput
                      style={[
                        {
                          letterSpacing: -0.03,
                          fontSize: normalize(12),
                          color: Colors.white,
                          borderWidth: 1,
                          borderColor: Colors.placeholder,
                          paddingHorizontal: normalize(15),
                          height: normalize(42),
                          borderRadius: normalize(10),
                          backgroundColor: '#0E1648',
                          width: '100%',
                          alignSelf: 'center',
                          marginTop: normalize(10),
                        },
                      ]}
                      placeholder="CVV"
                      // onFocus={() => setcardborder('cardcvc')}
                      // onBlur={() => setcardborder('')}
                      placeholderTextColor={Colors.placeholder}
                      keyboardType="numeric"
                      value={cardCVC}
                      mask={cvvl}
                      onChangeText={mask => setCardCVC(mask)}
                    />
                    <TouchableOpacity
                      onPress={() => Purchase()}
                      // onPress={()=>props.navigation.navigate('Wallet')}
                      // onPress={() =>
                      //   cardid == ''
                      //     ? ProfileReducer?.getpaymentmethodResponse?.data?.length < 1
                      //       ? showErrorAlert('Please add a card')
                      //       : showErrorAlert('Please select a card')
                      //     : props.navigation.navigate('Shop', {cardid: cardid})
                      // }
                      style={{
                        width: '100%',
                        paddingVertical: normalize(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.pink,
                        borderRadius: normalize(8),
                        marginTop: normalize(20),
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(16),
                          fontFamily: Fonts.Poppins_Medium,
                        }}>
                        Pay Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

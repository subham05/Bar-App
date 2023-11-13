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
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MaskInput, {Masks} from 'react-native-mask-input';
import Loader from '../../utils/helpers/Loader';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import {
  purchaseRequest,
  purchaseSuccess,
  purchaseFailure,
  getcardRequest,
  getcardSuccess,
  getcardFailure,
} from '../../redux/reducer/ProfileReducer';
import moment from 'moment';
import Toast from '../../utils/helpers/Toast';
let status = '';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';
import TextInputItem from '../../components/TextInputItem';
import showErrorAlert from '../../utils/helpers/Toast';

export default function Shop(props) {
  const expirel = [/\d/, /\d/, '/', /\d/, /\d/];
  const cvvl = [/\d/, /\d/, /\d/];
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [cardNumber, setCardNumber] = useState('');
  const [cardborder, setcardborder] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [expiremonth, setexpiremonth] = useState(0);
  const [expireyear, setexpireyear] = useState('');
  const date = new Date();
  console.log(ProfileReducer?.fetchpassidResponse?.pass_id);

  useEffect(() => {
    let obj = {
      card_id: props?.route?.params?.cardid,
    };
    connectionrequest()
      .then(() => {
        dispatch(getcardRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, [isFocused]);

  function purchasefunction() {
    let check = cardExp.split('/');
    let checkmonth = check[0];
    console.log(cardNumber?.length);
    if (cardNumber == '') {
      Toast('Please enter your card number');
    } else if (cardNumber.length != 19) {
      Toast('Please enter valid card number');
    } else if (cardHolderName == '') {
      Toast('Please enter cardholder Name');
    } else if (cardExp == '') {
      Toast('Please enter your card expiry date');
    } else if (cardExp.length != 5) {
      Toast('Please enter your card expiry date in correct format');
    } else if (checkmonth > 12) {
      Toast('Please enter valid expiry month');
    }
    //      else if (expiremonth == '' ||expiremonth.length<2) {
    //   Toast('Please enter your card expiry month');
    //  }
    //  else if (Number(expiremonth) > 12) {
    //      Toast('Please enter valid expiry month');
    //      }
    //      else if (expireyear == ''||expireyear.length<4) {
    //   Toast('Please enter your card expiry year');
    //  }
    else if (cardCVC == '') {
      Toast('Please enter your card CVV number');
    } else if (cardCVC.length < 3) {
      Toast('CVC number should be 3 or 4 digit');
    } else {
      let exp = cardExp.split('/');
      let demo = [];
      demo = moment(date).format('y').split('');
      let month = exp[0];
      let year = exp[1];
      let res = cardNumber.replace(/ /g, '');
      let obj = {
        bar_owner_id: ProfileReducer?.fetchpassidResponse?.bar_owner_id,
        pass_id: ProfileReducer?.fetchpassidResponse?.id,
        card_no: Number(res),
        //  exp_month: Number(month),
        //  exp_year:Number(year),
        exp_month: month, // Number(expiremonth)<10?Number(0)+Number(expiremonth):Number(expiremonth),
        exp_year: demo[0] + demo[1] + year,
        cvc: cardCVC,
        amount: ProfileReducer?.fetchpassidResponse?.amount,
      };
      console.log(obj);
      connectionrequest()
        .then(() => {
          dispatch(purchaseRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }
  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getcardRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/getcardSuccess':
        status = ProfileReducer.status;
        console.log(ProfileReducer?.getcardResponse);
        // props.navigation.navigate('Signin')
        setCardNumber(ProfileReducer?.getcardResponse?.data?.card_no + '   ');
        setCardHolderName(
          ProfileReducer?.getcardResponse?.data?.card_holder_name,
        );
        setCardExp(ProfileReducer?.getcardResponse?.data?.exp_date);

        break;
      case 'Profile/getcardFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/purchaseRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/purchaseSuccess':
        status = ProfileReducer.status;
        // props.navigation.navigate('Signin')
        Toast('Pass purchased successfully');
        props.navigation.navigate('Wallet');
        console.log('hello');
        break;
      case 'Profile/purchaseFailure':
        status = ProfileReducer.status;
        break;
    }
  }

  return (
    <SafeAreaView style={{backgroundColor: Colors.darkblue, flex: 1}}>
      <Loader visible={ProfileReducer.status == 'Profile/purchaseRequest'} />
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
        <Text
          style={{
            color: Colors.white,
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(24),
          }}>
          Your<Text style={{color: Colors.pink}}> Passes</Text>
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: normalize(30)}}>
        {/* <View style={{width:'90%',alignSelf:'center',padding:normalize(15),backgroundColor:Colors.themeblue,
    marginTop:normalize(20),borderRadius:normalize(10)}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:Colors.pink,fontSize:normalize(15),fontFamily:Fonts.Poppins_Medium}}>{props?.route?.params?.senddata?.full_name}</Text>
        <Text style={{color:Colors.white,fontSize:normalize(11),fontFamily:Fonts.Poppins_Regular}}>Qty</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{ color: Colors.pink, fontSize: normalize(15), fontFamily: Fonts.Poppins_Medium,textTransform:'capitalize' }}>{ProfileReducer?.fetchpassidResponse?.message}</Text>
        <Text style={{color:Colors.white,fontSize:normalize(15),fontFamily:Fonts.Poppins_Bold}}>01</Text>
     </View>

     <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:normalize(10)}}>
        <Text style={{color:Colors.white,fontSize:normalize(11),fontFamily:Fonts.Poppins_Medium}}>Pass Holder</Text>
        <Text style={{color:Colors.white,fontSize:normalize(11),fontFamily:Fonts.Poppins_Regular}}>Use By</Text>
     </View>
     <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:normalize(10)}}>
        <Text style={{color:Colors.lightgreen,fontSize:normalize(11),fontFamily:Fonts.Poppins_Medium}}>{ProfileReducer?.profileResponse?.full_name}</Text>
              <Text style={{ color: Colors.lightgreen, fontSize: normalize(11), fontFamily: Fonts.Poppins_Regular }}>{moment(ProfileReducer?.fetchpassidResponse?.expired_at).format('D MMM yyyy')},
                {moment(ProfileReducer?.fetchpassidResponse?.expired_time,'h:mm').format('  hh:mm A')}</Text>
     </View>
     </View> */}

        {/* <View style={{width:'90%',alignSelf:'center',padding:normalize(15),backgroundColor:'#0E1648',
    marginTop:normalize(20),borderRadius:normalize(10)}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={Icons.payment} style={{width:normalize(16),height:normalize(16),resizeMode:'contain'}}/>
        <Text style={{color:Colors.lightpink,fontSize:normalize(13),fontFamily:Fonts.Poppins_Medium,marginLeft:normalize(10)}}>Payment Methods</Text>
        </View>
        
        <TouchableOpacity style={{width:normalize(25),height:normalize(25),backgroundColor:Colors.pink,borderRadius:normalize(4),
            alignItems:'center',justifyContent:'center'}}>
                <Image source={Icons.rightarrow} style={{width:normalize(5),height:normalize(15),resizeMode:'contain',
            transform:[{rotate:'270deg'}]}}/>
               </TouchableOpacity>
      </View>
      <View style={{width:'100%',paddingVertical:normalize(13),alignItems:'center',justifyContent:'center',
    backgroundColor:'#030721',borderRadius:normalize(8),marginTop:normalize(20)}}>
        <Text style={{color:Colors.white,fontSize:normalize(14),fontFamily:Fonts.Poppins_Medium}}>Add a New Payment Method</Text>

      </View>
      
     </View> */}
        <Text
          style={{
            color: '#858CB7',
            fontSize: normalize(15),
            fontFamily: Fonts.Poppins_Regular,
            textAlign: 'center',
            marginTop: normalize(15),
          }}>
          Make Payment
        </Text>
        <MaskInput
          style={[
            {
              letterSpacing: -0.03,
              fontSize: normalize(12),
              color: Colors.white,
              borderWidth: 1,
              borderColor:
                cardborder == 'card' ? Colors.pink : Colors.placeholder,
              paddingHorizontal: normalize(15),
              height: normalize(42),
              borderRadius: normalize(10),
              backgroundColor: '#0E1648',
              width: '90%',
              alignSelf: 'center',
              marginTop: normalize(10),
            },
          ]}
          placeholder="Enter Card Number"
          onFocus={() => setcardborder('card')}
          onBlur={() => setcardborder('')}
          placeholderTextColor={Colors.placeholder}
          keyboardType="numeric"
          value={cardNumber}
          mask={Masks.CREDIT_CARD}
          onChangeText={mask => setCardNumber(mask)}
        />
        <MaskInput
          style={[
            {
              letterSpacing: -0.03,
              fontSize: normalize(12),
              color: Colors.white,
              borderWidth: 1,
              borderColor:
                cardborder == 'cardhname' ? Colors.pink : Colors.placeholder,
              paddingHorizontal: normalize(15),
              height: normalize(42),
              borderRadius: normalize(10),
              backgroundColor: '#0E1648',
              width: '90%',
              alignSelf: 'center',
              marginTop: normalize(10),
            },
          ]}
          placeholder="Enter Card Holder Name"
          onFocus={() => setcardborder('cardhname')}
          onBlur={() => setcardborder('')}
          placeholderTextColor={Colors.placeholder}
          //   keyboardType="numeric"
          value={cardHolderName}
          //   mask={Masks.CREDIT_CARD}
          onChangeText={mask => setCardHolderName(mask)}
        />

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(10),
          }}>
          {/* <TextInputItem  placeholder={'Enter Expire Month'}
            width={'48%'}
            height={normalize(42)}
            borderWidth={1}
            marginTop={normalize(0)}
            value={expiremonth}
            onChangeText={(val)=>setexpiremonth(val)}
           textColor={Colors.white}
           placeholderTextColor={Colors.placeholder}
           isRightIconVisible={false}
                        fontSize={normalize(11)}
                        maxLength={2}
                        backgroundColor={'#0E1648'}
                        borderRadius={normalize(10)}
              marginBottom={0}
              keyboardType={"numeric"}
              
                    />
                     <TextInputItem  placeholder={'Enter Expire Year'}
            width={'48%'}
            height={normalize(42)}
            borderWidth={1}
            marginTop={normalize(0)}
            value={expireyear}
            onChangeText={(val)=>setexpireyear(val)}
           textColor={Colors.white}
           placeholderTextColor={Colors.placeholder}
           isRightIconVisible={false}
                        fontSize={normalize(11)}
                        maxLength={4}
                        backgroundColor={'#0E1648'}
              borderRadius={normalize(10)} marginBottom={0}
              keyboardType={"numeric"}
            /> */}

          {/* <MaskInput
              style={[
                {
                  letterSpacing: -0.03,
                  fontSize: normalize(12),
                      color: Colors.white,
                      borderWidth: 1,
                      borderColor:cardborder=='cardcvc'?Colors.pink: Colors.placeholder,
                      paddingHorizontal: normalize(15),
                      height: normalize(42),
                      borderRadius: normalize(10),
                      backgroundColor: '#0E1648',
                      width: '48%',
                      alignSelf: 'center', marginTop: normalize(10),
                  
                },
              ]}
                    placeholder="CVV"
                    onFocus={() => setcardborder('cardcvc')}
                    onBlur={()=>setcardborder('')}
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
              value={cardCVC}
               mask={cvvl}
              onChangeText={mask => setCardCVC(mask)}
                /> */}
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(10),
          }}>
          <MaskInput
            style={[
              {
                letterSpacing: -0.03,
                fontSize: normalize(12),
                color: Colors.white,
                borderWidth: 1,
                borderColor:
                  cardborder == 'cardexp' ? Colors.pink : Colors.placeholder,
                paddingHorizontal: normalize(15),
                height: normalize(42),
                borderRadius: normalize(10),
                backgroundColor: '#0E1648',
                width: '48%',
                alignSelf: 'center', //marginTop: normalize(10),
              },
            ]}
            placeholder="Expire MM/YY"
            onFocus={() => setcardborder('cardexp')}
            onBlur={() => setcardborder('')}
            placeholderTextColor={Colors.placeholder}
            keyboardType="numeric"
            value={cardExp}
            mask={expirel}
            onChangeText={mask => setCardExp(mask)}
          />

          <MaskInput
            style={[
              {
                letterSpacing: -0.03,
                fontSize: normalize(12),
                color: Colors.white,
                borderWidth: 1,
                borderColor:
                  cardborder == 'cardcvc' ? Colors.pink : Colors.placeholder,
                paddingHorizontal: normalize(15),
                height: normalize(42),
                borderRadius: normalize(10),
                backgroundColor: '#0E1648',
                width: '48%',
                alignSelf: 'center',
              },
            ]}
            placeholder="CVV"
            onFocus={() => setcardborder('cardcvc')}
            onBlur={() => setcardborder('')}
            placeholderTextColor={Colors.placeholder}
            keyboardType="numeric"
            value={cardCVC}
            // mask={cvvl}
            maxLength={4}
            onChangeText={mask => setCardCVC(mask)}
          />
        </View>

        <TouchableOpacity
          // onPress={()=>props.navigation.navigate('Passdetails')}
          //   onPress={()=>props.navigation.navigate('Wallet')}
          onPress={() => purchasefunction()}
          style={{
            width: '90%',
            paddingVertical: normalize(13),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.pink,
            borderRadius: normalize(8),
            marginTop: normalize(20),
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(16),
              fontFamily: Fonts.Poppins_Medium,
            }}>
            Purchase
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

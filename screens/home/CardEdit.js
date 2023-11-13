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
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MaskInput, {Masks} from 'react-native-mask-input';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import Loader from '../../utils/helpers/Loader';
import TextInputItem from '../../components/TextInputItem';
import TextInputItem1 from '../../components/Textinputitem1';
import {useDispatch, useSelector} from 'react-redux';
import ButtonItems from '../../components/ButtonItems';
import MyStatusBar from '../../utils/MyStatusBar';
import {addCardRequest, getCardRequest} from '../../redux/reducer/HomeReducer';
import {updatecardRequest} from '../../redux/reducer/ProfileReducer';
export default function CardEdit(props) {
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  console.log('params', props.route.params.primary);
  const dispatch = useDispatch();
  const expirel = [/\d/, /\d/, '/', /\d/, /\d/];
  const cvvl = [/\d/, /\d/, /\d/];
  const [cardNumber, setCardNumber] = useState(props.route.params.number);
  const [cardHolderName, setCardHolderName] = useState(props.route.params.name);
  const [cardExp, setCardExp] = useState(props.route.params.exp);
  const [cardCVC, setCardCVC] = useState('');
  const [cardborder, setcardborder] = useState('');
  const [primary, setPrimary] = useState(false);
  useEffect(()=>{
    if(
      props.route.params.primary == 1 
    ){
      setPrimary(true)
    }
    
  },[])
  console.log("cardno",cardNumber);
  function addCard() {
    let check = cardExp.split('/');
    let checkmonth = check[0];
    if (cardNumber == '') {
      showErrorAlert('Please enter your card number');
    } else if (cardNumber.length < 16) {
      showErrorAlert('Please enter Valid Card Number');
    } else if (cardHolderName == '') {
      showErrorAlert('Please enter card holder name');
    } else if (cardExp == '') {
      showErrorAlert('Please enter your card expiry date');
    } else if (cardExp.length != 5) {
      showErrorAlert('Please enter your card expiry date in correct format');
    } else if (checkmonth > 12) {
      showErrorAlert('Please enter valid expiry month');
    }
    // else if (cardNumber.length<16 ){
    //   showErrorAlert('Please enter Valid Card Number');
    // }
    else {
      let obj = new FormData();
      obj.append('id', props.route.params.id);
      obj.append('card_holder_name', cardHolderName);
      obj.append('card_no', Number(cardNumber.replace(/\s/g, '')));
      obj.append('exp_date', cardExp);
      obj.append('is_primary', primary == true ? 1 : 0)
      connectionrequest()
        .then(() => {
          console.log('0bh', obj);
          dispatch(updatecardRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }
  useEffect(() => {
    if (ProfileReducer.status == 'Profile/updatecardSuccess') {
      connectionrequest()
        .then(() => {
          dispatch(getCardRequest());
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }, [ProfileReducer.status]);

  return (
    <>
      <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
      <SafeAreaView style={{backgroundColor: Colors.darkblue, flex: 1}}>
        <Loader
          visible={ProfileReducer.status == 'Profile/updatecardRequest'}
        />
        <View
          style={{
            height: normalize(60),
            // flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',
            paddingHorizontal: normalize(15),
            backgroundColor: Colors.themeblue,
            marginTop: Platform.OS == 'android' ? STATUSBAR_HEIGHT : null,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '70%',
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
              Edit<Text style={{color: Colors.pink}}> Card</Text>
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: normalize(30),
            paddingTop: normalize(15),
          }}>
          {/* <Text
            style={{
              color: '#7c83ad',
              fontSize: normalize(20),
              alignSelf: 'center',
              marginVertical: normalize(15),
            }}>
            Add Card
          </Text> */}
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
                  alignSelf: 'center',
                  marginTop: normalize(10),
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
            {/* <MaskInput
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
                  marginTop: normalize(10),
                },
              ]}
              placeholder="CVV"
              onFocus={() => setcardborder('cardcvc')}
              onBlur={() => setcardborder('')}
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
              value={cardCVC}
              mask={cvvl}
              onChangeText={mask => setCardCVC(mask)}
            /> */}
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: normalize(12),
            }}>
            <TextInputItem width={'48%'} placeholder="MM/YY" />
            <TextInputItem width={'48%'} placeholder="MM/YY" />
          </View> */}
           <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: normalize(14),
              marginTop: normalize(14),
            }}>
            <TouchableOpacity
              onPress={() => setPrimary(!primary)}
              style={{
                width: normalize(20),
                height: normalize(20),
                backgroundColor: '#4C24BE',
                borderRadius: normalize(5),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
              }}>
              {primary && (
                <Image
                  source={Icons.tickimg}
                  style={{
                    width: normalize(8),
                    height: normalize(8),
                    resizeMode: 'contain',
                    tintColor: '#fff',
                  }}
                />
              )}
            </TouchableOpacity>
            <Text style={{color: '#fff', marginLeft: normalize(10)}}>
              Make this your primary card
            </Text>
          </View>
          <ButtonItems
            textbutton={'Update'}
            width={normalize(290)}
            height={normalize(48)}
            onPress={() => addCard()}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

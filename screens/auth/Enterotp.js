import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import TextInputItem from '../../components/TextInputItem';
import {
  otpverificationRequest,
  otpverificationSuccess,
  otpverificationFailure,
  forgotpasswordRequest,
} from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import Loader from '../../utils/helpers/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
let status = '';
export default function Enterotp(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [email, setemail] = useState('');
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  // const inputRef5 = useRef(null);
  // const inputRef6 = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');

  function otpfunction() {
    //   onPress={()=>props.navigation.navigate('ChangePassword')}
    if (pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '') {
      showErrorAlert('Please enter otp');
    } else {
      let obj = {
        otp: Number(pin1 + pin2 + pin3 + pin4),
        email: props?.route?.params?.email,
      };
      connectionrequest()
        .then(() => {
          dispatch(otpverificationRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
      console.log('Submitted DATA: ', obj.otp);
    }
  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/otpverificationRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/otpverificationSuccess':
        status = AuthReducer.status;
        console.log('hiiii', AuthReducer?.otpverificationResponse);
        props.navigation.navigate('ChangePassword')
        // props.navigation.navigate('ChangePassword', {
        //   emailid: props?.route?.params?.email,
        // });
        // props.navigation.navigate('Changepassword', {
        //   email: props?.route?.params?.email,
        // });
        break;
      case 'Auth/otpverificationFailure':
        status = AuthReducer.status;
        console.log(AuthReducer?.response);
        break;
    }
  }

  function resendotp() {
    if (props?.route?.params?.email != '') {
      let obj = {
        email: props?.route?.params?.email,
      };
      connectionrequest()
        .then(() => {
          console.log(obj);
          dispatch(forgotpasswordRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }
  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: '#270C74'}}>
        <MyStatusBar backgroundColor={'#452487'} />
      <KeyboardAvoidingView
        style={Styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Loader
          visible={
            AuthReducer.status == 'Auth/otpverificationRequest' ||
            AuthReducer.status == 'Auth/forgotpasswordRequest'
          }
        />
        <TouchableOpacity
            style={{
              position: 'absolute',
              left: normalize(10),
              top: normalize(10),
              zIndex: 999,
              marginTop: normalize(6),
              height: normalize(30),
              width: normalize(30),
              borderRadius: normalize(6),
              backgroundColor: '#D73F9D',
              // alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: normalize(5),
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
       
        <ImageBackground
          source={Icons.BgImage}
          resizeMode="stretch"
          style={Styles.backBg}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              position: 'absolute',
              marginTop: Platform.OS == 'ios' ? normalize(15) : normalize(30),
              marginLeft: normalize(10),
            }}>
            {/* <Image
              source={Icons.left}
              style={{
                width: normalize(20),
                height: normalize(20),
                resizeMode: 'stretch',
                tintColor: Colors.white,
              }}
            /> */}
          </TouchableOpacity>
          <Image source={Icons.Whitelogo} style={Styles.logo} />
        </ImageBackground>
        {/* <View style={Styles.whiteLogoconatiner}>
     <Image  source={Icons.Whitelogo}
     style={Styles.logo}
     />
     </View> */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={Styles.FlexConatiner}
          contentContainerStyle={{paddingBottom: normalize(40)}}>
          <View style={Styles.lockcontainer}>
            <Image source={Icons.Lock} style={Styles.lockImasge} />
          </View>
          <Text style={Styles.signIntxt}>
            Forgot Your<Text style={Styles.PassTxt}> Password?</Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: '#B9A4F4',
              fontFamily: Fonts.Poppins_Regular,
              marginTop: normalize(10),
            }}>
            Enter OTP to reset password.
          </Text>
          <View style={Styles.optcontainer}>
            <TextInput
              placeholder="-"
              placeholderTextColor="#8E6BF2"
              style={Styles.textInput}
              ref={inputRef1}
              value={pin1}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin1(val);
                if (!pin1.length > 0) {
                  inputRef2.current.focus();
                }
              }}
            />
            <TextInput
              placeholder="-"
              placeholderTextColor="#8E6BF2"
              style={Styles.textInput}
              ref={inputRef2}
              value={pin2}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin2(val);
                if (!pin2.length > 0) {
                  inputRef3.current.focus();
                } else {
                  inputRef1.current.focus();
                }
              }}
            />
            <TextInput
              placeholder="-"
              placeholderTextColor="#8E6BF2"
              style={Styles.textInput}
              ref={inputRef3}
              value={pin3}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin3(val);
                if (!pin3.length > 0) {
                  inputRef4.current.focus();
                } else {
                  inputRef2.current.focus();
                }
              }}
            />
            <TextInput
              placeholder="-"
              placeholderTextColor="#8E6BF2"
              style={Styles.textInput}
              ref={inputRef4}
              value={pin4}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin4(val);
                if (!pin4.length > 0) {
                  inputRef4.current.focus();
                } else {
                  inputRef3.current.focus();
                }
              }}
            />
          </View>
          <TouchableOpacity
            // onPress={() => otpfunction()}
            onPress={() => otpfunction()}
            style={Styles.SignInButton}>
            <Text style={Styles.BtnTxt}>Submit</Text>
          </TouchableOpacity>
          
        
          {/* <TouchableOpacity
            onPress={() => resendotp()}
            style={{alignSelf: 'center', marginTop: normalize(15)}}>
            <Text style={[Styles.BtnTxt, {color: Colors.placeholder}]}>
              Resend Otp?
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBg: {
    width: '100%',
    height: normalize(300),
  },
  whiteLogoconatiner: {
    position: 'absolute',
    left: '30%',
    right: 0,
    top: normalize(30),
  },
  logo: {
    resizeMode: 'contain',
    width: normalize(80),
    height: normalize(80),
    alignSelf: 'center',
    marginTop: normalize(50),
  },
  FlexConatiner: {
    flex: 1,
    backgroundColor: '#270C74',
    borderTopRightRadius: normalize(5),
    width: '100%',
    paddingHorizontal: normalize(10),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    marginTop: normalize(-140),
  },
  signIntxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: normalize(20),
    fontFamily: Fonts.Poppins_Regular,
  },
  inputField: {
    borderWidth: normalize(0.5),
    borderColor: '#39458C',
    padding: normalize(15),
    borderRadius: normalize(5),
    marginTop: normalize(20),
  },
  passwordContainer: {
    borderColor: '#39458C',
    borderWidth: normalize(0.5),
    padding: normalize(15),
    borderRadius: normalize(5),
    marginTop: normalize(20),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  remIamge: {
    resizeMode: 'contain',
    width: normalize(38),
  },
  SignInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#D73F9D',
    padding: normalize(13),
    borderRadius: normalize(10),
    marginTop: normalize(20),
    width: normalize(285),
    alignSelf: 'center',
  },
  BtnTxt: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(14),
  },
  PassTxt: {
    color: '#D73F9D',
  },
  lockcontainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    // margin: normalize(20),
    height: normalize(50),
    width: normalize(50),
    backgroundColor: '#3E19A5',
    borderRadius: normalize(25),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(70),
    marginBottom: normalize(20),
  },
  lockImasge: {
    resizeMode: 'contain',
    width: normalize(16),
  },
  optcontainer: {
    // textAlign:'center',
    // color:'#B9A4F4',
    // fontFamily:Fonts.Poppins_Regular,
    marginTop: normalize(10),
    flexDirection: 'row',
    // width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'space-between',
    alignSelf: 'center',
  },
  textInput: {
    borderWidth: normalize(0.5),
    borderColor: '#39458C',
    width: normalize(50),
    height: normalize(50),
    margin: normalize(14),
    padding: normalize(8),
    borderRadius: normalize(8),
    fontSize: normalize(16),
    textAlign: 'center',
    color: Colors.white,
    backgroundColor: '#4C24BE',
  },
});

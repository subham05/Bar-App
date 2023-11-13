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
import React, {useEffect, useState} from 'react';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import TextInputItem from '../../components/TextInputItem';
import {
  forgotpasswordRequest,
  forgotpasswordSuccess,
  forgotpasswordFailure,
} from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import Loader from '../../utils/helpers/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';

let status = '';
export default function ForgotPass(props) {
  const [email, setemail] = useState('');
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  function resetpassword() {
    if (email == '') {
      showErrorAlert('Please enter your email');
    } else if (!regex.test(email)) {
      showErrorAlert('Please enter correct email');
    } else {
      let obj = {
        email: email,
        role: 'USER',
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
    // onPress={() => props.navigation.navigate('Enterotp')}
  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/forgotpasswordRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/forgotpasswordSuccess':
        status = AuthReducer.status;
        // console.log('signupsuccess');
        // showErrorAlert('abc')
        props.navigation.navigate('Enterotp', {
          email: email,
        });
        break;
      case 'Auth/forgotpasswordFailure':
        status = AuthReducer.status;
        break;
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
            visible={AuthReducer.status == 'Auth/forgotpasswordRequest'}
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
            {/* <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              position: 'absolute',
              marginTop: Platform.OS == 'ios' ? normalize(15) : normalize(30),
              marginLeft: normalize(10),
            }}>
            <Image
              source={Icons.left}
              style={{
                width: normalize(20),
                height: normalize(20),
                resizeMode: 'stretch',
                tintColor: Colors.white,
              }}
            />
          </TouchableOpacity> */}
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: normalize(40)}}>
            <View style={Styles.lockcontainer}>
              <Image source={Icons.Lock} style={Styles.lockImasge} />
            </View>
            <Text style={Styles.signIntxt}>
              Forgot Your<Text style={Styles.PassTxt}> Password?</Text>
            </Text>
            <Text style={Styles.optcontainer}>Send OTP To Your Email ID</Text>
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Email Address'}
              width={'100%'}
              height={normalize(48)}
              borderRadius={normalize(12)}
              borderWidth={1}
              marginTop={normalize(60)}
              value={email}
              onChangeText={val => setemail(val)}
              textColor={Colors.white}
              placeholderTextColor={'#8E6BF2'}
              // isRightIconVisible={true}
            />
            <TouchableOpacity
              // onPress={() => resetpassword()}
              onPress={() => resetpassword()}
              style={Styles.SignInButton}>
              <Text style={Styles.BtnTxt}>Reset My Password</Text>
            </TouchableOpacity>
          
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
    padding: normalize(12),
    borderRadius: normalize(10),
    marginTop: normalize(5),
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
    textAlign: 'center',
    color: '#B9A4F4',
    fontFamily: Fonts.Poppins_Regular,
    marginTop: normalize(5),
  },
});

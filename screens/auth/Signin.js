import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, Fragment, useEffect} from 'react';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import TextInputItem from '../../components/TextInputItem';
import MyStatusBar from '../../utils/MyStatusBar';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import Toast from '../../utils/helpers/Toast';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  socialLoginRequest,
  socialLoginSuccess,
  socialLoginFailure,
  storePreviousUserPassword,
} from '../../redux/reducer/AuthReducer';
import constants from '../../utils/helpers/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
let status = '';
import {getDeviceToken} from '../../utils/helpers/FirebaseToken';
import onFacebookLogin from '../../utils/helpers/Facebook';
import AppleLogin from '../../utils/helpers/AppleLogin';
import Loader from '../../utils/helpers/Loader';
import {useIsFocused} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import {SafeAreaView} from 'react-native-safe-area-context';
const Signin = props => {
  const [email, setemail] = useState('');
  const isFocused = useIsFocused();
  const [password, setpassword] = useState('');
  const [remember, setremember] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [iconvisible, seticonvisible] = useState(true);
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [], // [Android] what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '594329425828-huqabhu4gqeqq2bsk3fdhq0tmi6oiqs3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '',
    });
  }, [isFocused]);

  const onPressGoogleLogin = async () => {
    try {
      console.log('hii');
      await GoogleSignin.hasPlayServices();
      console.log('hello');
      const userInfo = await GoogleSignin.signIn();
      // setsocialdata(await GoogleSignin.signIn());
      //   setsocialdata(userInfo);
      console.log(userInfo);
      let obj = {
        full_name: userInfo.user.givenName + ' ' + userInfo.user.familyName,
        provider_id: userInfo.user.id,
        email: userInfo.user.email,
        provider: 'google',
        device_token: '123456',
        device_type: Platform.OS,
      };
      console.log('plplplplpl', obj);
      // set;
      console.log(obj);

      dispatch(socialLoginRequest(obj));
      //   setIsFocused(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/loginRequest':
        status = AuthReducer.status;
        break;
      case 'Auth/loginSuccess':
        status = AuthReducer.status;

        if (AuthReducer.loginResponse.is_previous_user == 1) {
          props.navigation.navigate('Signup2');
        } else {
          Toast('Login Successful');
        }

        //    console.log('signupsuccess');
        //     showErrorAlert('User registration successfully completed')
        // props.navigation.navigate('TabNavigator');
        break;
      case 'Auth/loginFailure':
        status = AuthReducer.status;
        break;
    }
  }
  useEffect(() => {
    AsyncStorage.getItem(constants.WHICHCREADS)
      .then(E => {
        if (E && E != '') {
          console.log(E);
          const jsonRes = JSON.parse(E);
          console.log(jsonRes, 'hihihihh');
          setemail(jsonRes?.email ?? '');
          setpassword(jsonRes?.password ?? '');
          setremember(true);
        }
      })
      .catch(E => {
        console.log(E);
      });
  }, []);
  function signinfunction() {
    // onPress={()=>props.navigation.navigate('TabNavigator')}
    if (email == '') {
      showErrorAlert('Please enter your Email Id');
    } else if (!regex.test(email)) {
      showErrorAlert('Please enter correct Email Id');
    } else if (password == '') {
      showErrorAlert('Please enter password');
    } else if (password.length < 8) {
      showErrorAlert('Please enter atleast 8 character password');
    } else {
      let obj = {
        savePassword: remember,
        creads: {
          email: email.toLocaleLowerCase(),
          password: password,
          device_token: AuthReducer?.fcmResponse,
          device_type: Platform.OS,
        },
      };
      connectionrequest()
        .then(() => {
          console.log(obj);
          dispatch(loginRequest(obj));
          
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
        dispatch(storePreviousUserPassword(password))
    }
  }
  function onAppleButtonPress(val) {
    console.log('Data : ', val);
    const data = jwt_decode(val?.identityToken, {
      header: false,
    });
    console.log('email1', data);
    let obj = {
      full_name:
        val?.fullName?.givenName == null
          ? ''
          : val?.fullName?.givenName + ' ' + val?.fullName?.familyName == null
          ? ''
          : val?.fullName?.familyName,
      // last_name:
      //   val?.fullName?.familyName == null ? '' : val?.fullName?.familyName,
      provider_id: val?.user,
      email: val?.email == null ? data?.email : val?.email,
      provider: 'apple',
      device_token: '123456',
      device_type: Platform.OS,
    };
    console.log(obj);
    dispatch(socialLoginRequest(obj));
    console.log('hihihihih');
    // })
    // .catch(err => {
    //   console.log(err);
    //   showErrorAlert('Please connect to internet');
    // });
  }
  function onPressFacebook() {
    onFacebookLogin()
      .then(res => {
        let obj = {
          full_name: res.first_name + ' ' + res.last_name,
          provider_id: res.id,
          email: res.email,
          provider: 'facebook',
          device_token: '123456',
          device_type: Platform.OS,
        };
        console.log(obj);
        console.log(JSON.stringify(obj));
        dispatch(socialLoginRequest(obj));
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#270C74'}}>
        <MyStatusBar backgroundColor={'#452487'} />
        <KeyboardAvoidingView
          style={Styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <Loader visible={AuthReducer.status == 'Auth/loginRequest'} />

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
            <Text style={Styles.signIntxt}>Sign In</Text>
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Enter Your Email ID'}
              width={'100%'}
              borderRadius={normalize(12)}
              height={normalize(48)}
              borderWidth={1}
              marginTop={normalize(20)}
              value={email}
              onChangeText={val => setemail(val)}
              textColor={Colors.white}
              placeholderTextColor={'#8e6bf2'}
              isRightIconVisible={false}
              fontSize={normalize(11)}
            />

            <TextInputItem
              viewbordercolor="red"
              placeholder={'Enter Password'}
              width={'100%'}
              borderRadius={normalize(12)}
              height={normalize(48)}
              borderWidth={1}
              // marginTop={normalize(5)}
              value={password}
              onChangeText={val => setpassword(val)}
              textColor={Colors.white}
              placeholderTextColor={'#8e6bf2'}
              isRightIconVisible={true}
              fontSize={normalize(11)}
              rightimage={iconvisible ? Icons.hide : Icons.Show}
              onrightimpress={() => seticonvisible(!iconvisible)}
              isSecure={iconvisible}
            />

            <View style={[Styles.rememberContainer]}>
              {/* <Image source={Icons.Rem}
              style={Styles.remIamge}
              /> */}
              <TouchableOpacity
                onPress={() => setremember(!remember)}
                style={{
                  width: normalize(35),
                  height: normalize(18),
                  backgroundColor: remember ? '#D73F9D' : '#3E19A5',
                  borderRadius: normalize(13),
                  paddingHorizontal: normalize(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: normalize(14),
                    width: normalize(14),
                    backgroundColor: Colors.white,
                    borderRadius: normalize(10),
                    marginLeft:
                      remember == true ? normalize(13) : normalize(-3),
                  }}
                />
                {/* <View
              style={{
                height: normalize(16),
                width: normalize(16),
                backgroundColor: remember == true ? Colors.pink : '#39458C',
                borderRadius: normalize(8),
              }}
            /> */}
              </TouchableOpacity>
              <Text style={Styles.Remtxt}>Remember</Text>
              <TouchableOpacity
                style={Styles.ForgotPass}
                onPress={() => props.navigation.navigate('ForgotPass')}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: normalize(12),
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => signinfunction()}
                // onPress={() => signinfunction()}
                style={Styles.SignInButton}>
                <Text style={Styles.BtnTxt}>Sign in</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={Styles.borderFlex}>
          <View style={Styles.borderLeft}></View>
          <Text style={Styles.txtx}>Or Continue With</Text>
          <View style={Styles.borderLeft}></View>
        </View> */}
            {/* <View style={Styles.socialIocn}>
          <TouchableOpacity
            onPress={
              () =>
                //onPressGoogleLogin()
                // connectionrequest()
                //   .then(() => {
                //     getDeviceToken()
                //       .then(token => {
                //         onPressGoogleLogin(token);
                //       })
                //       .catch(() => {
                onPressGoogleLogin()
              //     });
              // })

              // .catch(() => {
              //   showErrorAlert('Please connect your internet');
              // })
            }
            style={{marginRight: normalize(8)}}>
            <Image source={Icons.google} style={Styles.social} />
          </TouchableOpacity>
       
          <AppleLogin
            OnDone={val => {
              // connectionrequest()
              //   .then(() => {
              //     getDeviceToken()
              //       .then(token => {
              //         onAppleButtonPress(token, val);
              //       })
              //       .catch(() => {
              onAppleButtonPress(val);
              //     });
              // })

              // .catch(() => {
              //   showErrorAlert('Please connect your internet');
              // });
            }}
          />
        </View> */}
            <View style={Styles.dontAcco}>
              <Text style={Styles.stxt}>Don’t have an account?</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Signup',{next:false})}
                style={{marginLeft: normalize(10)}}>
                <Text style={Styles.sstxt}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBg: {
    // flex:1
    width: '100%',
    height: normalize(300),
  },
  whiteLogoconatiner: {
    position: 'absolute',
    left: '30%',
    right: 0,
    top: normalize(50),
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
    marginTop: normalize(40),
  },
  inputField: {
    borderWidth: normalize(0.5),
    borderColor: '#D73F9D',
    padding: normalize(15),
    borderRadius: normalize(5),
    marginTop: normalize(40),
  },
  passwordContainer: {
    borderColor: '#39458C',
    borderWidth: normalize(0.5),
    padding: normalize(15),
    borderRadius: normalize(5),
    marginTop: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  Remtxt: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
    marginLeft: normalize(10),
    fontSize: normalize(12),
  },
  ForgotPass: {
    position: 'absolute',
    right: 0,
  },
  SignInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#D73F9D',
    padding: normalize(12),
    borderRadius: normalize(10),
    marginTop: normalize(20),
  },
  BtnTxt: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(14),
  },
  borderFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(30),
    alignItems: 'center',
  },
  borderLeft: {
    width: normalize(80),
    height: normalize(1),
    backgroundColor: '#3E19A5',
  },
  txtx: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
  },
  socialIocn: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    alignSelf: 'center',
    marginTop: normalize(15),
    marginBottom: normalize(15),
  },
  social: {
    resizeMode: 'contain',
    width: normalize(40),
    height: normalize(40),
  },
  dontAcco: {
    flexDirection: 'row',
    marginTop: normalize(24),
    justifyContent: 'center',
  },
  stxt: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#fff',
    fontSize: normalize(12),
  },
  sstxt: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#D73F9D',
    fontSize: normalize(12),
  },
});
export default Signin;

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
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
import {
  cmsdataRequest,
  cmsdataSuccess,
  cmsdataFailure,
} from '../../redux/reducer/AuthReducer';
import constants from '../../utils/helpers/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
let status = '';
import RenderHTML from 'react-native-render-html';
// import { getDeviceToken } from '../../utils/helpers/FirebaseToken'
import onFacebookLogin from '../../utils/helpers/Facebook';
import AppleLogin from '../../utils/helpers/AppleLogin';
import Loader from '../../utils/helpers/Loader';
import {useIsFocused} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
const Cmspage = props => {
  const {width} = useWindowDimensions();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  useEffect(() => {
    let obj = {
      slug: 'terms-conditions',
    };
    connectionrequest()
      .then(() => {
        dispatch(cmsdataRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, [isFocused]);

  //    if (status == '' || AuthReducer.status != status) {
  // switch (AuthReducer.status) {
  //   case 'Auth/loginRequest':
  //     status = AuthReducer.status;
  //     break;

  //   case 'Auth/loginSuccess':
  //     status = AuthReducer.status;
  //     break;
  //   case 'Auth/loginFailure':
  //     status = AuthReducer.status;
  //     break;

  // }
  //    }

  return (
    <KeyboardAvoidingView
      style={Styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Loader visible={AuthReducer.status == 'Auth/cmsdataRequest'} />

      <MyStatusBar backgroundColor={Colors.darkblue} />
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
        <Image source={Icons.Whitelogo} style={Styles.logo} />
      </ImageBackground>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={Styles.FlexConatiner}
        contentContainerStyle={{paddingBottom: normalize(40)}}>
        <Text style={Styles.signIntxt}>Terms & Condition</Text>

        {/* <Text style={{
                  color: Colors.white, fontSize: normalize(11), fontFamily: Fonts.Poppins_Medium,
              marginTop:normalize(15)}}>
                  {AuthReducer?.cmsdataResponse?.data?.text_content}
        </Text> */}
        <RenderHTML
          contentWidth={width}
          source={{
            html: AuthReducer?.cmsdataResponse?.data?.text_content,
          }}
          tagsStyles={tagsStyles}
          enableExperimentalMarginCollapsing={true}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const tagsStyles = {
  p: {
    color: Colors.white,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(12),
  },
  h1: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  h2: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  li: {
    color: Colors.white,
  },
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
    backgroundColor: '#060C30',
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
    marginTop: normalize(10),
  },
});
export default Cmspage;

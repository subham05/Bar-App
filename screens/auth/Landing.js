import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import RenderHtml from 'react-native-render-html';
import {Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MyStatusBar from '../../utils/MyStatusBar';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {cmsdataRequest} from '../../redux/reducer/AuthReducer';
export default function Landing(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const {width} = useWindowDimensions();
  const systemfonts = [Fonts.Poppins_Medium];
  function openTerms() {
    setToggle(true);
    connectionrequest()
      .then(() => {
        dispatch(cmsdataRequest({slug: 'terms-conditions'}));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  return (
    <>
      <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
      <SafeAreaView style={{flex:1,backgroundColor:'#060C30'}}>
      <ImageBackground
        style={{flex: 1}}
        resizeMode="stretch"
        source={Icons.landingnew}>
        <ScrollView style={Styles.mainContainer}>
          <View style={Styles.IamgeConatiner}>
            <Image source={Icons.Logo} style={Styles.logoImage} />
          </View>
          <View style={Styles.lancontainer}>
            <Image source={Icons.Glass} style={Styles.galssimage} />
          </View>
          <Text style={Styles.regularTxt}>Start Enjoying Your</Text>
          <Text style={Styles.boldtxt}>Night Life Now</Text>
          {/* end maincontainer */}
          <View style={Styles.btnConatiner}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signin')}
              style={Styles.signInBtn}>
              <Text style={Styles.btnTxt}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup',{next:false})}
              style={Styles.signupBtn}>
              <Text style={Styles.signuptxt}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Signin')}
          style={Styles.signInBtn}>
          <Text style={Styles.btnTxt}>Sign in</Text>
        </TouchableOpacity> */}
          {/* <View style={Styles.ArrowCoantiner}> */}
          {/* <TouchableOpacity
              onPress={()=>props.navigation.navigate('Signin')}
              style={Styles.ArrowCoantiner}><Text
        style={Styles.Skiptxt}
              >Skip</Text>
               <Image source={Icons.rightdouble}
        style={Styles.skipImage}
        /></TouchableOpacity> */}

          {/* </View> */}
          <View style={Styles.termsContainer}>
            <Text style={Styles.tremstxt}>
            I agree to the Terms and Conditions
            </Text>
            <TouchableOpacity onPress={() => openTerms()}>
              <Text style={Styles.conditionTxt}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            display: toggle ? 'flex' : 'none',
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
          }}>
          <ScrollView
            contentContainerStyle={{paddingVertical: normalize(20)}}
            style={{padding: 20, backgroundColor: '#060C30'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: normalize(20),
                  fontFamily: Fonts.Poppins_Bold,
                  color: 'white',
                }}>
                Terms & Conditions
              </Text>
              <TouchableOpacity
                onPress={() => setToggle(false)}
                style={{
                  height: normalize(24),
                  width: normalize(24),
                  borderRadius: 30,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                
                }}>
                <Image
                  style={{height: normalize(20), width: normalize(20)}}
                  source={Icons.cross}
                />
              </TouchableOpacity>
            </View>
            <RenderHtml
              source={{html: AuthReducer?.cmsdataResponse?.data?.text_content}}
              contentWidth={'100%'}
              systemFonts={systemfonts}
              tagsStyles={{
                p: {fontFamily: Fonts.Poppins_Regular, color: Colors.white},
              }}
            />
          </ScrollView>
        </View>
      </ImageBackground>
      </SafeAreaView>
    </>
  );
}
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor:'#270C74'
  },
  IamgeConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 190,
  },
  logoImage: {
    resizeMode: 'contain',
    width: 190,
  },
  lancontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  galssimage: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
    marginTop: 30,
  },
  regularTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: normalize(22),
    letterSpacing: 0.2,
    marginTop: normalize(30),
  },
  boldtxt: {
    fontSize: normalize(20),
    textAlign: 'center',
    color: '#D73F9D',
    fontWeight: 'bold',
    fontFamily: Fonts.Poppins_Bold,
  },
  btnConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(20),
    backgroundColor: '#0E1648',
    height: normalize(50),
    width: '80%',
    alignSelf: 'center',
    borderRadius: normalize(12),
  },
  signInBtn: {
    backgroundColor: '#0E1648',
    width: '50%',
    height: '100%',
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: normalize(15),
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
  },
  signuptxt: {
    textAlign: 'center',
    fontSize: normalize(15),
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
  },
  signupBtn: {
    backgroundColor: '#D73F9D',
    width: '50%',
    height: normalize(48),
    borderRadius: normalize(12),
    // alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: normalize(30),
  },
  ArrowCoantiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(18),
  },
  skipImage: {
    resizeMode: 'contain',
    width: normalize(12),
    marginLeft: normalize(5),
  },
  Skiptxt: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(14),
  },
  tremstxt: {
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Regular,
    color: '#fff',
    fontSize: normalize(10),
  },
  conditionTxt: {
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(10),
    color: '#D73F9D',
  },
  termsContainer: {
    marginTop: normalize(70),
    marginBottom: normalize(20),
  },
});

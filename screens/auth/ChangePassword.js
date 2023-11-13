// import { View,
//     Text,
//     ImageBackground,
//     StyleSheet,
//     Image,
//     TextInput,
//     TouchableOpacity,
//      } from 'react-native'
//     import React from 'react'
//     import { Icons } from '../../themes/ImagePath'
//     import { Fonts } from '../../themes/fonts'
//     import normalize from '../../utils/helpers/dimen'

//     const ChangePassword = (props) => {
//       return (
//         <View style={Styles.container}>
//          <ImageBackground source={Icons.BgImage} resizeMode='cover'
//          style={Styles.backBg}
//          />
//          <View style={Styles.whiteLogoconatiner}>
//          <Image  source={Icons.Whitelogo}
//          style={Styles.logo}
//          />
//          </View>
//             <View style={Styles.FlexConatiner}>

//                 <View style={Styles.lockcontainer}>
//                     <Image source={Icons.Lock}
//                     style={Styles.lockImasge}
//                     />
//                 </View>
//                 <Text
//                   style={Styles.signIntxt}
//                 >Change<Text
//                 style={Styles.PassTxt}
//                 > Your Password?</Text></Text>
//                  <Text
//                  style={Styles.optcontainer}
//                  >Enter your new Password</Text>

//                 <View style={Styles.mainInputConatiner}>
//                 <View>
//                     <TextInput
//                     placeholder='Enter New Password'
//                     placeholderTextColor='#39458C'
//                     style={Styles.inputfield}
//                     />
//                  </View>
//                  <View>
//                     <TextInput
//                     placeholder='Re-Enter New Password'
//                     placeholderTextColor='#39458C'
//                     style={Styles.inputfield}
//                     />
//                  </View>
//                 </View>

//                  <View
//                  style={{
//                     marginBottom:normalize(80)
//                  }}
//                  >
//                     <TouchableOpacity
//                     onPress={()=>props.navigation.navigate('Landing')}
//                     style={Styles.SignInButton}
//                     >
//                         <Text
//                         style={Styles.BtnTxt}
//                         >Change Your Password</Text>
//                     </TouchableOpacity>
//                  </View>
//             </View>
//         </View>
//       )
//     }
//     const Styles = StyleSheet.create({
//         container:{
//             flex:1
//         },
//         backBg:{
//             flex:1
//         },
//         whiteLogoconatiner:{
//             position:'absolute',
//               left:'30%',
//               right:0,
//               top:normalize(30)
//         },
//         logo:{
//             resizeMode:'contain',
//             width:normalize(100)
//         },
//         FlexConatiner:{
//             flex:1,
//             backgroundColor:'#060C30',
//             borderTopRightRadius:normalize(5),
//            position:'absolute',
//            width:'100%',
//            bottom:0,
//            height:'auto',
//            padding:normalize(10),
//            borderTopLeftRadius:normalize(20),
//            borderTopRightRadius:normalize(20),

//         },
//         signIntxt:{
//             textAlign:'center',
//             color:'#fff',
//             fontSize:normalize(20),
//             fontFamily:Fonts.PoppinsRegular
//         },
//         inputField:{
//             borderWidth:normalize(0.5),
//             borderColor:'#39458C',
//             padding:normalize(15),
//             borderRadius:normalize(5),
//             marginTop:normalize(20)
//         },
//         passwordContainer:{
//             borderColor:'#39458C',
//             borderWidth:normalize(0.5),
//             padding:normalize(15),
//             borderRadius:normalize(5),
//             marginTop:normalize(20)
//         },
//         rememberContainer:{
//           flexDirection:'row',
//           alignItems:'center',
//           marginTop:normalize(20)
//         },
//         remIamge:{
//             resizeMode:'contain',
//             width:normalize(38)
//         },
//         SignInButton:{
//             flexDirection:'row',
//             justifyContent:'center',
//             backgroundColor:'#D73F9D',
//             padding:normalize(12),
//             borderRadius:normalize(10),
//             marginTop:normalize(20)
//         },
//         BtnTxt:{
//             color:'#fff',
//             fontFamily:Fonts.PoppinsRegular,
//             fontSize:normalize(14),
//             fontFamily:Fonts.PoppinsRegular
//         },
//         PassTxt:{
//           color:'#D73F9D'
//         },
//         lockcontainer:{
//             flexDirection:'row',
//             justifyContent:'center',
//             margin:normalize(0),
//         },
//         lockImasge:{
//             resizeMode:'contain',
//             width:normalize(52)
//         },
//         optcontainer:{
//             textAlign:'center',
//             color:'#B9A4F4',
//             fontFamily:Fonts.PoppinsRegular,
//             marginTop:normalize(10),
//             fontFamily:Fonts.PoppinsRegular
//         },
//         otpcontainer:{
//             flexDirection:'row',
//             justifyContent:'center',
//             marginTop:normalize(20)
//         },
//         textInput:{
//             borderWidth:normalize(0.5),
//             borderColor:'#39458C',
//             width:normalize(50),
//             margin:normalize(10),
//             padding:normalize(8),
//             borderRadius:normalize(8),
//             fontSize:normalize(30),
//             textAlign:'center'
//         },
//         inputfield:{
//             borderWidth:normalize(0.5),
//             borderColor:'#39458C',
//             padding:normalize(15),
//             borderRadius:normalize(8),
//             fontSize:normalize(12),
//             marginTop:normalize(20)
//         },
//         mainInputConatiner:{
//             marginTop:normalize(20)
//         }

//     })
//     export default ChangePassword

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
} from 'react-native';
import React, {useState} from 'react';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import {
  craetenewpasswordRequest,
  craetenewpasswordSuccess,
  craetenewpasswordFailure,
} from '../../redux/reducer/AuthReducer';
import Toast from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from '../../utils/helpers/Loader';
let status = '';
import TextInputItem from '../../components/TextInputItem';
export default function ChangePassword(props) {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [iconvisible, seticonvisible] = useState(true);
  const [iconvisible1, seticonvisible1] = useState(true);
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  function checkpasword() {
    if (email == '') {
      Toast('Please enter your password');
    } else if (email.length < 8) {
      Toast('Please enter atleast 8 character password');
    } else if (pass == '') {
      Toast('Please enter confirm password');
    } else if (email != pass) {
      Toast('New password and confirm password does not match');
    } else {
      let obj = {
        email: props?.route?.params?.emailid,
        password: email,
        confirm_password: pass,
      };
      connectionrequest()
        .then(() => {
          // console.log(obj);
          dispatch(craetenewpasswordRequest(obj));
        })
        .catch(err => {
          Toast('Please connect To Internet');
        });
    }
  }
  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/craetenewpasswordRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/craetenewpasswordSuccess':
        status = AuthReducer.status;
        console.log('hiiii', AuthReducer?.craetenewpasswordResponse);
        props.navigation.navigate('Landing');
        break;
      case 'Auth/craetenewpasswordFailure':
        status = AuthReducer.status;
        // console.log(AuthReducer?.response)
        break;
    }
  }

  return (
    <>
      {/* <View style={Styles.container}>
         <ImageBackground source={Icons.BgImage} resizeMode='cover'
         style={Styles.backBg}  
         />
         <View style={Styles.whiteLogoconatiner}>
         <Image  source={Icons.Whitelogo}
         style={Styles.logo}
         />
         </View>
            <View style={Styles.FlexConatiner}>

                <View style={Styles.lockcontainer}>
                    <Image source={Icons.Lock}
                    style={Styles.lockImasge}
                    />
                </View>
                <Text
                  style={Styles.signIntxt}
                >Forgot Your<Text
                style={Styles.PassTxt}
                > Password?</Text></Text>
                 <Text
                 style={Styles.optcontainer}
                 >Send OTP To Your Email ID</Text>
    
                <TextInput placeholder='Email Address' 
                style={Styles.inputField}
                placeholderTextColor='#39458C'
                />
                 <View
                 style={{
                    marginBottom:normalize(80)
                 }}
                 >
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Enterotp')}
                    style={Styles.SignInButton}
                    >
                        <Text
                        style={Styles.BtnTxt}
                        >Reset My Password</Text>
                    </TouchableOpacity>
                 </View>
            </View>
        </View> */}
        <SafeAreaView style={{flex: 1, backgroundColor: '#270C74'}}>
        <MyStatusBar backgroundColor={'#452487'} />
      <KeyboardAvoidingView
        style={Styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Loader
          visible={AuthReducer.status == 'Auth/craetenewpasswordRequest'}
        />
        <MyStatusBar backgroundColor={Colors.darkblue} />
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
          <View style={Styles.lockcontainer}>
            <Image source={Icons.Lock} style={Styles.lockImasge} />
          </View>
          <Text style={Styles.signIntxt}>
            Change Your<Text style={Styles.PassTxt}> Password</Text>
          </Text>
          <Text style={Styles.optcontainer}>Enter your new Password</Text>
          <TextInputItem
            viewbordercolor="red"
            placeholder={'Enter New Password'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            marginTop={normalize(20)}
            value={email}
            onChangeText={val => setemail(val)}
            textColor={Colors.white}
            placeholderTextColor={'#8E6BF2'}
            isRightIconVisible={true}
            fontSize={normalize(11)}
            rightimage={iconvisible ? Icons.hide : Icons.Show}
            onrightimpress={() => seticonvisible(!iconvisible)}
            isSecure={iconvisible}
            borderRadius={normalize(12)}
          />
          <TextInputItem
            viewbordercolor="red"
            placeholder={'Re-Enter New Password'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            value={pass}
            onChangeText={val => setpass(val)}
            textColor={Colors.white}
            placeholderTextColor={'#8E6BF2'}
            isRightIconVisible={true}
            fontSize={normalize(11)}
            rightimage={iconvisible1 ? Icons.hide : Icons.Show}
            onrightimpress={() => seticonvisible1(!iconvisible1)}
            isSecure={iconvisible1}
            borderRadius={normalize(12)}
          />
          <TouchableOpacity
            // onPress={() => checkpasword()}
            onPress={() => checkpasword()}
            style={Styles.SignInButton}>
            <Text style={Styles.BtnTxt}>Change Your Password</Text>
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
    marginTop: normalize(20),
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
    marginTop: normalize(10),
  },
});

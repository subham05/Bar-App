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
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RenderHtml from 'react-native-render-html';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import TextInputItem from '../../components/TextInputItem';
import MyStatusBar from '../../utils/MyStatusBar';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import DateTimePicker from '../../components/DateTimePicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  countryRequest,
  signupRequest,
  loginRequest,
  cmsdataRequest,
  userNameCreateRequest,
  storeRegisterData,
  checkEmailRequest,
  collegeSearchRequest,
} from '../../redux/reducer/AuthReducer';
import Picker from '../../components/Picker';
let status = '';
import TextInputItem1 from '../../components/Textinputitem1';
import Loader from '../../utils/helpers/Loader';
import {useIsFocused} from '@react-navigation/native';
import Toast from '../../utils/helpers/Toast';
import {KeyboardAvoidingViewComponent} from 'react-native';
import {Keyboard} from 'react-native';
import {hasLocationPermission} from '../../utils/helpers/Common';

export default function Signup2(props) {
  const isFocused = useIsFocused();
  const [pageIndex, setPageIndex] = useState(1);
  const [name, setname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [onSwitch, setOnSwitch] = useState(1);
  const [password, setpassword] = useState('');
  const [confpassword, setConfirmPassword] = useState('');
  const [toggle, setToggle] = useState(false);
  const [dob, setdob] = useState('');
  const [accept, setaccept] = useState(false);
  const [gender, setgender] = useState('');
  const [username, setusername] = useState('');
  const [collegeId, setCollegeId] = useState();
  const [attend, setAttend] = useState(1);
  const [openSugg, setOpenSugg] = useState(false);
  const [pop, setPopup] = useState(false);
  const [newFormat, setNewFormat] = useState('');
  // const [pin, setpin] = useState('');
  // const [country, setcountry] = useState('');
  // const [selected, setselected] = useState('');
  // const [selectedid, setselectedid] = useState('');
  // const [modalVisible, setmodalVisible] = useState(false);
  const dispatch = useDispatch();
  // const [data, setdata] = useState([]);
  const [iconvisible, seticonvisible] = useState(true);
  const [iconvisible1, seticonvisible1] = useState(true);
  const AuthReducer = useSelector(state => state.AuthReducer);
  // console.log(AuthReducer?.countryResponse);
  const [gendermodal, setgendermodal] = useState(false);
  const [datemodal, setdatemodal] = useState(false);
  const [remember, setremember] = useState(false);
  const [collegeName, setCollegeName] = useState('');
  const [date, setdate] = useState(new Date());
  const [acceptterm, setacceptterm] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const systemfonts = [Fonts.Poppins_Medium];
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {}, [isFocused]);
  console.log('date', dob);
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let nameCheck = /^[a-zA-Z ]{0,100}$/;
  // function createaccount() {
  //   if (name == '') {
  //     showErrorAlert('Please enter your first name');
  //   } else if (!nameCheck.test(name)) {
  //     showErrorAlert('Please enter a valid first name');
  //   }
  //   //  else if (username == '') {
  //   //   showErrorAlert('Please enter your User name');
  //   // }
  //   else if (lname == '') {
  //     showErrorAlert('Please enter your last name');
  //   } else if (!nameCheck.test(lname)) {
  //     showErrorAlert('Please enter a valid last name');
  //   } else if (email == '') {
  //     showErrorAlert('Please enter your email');
  //   } else if (!regex.test(email)) {
  //     showErrorAlert('Please enter correct email');
  //   } else if (password == '') {
  //     showErrorAlert('Please enter password');
  //   } else if (confpassword == '') {
  //     showErrorAlert('Please enter password');
  //   } else if (confpassword.length < 8) {
  //     showErrorAlert('Please enter atleast 8 character password');
  //   } else if (confpassword != password) {
  //     showErrorAlert('Confirm Password Does not match');
  //   } else if (password.length < 8) {
  //     showErrorAlert('Please enter atleast 8 character password');
  //   }
  //   // else if (gender == '') {
  //   //   showErrorAlert('Please select your gender');
  //   // }
  //   //       else if (pin == '') {
  //   //   showErrorAlert('Please enter zipcode')
  //   //  }
  //   //       else if (selected == '') {
  //   //   showErrorAlert('Please select country')
  //   //  }
  //   else if (acceptterm == false) {
  //     showErrorAlert('Please accept terms and condition');
  //   } else {
  //     let obj = {
  //       // first_name: name,
  //       // last_name: lname,
  //       email: email,
  //       // country_id: selectedid,
  //       // gender: gender == 'Male' ? 1 : gender == 'Female' ? 2 : 3,
  //       // date_of_birth: dob,
  //       // password: password,
  //       // confirm_password: confpassword,
  //       // step_id: 1,
  //       // user_name: username,
  //       // post_code:pin
  //       // confirm_password: password,
  //       //phone:111111
  //     };
  //     dispatch(
  //       storeRegisterData({
  //         first_name: name,
  //         last_name: lname,
  //         email: email,
  //         password: password,
  //         confirm_password: confpassword,
  //       }),
  //     );
  //     connectionrequest()
  //       .then(() => {
  //         console.log(obj);
  //         dispatch(checkEmailRequest(obj));
  //       })
  //       .catch(err => {
  //         showErrorAlert('Please connect To Internet');
  //       });

  //     //console.log(obj);
  //     // props.navigation.navigate('Signin')
  //   }
  // }
  const usernameRegx = /^[a-zA-Z0-9_.-]*$/;
  function createUser() {
    if (username == '') {
      showErrorAlert('Please Enter Your Username');
    } else if (username.length < 4 || username.length > 15) {
      showErrorAlert(
        'Please Enter Username Minimum of 4 characters and maximum of 15 characters',
      );
    } else if (!usernameRegx.test(username)) {
      showErrorAlert('Please Enter Correct Username');
    } else {
      let obj = {
        user_name: username,
      };
      dispatch(
        storeRegisterData({
         
          user_name: username,
        }),
      );
      connectionrequest()
        .then(() => {
          console.log(obj);
          dispatch(userNameCreateRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }
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
  function createaccount1() {
    console.log('first name', name);

    if (gender == '') {
      showErrorAlert('Please select your gender');
    }
    //       else if (pin == '') {
    //   showErrorAlert('Please enter zipcode')
    //  }
    //       else if (selected == '') {
    //   showErrorAlert('Please select country')
    //  }
    // else if (accept == false) {
    //   showErrorAlert('Please accept terms and condition');
    // }
    else {
      // let obj = {

      //   gender: gender,
      //   date_of_birth: dob,
      //   step_id: 2,
      //   user_name: username,
      //   user_id: AuthReducer.signupResponse.data.id,

      // };
      dispatch(
        storeRegisterData({
          user_name: username,
          gender: gender,
          date_of_birth: dob,
          // user_id: AuthReducer.signupResponse.data.id,
        }),
      );
      setPageIndex(4);
      // connectionrequest()
      //   .then(() => {
      //     console.log(obj);
      //     dispatch(signupRequest(obj));
      //   })
      //   .catch(err => {
      //     showErrorAlert('Please connect To Internet');
      //   });

      //console.log(obj);
      // props.navigation.navigate('Signin')
    }
  }
console.log("previoususe-pass",AuthReducer.storePreviousUserPassword);
  useEffect(() => {
    if (status == '' || AuthReducer.status != status) {
      switch (AuthReducer.status) {
        case 'Auth/signupRequest':
          status = AuthReducer.status;
          break;
        case 'Auth/checkEmailRequest':
          status = AuthReducer.status;
          break;
        case 'Auth/checkEmailSuccess':
          status = AuthReducer.status;
          if (pageIndex == 1) {
            setPageIndex(2);
          }
          break;
        case 'Auth/signupSuccess':
          status = AuthReducer.status;
          console.log('signupsuccess');
          // showErrorAlert('User registration successfully completed')
          let ab = {
            savePassword: remember,
            creads: {
              email: AuthReducer?.loginResponse.email,
              password: AuthReducer?.storePreviousUserPassword,
              device_token: AuthReducer?.fcmResponse,
              device_type: Platform.OS,
            },
          };
          dispatch(loginRequest(ab));
          Toast('Registration Successful');

          break;
        case 'Auth/signupFailure':
          status = AuthReducer.status;
          break;

        case 'Auth/loginRequest':
          status = AuthReducer.status;
          break;

        case 'Auth/loginSuccess':
          status = AuthReducer.status;
          console.log('signupsuccess');
          // showErrorAlert('User registration successfully completed')

          setname('');
          setlname('');
          setemail('');
          setpassword('');
          setdob('');
          setgender(0);

          break;
        case 'Auth/loginFailure':
          status = AuthReducer.status;
          break;
        case 'Auth/userNameCreateRequest':
          status = AuthReducer.status;

          break;
        case 'Auth/userNameCreateSuccess':
          status = AuthReducer.status;
          setPageIndex(2);
          break;
      }
    }
  }, [AuthReducer.status]);

  // function openTerms() {
  //   setToggle(true);
  //   connectionrequest()
  //     .then(() => {
  //       dispatch(cmsdataRequest({slug: 'terms-conditions'}));
  //     })
  //     .catch(err => {
  //       showErrorAlert('Please connect To Internet');
  //     });
  // }
  function checkDob() {
    if (dob == '') {
      showErrorAlert('Please enter DOB');
    } else {
      setPageIndex(3);
    }
  }
  function beforeFinal() {
    console.log('attend', attend);
    if (collegeId == undefined && attend == 1) {
      showErrorAlert('Please enter College Name');
    } else {
      if (attend == 1) {
        dispatch(
          storeRegisterData({
            previous_user_id:AuthReducer.loginResponse.id,
            user_name: username,
            gender: gender,
            date_of_birth: dob,
            is_college: 1,
            college_id: collegeId,
            student_or_alumni: onSwitch,
            // user_id: AuthReducer.signupResponse.data.id,
          }),
        );
      } else {
        dispatch(
          storeRegisterData({
            previous_user_id:AuthReducer.loginResponse.id,
            user_name: username,
            gender: gender,
            date_of_birth: dob,
            is_college: 0,
            // user_id: AuthReducer.signupResponse.data.id,
          }),
        );
      }

      setPageIndex(5);
    }
  }
  function finalRegister() {
    connectionrequest()
      .then(() => {
        dispatch(signupRequest(AuthReducer.registerData));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function next() {
    // if (pageIndex != 7) setPageIndex(pageIndex + 1);
    //   if (pageIndex == 1) {
    //     createaccount();
    //   } else

    if (pageIndex == 1) {
      createUser();
    } else if (pageIndex == 2) {
      checkDob();
    } else if (pageIndex == 3) {
      createaccount1();
    } else if (pageIndex == 4) {
      beforeFinal();
    } else if (pageIndex == 5) {
      setPageIndex(6);
    } else if (pageIndex == 6) {
      finalRegister();
    }
  }
  function previous() {
    if (pageIndex != 1) {
      setPageIndex(pageIndex - 1);
    } else {
      props.navigation.goBack();
    }
  }
  useEffect(() => {
    if (pageIndex == 6) {
      locationPop();
    }
  }, [pageIndex]);
  async function locationPop() {
    let popup;
    popup = await hasLocationPermission();
    console.log('popupdata-----------------------', popup);
    setPopup(popup);
  }
  useEffect(() => {
    console.log('refresh', pop);
    if (pop === true) {
      console.log('entering');
      requestLocationPermission();
    }
  }, [pop]);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      dispatch(putLocationGranted(true));
      // subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        console.log('grante', granted);
        dispatch(permissionData(granted));
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('entering');
          //To Check, If Permission is granted
          // getOneTimeLocation();
          // subscribeLocationLocation();
          dispatch(putLocationGranted(true));
        } else {
          dispatch(putLocationGranted(false));
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const searchListComp = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCollegeName(`${item?.name} (${item?.slug})`);
          setCollegeId(item?.id);
          setOpenSugg(false);
        }}
        style={{
          flexDirection: 'row',
          paddingVertical: normalize(4),
          justifyContent: 'space-between',
          marginVertical: normalize(4),
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(14),
            marginLeft: normalize(5),
          }}>
          {`${item?.name} (${item?.slug})`}
        </Text>
        <Image
          source={Icons.Arrow}
          resizeMode={'contain'}
          style={{
            height: normalize(6),
            width: normalize(8),
            transform: [{rotate: '270deg'}],
            marginRight: normalize(5),

            tintColor: 'white',
          }}
        />
      </TouchableOpacity>
    );
  };
  function collegeNameSearch(value) {
    setCollegeName(value);
    setOpenSugg(true);
    let obj = {
      college_name: value,
    };
    connectionrequest()
      .then(() => {
        console.log(obj);
        dispatch(collegeSearchRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function attendCollege() {
    if (attend == 1) {
      setAttend(0);
    } else {
      setAttend(1);
    }
  }
  console.log('page', pageIndex, AuthReducer.registerData);
  console.log('page1214', AuthReducer.collegeSearchResponse);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
        <MyStatusBar backgroundColor={'#030721'} />
        <KeyboardAvoidingView
          style={Styles.container}
          keyboardVerticalOffset={0}
          keyboardShouldPersistTaps={'always'}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <Loader visible={AuthReducer.status == 'Auth/signupRequest'} />

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
            onPress={() => previous()}>
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

          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={Styles.FlexConatiner}
            contentContainerStyle={{paddingBottom: normalize(40)}}>
            {/* index1 */}
            {/* {pageIndex == 1 && (
                <View>
                  <Text style={Styles.signIntxt}>Sign Up!</Text>
                  <View style={Styles.nameConatinet}>
                    <TextInputItem
                      placeholder={'Enter First Name'}
                      width={'47%'}
                      borderWidth={1}
                      marginTop={normalize(0)}
                      value={name}
                      onChangeText={val => setname(val)}
                      textColor={Colors.white}
                      placeholderTextColor={'#B4BDF1'}
                      isRightIconVisible={false}
                      fontSize={normalize(11)}
                      borderRadius={normalize(12)}
                      height={normalize(48)}
                      backgroundColor="#202A61"
                    />
                    <TextInputItem
                      placeholder={'Enter Last Name'}
                      width={'47%'}
                      borderWidth={1}
                      marginTop={normalize(0)}
                      value={lname}
                      onChangeText={val => setlname(val)}
                      textColor={Colors.white}
                      placeholderTextColor={'#B4BDF1'}
                      isRightIconVisible={false}
                      fontSize={normalize(11)}
                      borderRadius={normalize(12)}
                      height={normalize(48)}
                      backgroundColor="#202A61"
                    />
                  </View>
                  <TextInputItem
                    placeholder={'Enter Your Email'}
                    width={'100%'}
                    borderWidth={1}
                    marginTop={normalize(0)}
                    value={email}
                    onChangeText={val => setemail(val)}
                    textColor={Colors.white}
                    placeholderTextColor={'#B4BDF1'}
                    isRightIconVisible={false}
                    fontSize={normalize(11)}
                    borderRadius={normalize(12)}
                    height={normalize(48)}
                    backgroundColor="#202A61"
                  />
                  <TextInputItem
                    placeholder={'Enter Password'}
                    width={'100%'}
                    borderWidth={1}
                    marginTop={normalize(0)}
                    value={password}
                    onChangeText={val => setpassword(val)}
                    textColor={Colors.white}
                    placeholderTextColor={'#B4BDF1'}
                    isRightIconVisible={true}
                    fontSize={normalize(11)}
                    rightimage={iconvisible ? Icons.hide : Icons.Show}
                    onrightimpress={() => seticonvisible(!iconvisible)}
                    isSecure={iconvisible}
                    // isleftIconVisible={true}
                    borderRadius={normalize(12)}
                    height={normalize(48)}
                    backgroundColor="#202A61"
                  />
                  <TextInputItem
                    placeholder={'Confirm Password'}
                    width={'100%'}
                    borderWidth={1}
                    marginTop={normalize(0)}
                    value={confpassword}
                    onChangeText={val => setConfirmPassword(val)}
                    textColor={Colors.white}
                    placeholderTextColor={'#B4BDF1'}
                    isRightIconVisible={true}
                    fontSize={normalize(11)}
                    rightimage={iconvisible1 ? Icons.hide : Icons.Show}
                    onrightimpress={() => seticonvisible1(!iconvisible1)}
                    isSecure={iconvisible1}
                    // isleftIconVisible={true}
                    borderRadius={normalize(12)}
                    height={normalize(48)}
                    backgroundColor="#202A61"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setacceptterm(!acceptterm)}
                      style={{
                        width: normalize(20),
                        height: normalize(20),
                        backgroundColor: '#4C24BE',
                        borderRadius: normalize(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 5,
                      }}>
                      {acceptterm && (
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
                    I agree to the 
                    </Text>
                    <TouchableOpacity
                      onPress={() =>openTerms()}
                      style={{
                        marginLeft: normalize(4),
                      }}>
                      <Text
                        style={{
                          color: '#D73F9D',
                          // fontFamily: Fonts.PoppinsRegular,
                          fontSize: normalize(11),
                          textDecorationLine: 'underline',
                          marginTop: Platform.OS == 'ios' ? 1 : 5,
                        }}>
                        Terms and Condition
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )} */}
            {pageIndex == 1 && (
              <>
                <Text style={Styles.signIntxt}>Create a Username</Text>
                <View style={Styles.nameConatinet}>
                  <TextInputItem
                    placeholder={'Enter a Unique Username'}
                    width={'100%'}
                    borderWidth={1}
                    marginTop={normalize(0)}
                    value={username}
                    onChangeText={val => setusername(val)}
                    textColor={Colors.white}
                    placeholderTextColor={'#B4BDF1'}
                    isRightIconVisible={false}
                    fontSize={normalize(11)}
                    borderRadius={normalize(12)}
                    height={normalize(48)}
                    backgroundColor="#202A61"
                  />
                </View>
                <Text
                  style={{
                    marginLeft: normalize(5),
                    color: Colors.white,
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: normalize(11),
                  }}>
                  Username can only be letters, numbers, and _
                </Text>
              </>
            )}
            {pageIndex == 2 && (
              <>
                <Text style={Styles.signIntxt}>What’s your birthday?</Text>
                <View style={Styles.nameConatinet}>
                  <TextInputItem1 //placeholder={'Enter DOB'}
                    width={'100%'}
                    borderRadius={normalize(12)}
                    height={normalize(48)}
                    borderWidth={1}
                    marginTop={normalize(0)}
                    value={newFormat == '' ? 'Enter DOB' : newFormat}
                    // onChangeText={(val)=>setdob(val)}
                    textColor={newFormat == '' ? '#B4BDF1' : Colors.white}
                    //  placeholderTextColor={Colors.placeholder}
                    isRightIconVisible={true}
                    fontSize={normalize(11)}
                    rightimage={Icons.Calender}
                    // editable={false}
                    onmainpress={() => {
                      setdatemodal(true), console.log('hi');
                    }}
                    backgroundColor="#202A61"
                  />
                </View>
                <TouchableOpacity onPress={()=> setPageIndex(3)} style={{width:normalize(100),alignSelf:'center',alignItems:'center',marginTop:normalize(18)}}><Text style={{color:'#6F79D1',fontFamily:Fonts.Poppins_Medium,fontSize:normalize(14)}}>Skip</Text></TouchableOpacity>
              </>
            )}
            {pageIndex == 3 && (
              <>
                <Text style={Styles.signIntxt}>What’s your Sex?</Text>
                <View style={Styles.nameConatinet1}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => setgender(1)}
                      style={{
                        backgroundColor: gender == 1 ? '#D73F9D' : '#202A61',
                        borderRadius: normalize(10),
                        width: '48%',
                        height: normalize(45),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: normalize(16),
                      }}>
                      <Text
                        style={{
                          color: gender == 1 ? Colors.white : '#B4BDF1',
                          fontFamily: Fonts.Poppins_Regular,
                          fontSize: normalize(16),
                        }}>
                        Male
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setgender(2)}
                      style={{
                        backgroundColor: gender == 2 ? '#D73F9D' : '#202A61',
                        borderRadius: normalize(10),
                        width: '48%',
                        height: normalize(45),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: normalize(16),
                      }}>
                      <Text
                        style={{
                          color: gender == 2 ? Colors.white : '#B4BDF1',
                          fontFamily: Fonts.Poppins_Regular,
                          fontSize: normalize(16),
                        }}>
                        Female
                      </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => setgender(3)}
                        style={{
                          backgroundColor: gender == 3 ? '#D73F9D' : '#202A61',
                          borderRadius: normalize(10),
                          width: '48%',
                          height: normalize(45),
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: normalize(16),
                        }}>
                        <Text
                          style={{
                            color: gender == 3 ? Colors.white : '#B4BDF1',
                            fontFamily: Fonts.Poppins_Regular,
                            fontSize: normalize(16),
                          }}>
                          Others
                        </Text>
                      </TouchableOpacity> */}
                  </View>
                </View>
                <TouchableOpacity onPress={()=> setPageIndex(4)} style={{width:normalize(100),alignSelf:'center',alignItems:'center',marginTop:normalize(18)}}><Text style={{color:'#6F79D1',fontFamily:Fonts.Poppins_Medium,fontSize:normalize(14)}}>Skip</Text></TouchableOpacity>
              </>
            )}
            {pageIndex == 4 && (
              <>
                <View
                  style={{
                    width: normalize(290),
                    backgroundColor: '#030721',
                    marginTop: normalize(8),
                    borderRadius: normalize(10),
                    alignSelf: 'center',

                    // alignItems: 'center',
                    fontSize: normalize(11),
                    paddingHorizontal: normalize(15),

                    marginTop: normalize(10),
                    borderWidth: normalize(1),
                    borderColor: '#fff',
                  }}>
                  {attend == 0 && (
                    <View
                      style={{
                        backgroundColor: 'rgba(22,31,92,0.6)',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: normalize(290),
                        height: '100%',
                        zIndex: 99,
                        borderRadius: 10,
                      }}></View>
                  )}
                  <Text
                    style={{
                      fontSize: normalize(15),
                      color: '#9097CD',
                      fontWeight: '500',
                      marginTop: normalize(15),
                    }}>
                    Your College
                  </Text>

                  <View
                    style={{
                      height: normalize(35),
                      width: normalize(260),
                      backgroundColor: '#0E1648',
                      marginVertical: normalize(15),
                      borderRadius: normalize(10),
                      alignSelf: 'center',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: normalize(11),
                      paddingHorizontal: normalize(10),
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Icons.Search}
                      style={{
                        height: normalize(12),
                        width: normalize(12),
                        tintColor: '#fff',
                      }}
                    />
                    <TextInput
                      value={collegeName}
                      onChangeText={value => collegeNameSearch(value)}
                      placeholder="Enter College Name "
                      placeholderTextColor={'#B4BDF1'}
                      style={{
                        height: normalize(34),
                        width: normalize(200),
                        paddingHorizontal: normalize(10),
                        color: '#fff',
                      }}
                    />
                  </View>
                  {AuthReducer?.collegeSearchResponse?.data?.length > 0 &&
                    openSugg && (
                      <FlatList
                        data={AuthReducer?.collegeSearchResponse?.data}
                        renderItem={searchListComp}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                          backgroundColor: '#0E1648',
                          marginBottom: normalize(20),
                          paddingHorizontal: normalize(10),
                          paddingVertical: normalize(5),
                          borderRadius: normalize(8),
                        }}
                      />
                    )}

                  {console.log(
                    'college list',
                    AuthReducer.collegeSearchResponse.data,
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        borderColor: '#161F5C',
                        borderWidth: 4,
                        marginBottom: normalize(16),
                        width: '50%',
                        height: normalize(38),
                        borderRadius: normalize(10),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => setOnSwitch(1)}
                        style={{
                          backgroundColor:
                            onSwitch == 1 ? '#FF58BF' : 'transparent',
                          width: '50%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: normalize(7),
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontFamily: Fonts.Poppins_Bold,
                            fontSize: normalize(10),
                          }}>
                          Student
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setOnSwitch(2)}
                        style={{
                          backgroundColor:
                            onSwitch == 2 ? '#FF58BF' : 'transparent',
                          width: '50%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: normalize(7),
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontFamily: Fonts.Poppins_Bold,
                            fontSize: normalize(10),
                          }}>
                          Alumni
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity
                      // onPress={() => CollgeModeAdd()}
                      style={{
                        width: '40%',
                        backgroundColor: '#FF58BF',
                        padding: normalize(10),
                        borderRadius: normalize(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: normalize(15),
                      }}>
                      <Text style={{color: 'white', fontSize: normalize(14)}}>
                        Update
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => attendCollege()}
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#030721',
                    padding: normalize(20),
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: attend == 1 ? '#6F79D1' : '#FF58BF',
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_SemiBold,
                    }}>
                    I Did Not Attend College
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {pageIndex == 5 && (
              <View style={Styles.nameConatinet1}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingHorizontal: normalize(50),
                  }}>
                  <Image
                    style={{height: normalize(64), resizeMode: 'contain'}}
                    source={Icons.introImg1}
                  />
                  <Image
                    style={{height: normalize(28), resizeMode: 'contain'}}
                    source={Icons.introArrow}
                  />
                  <Image
                    style={{height: normalize(64), resizeMode: 'contain'}}
                    source={Icons.introImg2}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(30),
                    paddingHorizontal: normalize(10),
                  }}>
                  <Image
                    style={{
                      height: normalize(64),
                      width: normalize(50),
                      resizeMode: 'contain',
                    }}
                    source={Icons.introImg1}
                  />
                  <Text
                    style={{
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Regular,
                      color: Colors.white,
                      width: '80%',
                      paddingLeft: normalize(15),
                      lineHeight: normalize(19),
                    }}>
                    This means that you do not have your current location set to
                    ‘Always Allow’ or do not have a minimum of 5 friends on the
                    app or both
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(30),
                    paddingHorizontal: normalize(10),
                  }}>
                  <Image
                    style={{
                      height: normalize(64),
                      width: normalize(50),
                      resizeMode: 'contain',
                    }}
                    source={Icons.introImg2}
                  />
                  <Text
                    style={{
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Regular,
                      color: Colors.white,
                      width: '80%',
                      paddingLeft: normalize(15),
                      lineHeight: normalize(19),
                    }}>
                    Once you have at least 5 friends and your location set to
                    ‘Always Allow’ you will be able to see how many of your
                    friends are currently at that bar
                  </Text>
                </View>
              </View>
            )}
            {pageIndex == 6 && (
              <View>
                <Text style={Styles.signIntxt}>We Respect Your Privacy</Text>
                <Text
                  style={{
                    fontSize: normalize(11),
                    fontFamily: Fonts.Poppins_Regular,
                    color: Colors.white,
                    paddingHorizontal: normalize(15),

                    marginTop: normalize(10),
                    fontWeight: '500',
                    // letterSpacing: 0.52,
                  }}>
                  WhichBar is a Dallas based company. At WhichBar, we{' '}
                  <Text style={{fontWeight: '800'}}>
                    prioritize your privacy
                  </Text>{' '}
                  and give you the ability to choose whether or not to share
                  your location with friends while at a bar/venue. We do utilize
                  your anonymous demographic information to provide real-time
                  data on bar crowds for everyone on the app.
                </Text>
                <Text
                  style={{
                    fontSize: normalize(11),
                    fontFamily: Fonts.Poppins_Regular,
                    color: Colors.white,
                    paddingHorizontal: normalize(15),
                    lineHeight: normalize(19),
                    marginTop: normalize(10),
                    fontWeight: '500',
                  }}>
                  In order to get the most out of this app, it is essential to
                  keep your location set to{' '}
                  <Text style={{fontWeight: '800'}}>'Always Allow.’</Text> As a{' '}
                  <Text style={{fontWeight: '800'}}>location-based</Text> app,
                  we need this information to provide everyone with the most
                  relevant and up-to-date information about the bars and events
                  in your area.
                </Text>
                <Text
                  style={{
                    fontSize: normalize(11),
                    fontFamily: Fonts.Poppins_Regular,
                    color: Colors.white,
                    paddingHorizontal: normalize(15),
                    lineHeight: normalize(19),
                    marginTop: normalize(10),
                    fontWeight: '500',
                  }}>
                  We look forward to providing y’all with the clear answer for
                  which bar {';)'} to send after the pregame. 
                </Text>
              </View>
            )}
          </ScrollView>

          <DateTimePicker
            value={date}
            isDatePicker={true}
            mode={'date'}
            maxDate={new Date(moment())}
            minDate={new Date(moment().subtract(100, 'years').toISOString())}
            dateTimePickerVisible={datemodal}
            onDateChange={val => {
              setdate(val),
                setdob(moment(val).format('YYYY-DD-MM')),
                setNewFormat(moment(val).format('MM-DD-YYYY'));
            }}
            onBackdropPress={() => setdatemodal(false)}
            onPressDone={() => setdatemodal(false)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: normalize(20),
              bottom: isKeyboardVisible == true ? normalize(7) : 0,
            }}>
            <TouchableOpacity
              onPress={() => previous()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  tintColor: 'white',
                  width: normalize(12),
                  height: normalize(12),
                  transform: [{rotate: '90deg'}],
                  resizeMode: 'contain',
                }}
                source={Icons.Arrow}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(16),
                  marginLeft: normalize(2),
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: normalize(9),
                  width: normalize(9),
                  backgroundColor: pageIndex == 1 ? Colors.white : '#4E5061',
                  borderRadius: 10,
                  marginHorizontal: normalize(2),
                }}></View>
              <View
                style={{
                  height: normalize(9),
                  width: normalize(9),
                  backgroundColor: pageIndex == 2 ? Colors.white : '#4E5061',
                  borderRadius: 10,
                  marginHorizontal: normalize(2),
                }}></View>
              <View
                style={{
                  height: normalize(9),
                  width: normalize(9),
                  backgroundColor: pageIndex == 3 ? Colors.white : '#4E5061',
                  borderRadius: 10,
                  marginHorizontal: normalize(2),
                }}></View>
              <View
                style={{
                  height: normalize(9),
                  width: normalize(9),
                  backgroundColor: pageIndex == 4 ? Colors.white : '#4E5061',
                  borderRadius: 10,
                  marginHorizontal: normalize(2),
                }}></View>
              <View
                style={{
                  height: normalize(9),
                  width: normalize(9),
                  backgroundColor: pageIndex == 5 ? Colors.white : '#4E5061',
                  borderRadius: 10,
                  marginHorizontal: normalize(2),
                }}></View>
              <View
                style={{
                  height: normalize(9),
                  width: normalize(9),
                  backgroundColor: pageIndex == 6 ? Colors.white : '#4E5061',
                  borderRadius: 10,
                  marginHorizontal: normalize(2),
                }}></View>
              {/* <View
                  style={{
                    height: normalize(9),
                    width: normalize(9),
                    backgroundColor: pageIndex == 7 ? Colors.white : '#4E5061',
                    borderRadius: 10,
                    marginHorizontal: normalize(2),
                  }}></View> */}
            </View>
            <TouchableOpacity
              onPress={() => next()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(16),
                  marginRight: normalize(2),
                }}>
                Next
              </Text>
              <Image
                style={{
                  tintColor: 'white',
                  width: normalize(12),
                  height: normalize(12),
                  transform: [{rotate: '270deg'}],
                  resizeMode: 'contain',
                }}
                source={Icons.Arrow}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={{
              position: 'absolute',
              zIndex: -1,
              height: normalize(70),
              width: normalize(160),
              resizeMode: 'contain',
              bottom: normalize(70),
              alignSelf: 'center',
            }}
            source={Icons.signupImg1}
          />
          <View
            style={{
              display: toggle ? 'flex' : 'none',
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
              zIndex: 9999,
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
                source={{
                  html: AuthReducer?.cmsdataResponse?.data?.text_content,
                }}
                contentWidth={'100%'}
                systemFonts={systemfonts}
                tagsStyles={{
                  p: {fontFamily: Fonts.Poppins_Regular, color: Colors.white},
                }}
              />
            </ScrollView>
          </View>
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
    // flex:1
    width: '100%',
    height: normalize(300),
  },
  whiteLogoconatiner: {
    position: 'absolute',
    left: '30%',
    right: 0,
    top: normalize(20),
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
    marginTop: normalize(50),
    borderTopRightRadius: normalize(5),
    width: '100%',
    paddingHorizontal: normalize(10),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
  },
  signIntxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: normalize(20),
    fontFamily: Fonts.Poppins_Medium,
    marginTop: normalize(10),
    fontWeight: '600',
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
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(12),
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
  },
  social: {
    resizeMode: 'contain',
    width: normalize(40),
  },
  dontAcco: {
    flexDirection: 'row',
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
    marginLeft: normalize(10),
  },
  nameConatinet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(25),
  },
  nameConatinet1: {
    marginTop: normalize(25),
  },
  Fcon: {
    borderWidth: normalize(0.5),
    borderColor: '#39458C',
    padding: normalize(15),
    borderRadius: normalize(10),
    width: normalize(140),
    fontFamily: Fonts.Poppins_Regular,
  },
  Addreass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(20),
  },
  Caliamge: {
    resizeMode: 'contain',
    width: normalize(16),
    position: 'absolute',
    right: 15,
  },
  Caliamgee: {
    resizeMode: 'contain',
    width: normalize(13),
    position: 'absolute',
    right: 15,

    top: normalize(20),
  },
  checxkBox: {
    flexDirection: 'row',
    marginTop: normalize(20),
    alignItems: 'center',
  },
  Box: {
    width: normalize(20),
    height: normalize(20),
    backgroundColor: '#4C24BE',
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gftr: {
    color: '#fff',
    marginLeft: normalize(10),
  },
  txtTe: {
    color: '#D73F9D',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(11),
  },
  tretw: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#fff',
    textAlign: 'center',
    marginTop: normalize(20),
    marginBottom: normalize(20),
    fontSize: normalize(11),
  },
  Signtxt: {
    fontFamily: Fonts.Poppins_Regular,
    marginLeft: normalize(10),
    color: Colors.pink,
  },
});

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: normalize(20),
    // position:'absolute',
  },
  headerstyle: {
    resizeMode: 'contain',
    height: normalize(50),
    width: '70%',
    alignSelf: 'center',
  },
  txtthanks: {
    fontSize: normalize(15),
    color: Colors.white,
    fontFamily: Fonts.Gilroy_Regular,
  },
  txtlets: {
    fontFamily: Fonts.Gilroy_ExtraBold,
    color: Colors.white,
    fontSize: normalize(20),
    marginTop: normalize(8),
  },
  txtskip: {
    color: Colors.txtcolor,
    fontSize: normalize(12),
  },
  dropDownItem: {
    borderWidth: 1,
    borderRadius: normalize(10),
    marginBottom: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(40),
    width: '80%',
    alignSelf: 'center',
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    textTransform: 'capitalize',
  },
});

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
  TextInput,
  Linking,
  PermissionsAndroid,
} from 'react-native';

import React, {useEffect, useState} from 'react';
// import {ImagePath} from '../../themes/Path';
// import { Icons } from '../../themes/ImagePath';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import moment from 'moment';
import {
  collegeSearchRequest,
  logoutRequest,
} from '../../redux/reducer/AuthReducer';
import {
  deleteaccountRequest,
  deleteaccountSuccess,
  deleteaccountFailure,
  collegeModeRequest,
  profileRequest,
  deleteCardRequest,
  historyRequest,
  lastWeekRequest,
} from '../../redux/reducer/ProfileReducer';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import {getCardRequest} from '../../redux/reducer/HomeReducer';
export default function Settings(props) {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const [agree, setAgree] = useState(false);
  const [downarrow, setdownarrow] = useState(false);
  const [downarrow1, setdownarrow1] = useState(false);
  const [onSwitch, setOnSwitch] = useState(false);
  const [openSugg, setOpenSugg] = useState(false);
  const [collegeId, setCollegeId] = useState(
    ProfileReducer?.profileResponse?.user?.collge_student?.college?.id,
  );
  const [collegeName, setCollegeName] = useState(
    ProfileReducer?.profileResponse?.user?.collge_student
      ? `${ProfileReducer?.profileResponse?.user?.collge_student?.college?.name} (${ProfileReducer?.profileResponse?.user?.collge_student?.college?.slug})`
      : '',
  );
  console.log(
    'college name',
    ProfileReducer?.profileResponse?.user?.collge_student?.college?.name,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (ProfileReducer?.profileResponse?.user?.is_college == 1) {
      setAgree(true);
    } else setAgree(false);
  }, [ProfileReducer?.profileResponse?.user?.is_college]);
  useEffect(() => {
    if (ProfileReducer?.profileResponse?.user?.is_college == 1) {
      setAgree(true);
    } else setAgree(false);
  }, []);
  useEffect(() => {
    console.log(
      'alumni',
      ProfileReducer?.profileResponse?.user?.collge_student?.student_or_alumni,
    );
    if (
      ProfileReducer?.profileResponse?.user?.collge_student?.student_or_alumni == '2'
    ) {
      setOnSwitch(true);
    } else setOnSwitch(false);
  }, []);
  useEffect(() => {
    if (
      ProfileReducer?.profileResponse?.user?.collge_student?.student_or_alumni == '2'
    ) {
      setOnSwitch(true);
    } else setOnSwitch(false);
  }, [ProfileReducer?.profileResponse?.user?.is_college]);
  function ToggleMode() {
    if (agree == true) {
      let obj = new FormData();
      obj.append('is_college', 0);
      connectionrequest()
        .then(() => {
          dispatch(collegeModeRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
      setAgree(false);
    } else {
      setAgree(true);
    }
  }

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(getCardRequest());
        dispatch(historyRequest());
        dispatch(lastWeekRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, []);
  useEffect(() => {
    if (ProfileReducer.status == 'Profile/collegeModeSuccess') {
      dispatch(profileRequest());
    } else if (ProfileReducer.status == 'Profile/deleteCardSuccess') {
      dispatch(getCardRequest());
    }
  }, [ProfileReducer.status]);
  const dataset = [
    {
      txt: 'Logout',
      img: Icons.exit,
      screen: '',
    },
    {
      txt: 'Delete Your Account',
      img: Icons.shutdown,
      screen: '',
    },
  ];
  function CollgeModeAdd() {
    let obj = new FormData();
    obj.append('is_college', 1);
    obj.append('college_id', collegeId);
    obj.append('student_or_alumni', onSwitch ? 2 : 1);
    if (collegeName != '' || collegeId != undefined) {
      connectionrequest()
        .then(() => {
          console.log('====================================', obj);

          dispatch(collegeModeRequest(obj));
          dispatch(profileRequest());
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    } else {
      showErrorAlert('Please Enter Name');
    }
  }
  function renderdata({item, index}) {
    return (
      <View
        style={{
          backgroundColor: Colors.cardview,
          width: '100%',
          padding: normalize(12),
          marginTop: normalize(20),
          borderRadius: normalize(10),
          flexDirection: 'row',
          paddingHorizontal: normalize(20),
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.img}
            style={{
              width: normalize(20),
              height: normalize(20),
              resizeMode: 'contain',
              tintColor:
                item.txt == 'Delete your account' ? Colors.red : Colors.white,
            }}
          />
          <Text
            style={{
              marginLeft: normalize(10),
              color: Colors.lightpink,
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(13),
            }}>
            {item.txt}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            item.txt == 'Logout'
              ? //logout()

                Alert.alert(
                  'Are you sure you want to logout from your account?',
                  '',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => logout()},
                  ],
                )
              : item.txt == 'Delete your account'
              ? Alert.alert(
                  'Are you sure you want to delete your account?',
                  '',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => deletefunction()},
                  ],
                )
              : item.screen == ''
              ? {}
              : props.navigation.navigate(item.screen)
          }
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
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderdata1({item, index}) {
    //   console.log(item?.card_no?.split(''));
    let sp = [];
    sp = item?.card_no?.split('');
    return (
      <View
        style={{
          backgroundColor: '#030721',
          width: '100%',
          padding: normalize(15),
          marginTop: normalize(20),
          borderRadius: normalize(10),
          borderWidth: 1,
          borderColor: '#030721',
        }}>
        <View
          style={{
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
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
            <View>
              {console.log('id==', item?.id)}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Are you sure you want to Delete This Card?',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => CardDelete(item?.id)},
                    ],
                  )
                }
                style={{
                  borderColor: '#D73F9D',
                  borderWidth: 1,
                  borderRadius: 6,
                  height: normalize(23),
                  width: normalize(60),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(10),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('CardEdit', {
                    id: item.id,
                    name: item.card_holder_name,
                    exp: item.exp_date,
                    number: item.card_no,
                    primary:item.is_primary
                  })
                }
                style={{
                  borderColor: '#D73F9D',
                  borderWidth: 1,
                  borderRadius: 6,
                  height: normalize(23),
                  width: normalize(60),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  function renderdata2({item, index}) {
    //   console.log(item?.card_no?.split(''));

    return (
      <View
        style={{
          backgroundColor: '#030721',
          width: '100%',
          padding: normalize(15),
          marginTop: normalize(20),
          borderRadius: normalize(10),
          borderWidth: 1,
          borderColor: '#030721',
        }}>
        <View
          style={{
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
            }}>
            {/* <Image source={item.image} style={{width:normalize(45),height:normalize(45),resizeMode:'stretch'}}/> */}
            <View style={{marginLeft: normalize(8)}}>
              <Text
                style={{
                  fontSize: normalize(14),
                  fontFamily: Fonts.Poppins_Medium,
                  color: Colors.lightpink,
                  textTransform: 'capitalize',
                }}>
                Amount:{' '}
                <Text style={{color: '#D73F9D'}}>
                  ${item?.sale_amount}
                </Text>
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(11),
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  {moment(item.created_at).format('D MMM yyyy')}
                  {moment(item.created_at, 'h:mm').format('  hh:mm A')}
                </Text>

                {/* <Text style={{color: Colors.lightgreen,marginLeft:normalize(4),
                fontSize:normalize(11),fontFamily:Fonts.Poppins_Medium}}>{moment(item?.payment_details?.created_at).format('D MMM yyyy')}</Text> */}
              </View>
            </View>
            <Text
              style={{
                fontSize: normalize(12),
                fontFamily: Fonts.Poppins_Medium,
                color: Colors.lightpink,
              }}>
              {item?.pass_detail?.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function deletefunction() {
    connectionrequest()
      .then(() => {
        dispatch(deleteaccountRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function logout() {
    dispatch(logoutRequest());
  }
  function CardDelete(id) {
    let obj = new FormData();
    obj.append('card_id', id);
    connectionrequest()
      .then(() => {
        dispatch(deleteCardRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
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

  return (
    <>
      <MyStatusBar backgroundColor={'#030721'} barStyle={'light-content'} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#030721',
          marginTop: Platform.OS == 'android' ? STATUSBAR_HEIGHT : null,
        }}>
        <ScrollView>
          <View style={{flexDirection: 'row', marginTop: normalize(20)}}>
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
              onPress={() => props.navigation.navigate('Account')}>
              <Image
                source={Icons.Arrow}
                resizeMode="contain"
                style={{
                  height: normalize(6),
                  width: normalize(10),
                  transform: [{rotate: '90deg'}],
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                height: normalize(72),
                width: normalize(72),
                borderRadius: normalize(36),
                backgroundColor: '#0E1648',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: normalize(80),
              }}>
              <Image
                source={Icons.Settings}
                style={{height: normalize(33), width: normalize(33)}}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: normalize(22),
              color: '#fff',
              alignSelf: 'center',
              marginTop: normalize(10),
            }}>
            Settings
          </Text>
          <View
            style={{
              height: normalize(50),
              width: normalize(290),
              backgroundColor: '#0E1648',
              marginVertical: normalize(8),
              borderRadius: normalize(10),
              alignSelf: 'center',

              alignItems: 'center',
              fontSize: normalize(11),
              paddingHorizontal: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(10),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#B9A4F4',
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Change Password
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Security')}
              style={{
                height: normalize(30),
                width: normalize(30),
                backgroundColor: '#D73F9D',
                borderRadius: normalize(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Icons.Arrow}
                resizeMode="contain"
                style={{
                  height: normalize(6),
                  width: normalize(10),

                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: normalize(50),
              width: normalize(290),
              backgroundColor: '#0E1648',
              marginVertical: normalize(8),
              borderRadius: normalize(10),
              alignSelf: 'center',

              alignItems: 'center',
              fontSize: normalize(11),
              paddingHorizontal: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(10),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#B9A4F4',
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Payment Methods
            </Text>
            <TouchableOpacity
              onPress={() => setdownarrow(!downarrow)}
              style={{
                height: normalize(30),
                width: normalize(30),
                backgroundColor: '#D73F9D',
                borderRadius: normalize(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Icons.Arrow}
                resizeMode="contain"
                style={{
                  height: normalize(6),
                  width: normalize(10),
                  transform: [{rotate: downarrow ? '180deg' : '0deg'}],
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          {downarrow && (
            <FlatList
              data={HomeReducer.getCardResponse}
              renderItem={renderdata1}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
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
              }
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#0E1648',
                borderRadius: normalize(10),
                padding: normalize(15),
                marginVertical: normalize(10),
              }}
              // contentContainerStyle={{ paddingBottom: normalize(30) }}
            />
          )}
          <View
            style={{
              height: normalize(50),
              width: normalize(290),
              backgroundColor: '#0E1648',
              marginVertical: normalize(8),
              borderRadius: normalize(10),
              alignSelf: 'center',

              alignItems: 'center',
              fontSize: normalize(11),
              paddingHorizontal: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(10),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#B9A4F4',
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Payment History
            </Text>
            <TouchableOpacity
              onPress={() => setdownarrow1(!downarrow1)}
              style={{
                height: normalize(30),
                width: normalize(30),
                backgroundColor: '#D73F9D',
                borderRadius: normalize(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Icons.Arrow}
                resizeMode="contain"
                style={{
                  height: normalize(6),
                  width: normalize(10),
                  transform: [{rotate: downarrow1 ? '180deg' : '0deg'}],
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          {downarrow1 && (
            <FlatList
              data={ProfileReducer?.historyResponse?.data}
              renderItem={renderdata2}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#0E1648',
                borderRadius: normalize(10),
                padding: normalize(15),
                marginVertical: normalize(10),
              }}
              // contentContainerStyle={{ paddingBottom: normalize(30) }}

              ListEmptyComponent={
                <View
                  style={{
                    width: '100%',
                    paddingVertical: normalize(13),
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: normalize(8),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(14),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    No Transactions
                  </Text>
                </View>
              }
            />
          )}
          <View
            style={{
              height: normalize(50),
              width: normalize(290),
              backgroundColor: '#0E1648',
              marginVertical: normalize(8),
              borderRadius: normalize(10),
              alignSelf: 'center',

              alignItems: 'center',
              fontSize: normalize(11),
              paddingHorizontal: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(10),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#B9A4F4',
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Invite Friends
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('InviteFriends')}
              style={{
                height: normalize(30),
                width: normalize(30),
                backgroundColor: '#D73F9D',
                borderRadius: normalize(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Icons.Arrow}
                resizeMode="contain"
                style={{
                  height: normalize(6),
                  width: normalize(10),

                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: normalize(50),
              width: normalize(290),
              backgroundColor: '#0E1648',
              marginVertical: normalize(8),
              borderRadius: normalize(10),
              alignSelf: 'center',

              alignItems: 'center',
              fontSize: normalize(11),
              paddingHorizontal: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(10),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#B9A4F4',
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Contact Us
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://whichbar.com/#con')}
              style={{
                height: normalize(30),
                width: normalize(30),
                backgroundColor: '#D73F9D',
                borderRadius: normalize(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Icons.link}
                resizeMode="contain"
                style={{
                  height: normalize(16),
                  width: normalize(20),

                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: normalize(50),
              width: normalize(290),
              backgroundColor: '#0E1648',
              marginVertical: normalize(8),
              borderRadius: normalize(10),
              alignSelf: 'center',

              alignItems: 'center',
              fontSize: normalize(11),
              paddingHorizontal: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(10),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#B9A4F4',
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Profile Name
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('UpdateName')}
              style={{
                height: normalize(30),
                width: normalize(30),
                backgroundColor: '#D73F9D',
                borderRadius: normalize(5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Icons.Arrow}
                resizeMode="contain"
                style={{
                  height: normalize(6),
                  width: normalize(10),

                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: normalize(290),
              backgroundColor: '#030721',
              marginVertical: normalize(8),
              borderRadius: normalize(10),
              alignSelf: 'center',

              // alignItems: 'center',
              fontSize: normalize(11),
              paddingHorizontal: normalize(15),

              marginTop: normalize(10),
              borderWidth: normalize(1),
              borderColor: '#fff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: normalize(15),
              }}>
              <Text
                style={{
                  fontSize: normalize(17),
                  color: '#FF58BF',
                  fontWeight: '500',
                }}>
                College Mode
              </Text>
              <TouchableOpacity
                onPress={() => ToggleMode()}
                style={{
                  height: normalize(17),
                  width: normalize(35),
                  borderRadius: normalize(10),
                  backgroundColor: agree ? '#2AE8AB' : '#0E1648',
                  // alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => ToggleMode()}
                  style={{
                    height: normalize(14),
                    width: normalize(14),
                    borderRadius: normalize(7),
                    backgroundColor: '#fff',
                    left: agree ? normalize(19) : normalize(2),
                  }}
                />
              </TouchableOpacity>
            </View>
            {agree && (
              <>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      borderColor: '#161F5C',
                      borderWidth: 4,
                      width: '50%',
                      height: normalize(38),
                      borderRadius: normalize(10),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => setOnSwitch(false)}
                      style={{
                        backgroundColor: !onSwitch ? '#FF58BF' : 'transparent',
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
                      onPress={() => setOnSwitch(true)}
                      style={{
                        backgroundColor: onSwitch ? '#FF58BF' : 'transparent',
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
                  <TouchableOpacity
                    onPress={() => CollgeModeAdd()}
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
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          {/* <View
            style={{
              height: normalize(100),
              width: normalize(290),
              backgroundColor: '#0E1648',
              // marginVertical: normalize(8),
              borderRadius: normalize(10),

              fontSize: normalize(11),
              paddingHorizontal: normalize(15),

              marginTop: normalize(10),
              alignSelf: 'center',
              // marginBottom: normalize(20),
            }}>
            <Text
              style={{
                fontSize: normalize(17),
                color: '#FF58BF',
                fontWeight: '500',
                marginTop: normalize(15),
              }}>
              {ProfileReducer?.lastWeekResponse}
            </Text>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#9097CD',
                fontWeight: '500',
                marginTop: normalize(10),
              }}>
              Users have logged in within the past week in your area
            </Text>
          </View> */}
          <FlatList
            data={dataset}
            renderItem={renderdata}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: normalize(10),
            }}
            contentContainerStyle={{paddingBottom: normalize(90)}}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

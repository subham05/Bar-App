import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import connectionrequest from '../../utils/helpers/NetInfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import MyStatusBar from '../../utils/MyStatusBar';
import showErrorAlert from '../../utils/helpers/Toast';
// import {ImagePath} from '../../themes/Path';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {useDispatch, useSelector} from 'react-redux';
import {
  acceptRejectRequest,
  deleteFriendRequest,
  friendReqListRequest,
  friendSendRequest,
  profileRequest,
  totalFriendRequest,
} from '../../redux/reducer/ProfileReducer';
import ColorText from '../../components/ColorText';
import constants from '../../utils/helpers/constants';
export default function FriendsPge(props) {
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [searchData, setSearchData] = useState('');
  const [open, setOpen] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalData1, setModalData1] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalFriendRequest());
    dispatch(friendReqListRequest());
  }, []);
  useEffect(() => {
    searchFriend();
  }, [searchData]);


  const url = ProfileReducer?.InviteInfoResponse?.data?.link;
  const title = ProfileReducer?.InviteInfoResponse?.data?.title;
  const message = ProfileReducer?.InviteInfoResponse?.data?.message;
  const options = Platform.select({
    ios: {
      activityItemSources: [
        // {
        //   // For sharing url with custom title.
        //   placeholderItem: {type: 'url', content: url},
        //   item: {
        //     default: {type: 'url', content: url},
        //   },
        //   subject: {
        //     default: title,
        //   },
        //   linkMetadata: {originalUrl: url},
        // },
        // {
        //   // For sharing text.
        //   placeholderItem: {type: 'text', content: message},
        //   item: {
        //     default: {type: 'text', content: message},
        //     message: null, // Specify no text to share via Messages app.
        //   },
        //   linkMetadata: {
        //     // For showing app icon on share preview.
        //     title: message,
        //   },
        // },
        {
          // For using custom icon instead of default text icon at share preview when sharing with message.
          placeholderItem: {
            type: 'url',
            content: url,
          },
          item: {
            default: {
              type: 'text',
              content:`${message} ${url}`,
            },
          },
          subject: {
                default: title,
              },
          linkMetadata: {
            originalUrl:url
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });
  const openShare = async () => {
    await Share.open(options);
  };

  useEffect(() => {
    if (ProfileReducer.status == 'Profile/friendSendSuccess') {
      setTimeout(() => setModalVisible2(false), 1000);
    } else if (ProfileReducer.status == 'Profile/deleteFriendSuccess') {
      setTimeout(() => {
        setModalVisible3(false);
      }, 1500);
      connectionrequest()
        .then(() => {
          dispatch(totalFriendRequest());
          dispatch(profileRequest());
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    } else if (ProfileReducer.status == 'Profile/acceptRejectSuccess') {
      connectionrequest()
        .then(() => {
          dispatch(totalFriendRequest());
          dispatch(friendReqListRequest());
          dispatch(profileRequest());
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }, [ProfileReducer.status]);
  function searchFriend() {
    let obj = new FormData();
    obj.append('name', searchData);
    console.log('----Search obj', obj);
    connectionrequest()
      .then(() => {
        dispatch(totalFriendRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function sendFriendRequest() {
    let obj = new FormData();
    obj.append('friend_id', modalData?.id);
    obj.append('device_token', AuthReducer?.fcmResponse);
    obj.append('device_type', Platform.OS);
   
    connectionrequest()
      .then(() => {
        dispatch(friendSendRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function deleteFriend() {
    let obj = new FormData();
    obj.append('friend_id', modalData1?.id);
    connectionrequest()
      .then(() => {
        dispatch(deleteFriendRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function decisionFunction(val, item) {
    console.log('pressed', val, item);
    let obj = new FormData();
    obj.append('request_id', item?.id);
    obj.append('accept_or_reject', val == '1' ? '1' : '2');
    connectionrequest()
      .then(() => {
        dispatch(acceptRejectRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalData1(item);
          setModalVisible3(true);
        }}
        style={{
          height: normalize(59),
          width: normalize(290),
          backgroundColor: '#0E1648',
          marginVertical: normalize(10),
          borderRadius: normalize(10),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: normalize(10),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center',width:'75%'}}>
            <View
              style={{
                height: normalize(50),
                width: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#262D5A',
              }}>
              {item.profile_photo_path ? (
                <Image
                  source={{uri: item.profile_photo_url}}
                  style={{
                    height: normalize(43),
                    width: normalize(43),
                    borderRadius: 50,

                    borderColor: '#D73F9D',
                    borderWidth: 2,
                  }}
                />
              ) : (
                <Image
                  source={Icons.fpage}
                  style={{
                    height: normalize(43),
                    width: normalize(43),
                    borderRadius: 50,
                    borderColor: '#D73F9D',
                    borderWidth: 2,
                  }}
                />
              )}
            </View>
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(12),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
               
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                {item.first_name} {item.last_name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(10),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
                

                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {item.user_name || 'Not Available'}
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'center',width:'25%',}}>
            <Text
              style={{
                fontSize: normalize(10),
                color: '#fff',
                fontFamily: Fonts.Poppins_Regular,
                fontWeight: '400',
              }}>
              Bars Visited
            </Text>

            <Text
              style={{
                fontSize: normalize(15),
                color: '#B9A4F4',
                fontWeight: '600',
              }}>
              {item.user_visits_count}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem1 = ({item, index}) => {
    return (
      <View
        style={{
          borderColor: '#333F8F',
          borderWidth: 3,
          height: normalize(64),
          width: normalize(260),
          backgroundColor: '#0E1648',
          marginVertical: normalize(5),
          borderRadius: normalize(10),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: normalize(10),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center',width:'40%'}}>
            <View
              style={{
                height: normalize(50),
                width: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#262D5A',
              }}>
              {item?.user?.profile_photo_path ? (
                <Image
                  source={{
                    uri: `${constants.IMAGE_URL}${item?.user?.profile_photo_path}`,
                  }}
                  style={{
                    height: normalize(43),
                    width: normalize(43),
                    borderRadius: 50,

                    borderColor: '#D73F9D',
                    borderWidth: 2,
                  }}
                />
              ) : (
                <Image
                  source={Icons.fpage}
                  style={{
                    height: normalize(43),
                    width: normalize(43),
                    borderRadius: 50,
                    borderColor: '#D73F9D',
                    borderWidth: 2,
                  }}
                />
              )}
            </View>
            <View >
              <Text
              
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(12),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
                
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                {item?.user?.full_name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(10),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
                

                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {item?.user?.user_name || 'Not Available'}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => decisionFunction(2, item)}
              style={{
                height: normalize(28),
                borderRadius: normalize(10),
                backgroundColor: '#EC41AB',
                width: normalize(40),
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#241453',
                borderWidth: 2,
              }}>
              <Image
                style={{
                  height: normalize(11),
                  width: normalize(20),
                  resizeMode: 'contain',
                }}
                source={Icons.uncheckWhite}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => decisionFunction(1, item)}
              style={{
                height: normalize(28),
                borderRadius: normalize(10),
                backgroundColor: '#2AE8AB',
                marginLeft: normalize(6),
                width: normalize(40),
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#241453',
                borderWidth: 2,
              }}>
              <Image
                style={{
                  height: normalize(11),
                  width: normalize(20),
                  resizeMode: 'contain',
                }}
                source={Icons.checkWhite}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const renderItem2 = ({item, index}) => {
    return (
      <View
        style={{
          borderColor: '#333F8F',
          borderWidth: 3,
          height: normalize(64),
          width: normalize(260),
          backgroundColor: '#0E1648',
          marginVertical: normalize(5),
          borderRadius: normalize(10),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: normalize(10),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center',width:'75%'}}>
            <View
              style={{
                height: normalize(50),
                width: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#262D5A',
              }}>
              {item.profile_photo_path ? (
                <Image
                  source={{uri: item.profile_photo_url}}
                  style={{
                    height: normalize(43),
                    width: normalize(43),
                    borderRadius: 50,

                    borderColor: '#D73F9D',
                    borderWidth: 2,
                  }}
                />
              ) : (
                <Image
                  source={Icons.fpage}
                  style={{
                    height: normalize(43),
                    width: normalize(43),
                    borderRadius: 50,
                    borderColor: '#D73F9D',
                    borderWidth: 2,
                  }}
                />
              )}
            </View>
            <View >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(12),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
                 
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                {item.first_name} {item.last_name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: normalize(10),
                  marginLeft: normalize(10),
                  color: '#B9A4F4',
                

                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {item.user_name || 'Not Available'}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              width: '25%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalData(item);
                setModalVisible2(true);
              }}
              style={{
                height: normalize(28),
                borderRadius: normalize(10),
                backgroundColor: '#333F8F',
                marginLeft: normalize(10),
                width: normalize(40),
                borderColor: '#241453',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: normalize(11),
                  width: normalize(20),
                  resizeMode: 'contain',
                }}
                source={Icons.plusWhite}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
     
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
        <MyStatusBar backgroundColor={'#030721'} barStyle={'light-content'} />
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(25),
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
                  marginLeft: normalize(15),
                }}
                onPress={() => props.navigation.navigate('Account')}>
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
              <Image
                source={Icons.fpage}
                style={{
                  height: normalize(150),
                  width: normalize(150),
                  marginHorizontal: normalize(40),
                }}
              />
              <TouchableOpacity
                onPress={() => openShare()}
                style={{
                  backgroundColor: '#2AE8AB',
                  paddingHorizontal: normalize(7),
                  height: normalize(28),
                  borderRadius: normalize(10),
                  position: 'absolute',
                  right: normalize(10),
                  top: 0,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: Fonts.Poppins_Bold,
                    fontSize: normalize(10),
                  }}>
                  Invite Friends
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: normalize(40),
                color: '#fff',
                fontWeight: '700',
                alignSelf: 'center',
                marginTop: normalize(10),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              {ProfileReducer?.totalFriendResponse?.friend_count}
            </Text>
            <Text
              style={{
                fontSize: normalize(17),
                color: '#fff',
                fontWeight: '700',
                alignSelf: 'center',
              }}>
              Friends
            </Text>
            <View
              style={{
                height: normalize(35),
                width: normalize(260),
                backgroundColor: '#0E1648',
                marginVertical: normalize(10),
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
                value={searchData}
                onChangeText={val => setSearchData(val)}
                placeholder="Search Friend"
                placeholderTextColor={'#B4BDF1'}
                style={{
                  height: normalize(34),
                  width: normalize(200),
                  paddingHorizontal: normalize(10),
                  color: '#fff',
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: '#0E1648',
                paddingHorizontal: normalize(11),
                width: normalize(290),
                alignSelf: 'center',
                borderRadius: normalize(10),
              }}>
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
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      height: normalize(28),
                      width: normalize(28),
                      borderRadius: 50,
                      backgroundColor: '#1F2B73',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#2AE8AB',
                        fontSize: normalize(18),
                        fontFamily: Fonts.Poppins_Bold,
                      }}>
                      {ProfileReducer?.friendReqListResponse?.data?.length}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      color: '#B9A4F4',
                      fontWeight: '500',
                      alignSelf: 'center',
                      marginLeft: normalize(6),
                    }}>
                    Friend Requests
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setOpen(!open)}
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
                    resizeMode={'contain'}
                    style={{
                      transform: open
                        ? [{rotate: '180deg'}]
                        : [{rotate: '0deg'}],
                      height: normalize(6),
                      width: normalize(8),
                      // transform: [{rotate: '90deg'}],

                      marginHorizontal: normalize(15),
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>
              </View>
              {open && (
                <FlatList
                  data={ProfileReducer?.friendReqListResponse?.data}
                  renderItem={renderItem1}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{paddingBottom: normalize(10)}}
                  ListEmptyComponent={
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.white,
                        fontFamily: Fonts.Poppins_Medium,
                        fontSize: normalize(13),
                        marginBottom: normalize(14),
                      }}>
                      No Friend Request
                    </Text>
                  }
                />
              )}
            </View>
            {searchData != '' && (
              <View
                style={{
                  width: normalize(290),
                  backgroundColor: '#0E1648',
                  marginVertical: normalize(8),
                  borderRadius: normalize(10),
                  alignSelf: 'center',
                }}>
                <FlatList
                  data={ProfileReducer?.totalFriendResponse?.user_list}
                  renderItem={renderItem2}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{paddingVertical: normalize(10)}}
                  ListEmptyComponent={
                    <Text
                      style={{
                        color: Colors.white,
                        textAlign: 'center',
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      No Friends Found
                    </Text>
                  }
                />
              </View>
            )}
            {ProfileReducer?.totalFriendResponse?.feed?.length > 0 ? (
              <FlatList
                data={ProfileReducer?.totalFriendResponse?.feed}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{paddingBottom: normalize(90)}}
              />
            ) : (
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontSize: normalize(12),
                  marginTop: normalize(16),
                  marginBottom: normalize(80),
                }}>
                Invite Your Friends
              </Text>
            )}
          </ScrollView>
          <Modal
            isVisible={isModalVisible2}
            onBackdropPress={() => setModalVisible2(false)}>
            <KeyboardAvoidingView
              style={{flexGrow: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                style={{flexGrow: 1}}
                contentContainerStyle={{
                  justifyContent: 'center',
                  flexGrow: 1,
                  paddingVertical: normalize(40),
                }}>
                <View
                  style={{
                    width: normalize(280),
                    backgroundColor: '#08103A',
                    alignSelf: 'center',
                    paddingBottom: normalize(15),
                    borderRadius: normalize(10),
                  }}>
                  <View
                    style={{
                      height: normalize(50),
                      width: normalize(280),
                      backgroundColor: '#D73F9D',
                      alignSelf: 'center',
                      borderTopRightRadius: normalize(10),
                      borderTopLeftRadius: normalize(10),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible2(!isModalVisible2)}
                      style={{
                        height: normalize(30),
                        width: normalize(30),
                        borderRadius: normalize(5),
                        backgroundColor: '#E95AB2',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: normalize(15),
                      }}>
                      <Image
                        source={Icons.Arrow}
                        resizeMode={'contain'}
                        style={{
                          height: normalize(8),
                          width: normalize(8),
                          transform: [{rotate: '90deg'}],
                          tintColor: '#fff',
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(18),
                        fontWeight: '600',
                        paddingHorizontal: normalize(20),
                      }}>
                      Searched Account
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: normalize(10),
                      justifyContent: 'space-between',
                    }}>
                    <View style={{alignItems: 'center', width: '30%'}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_SemiBold,
                        }}>
                        Friends :
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(22),
                          fontFamily: Fonts.Poppins_SemiBold,
                          textAlign: 'center',
                        }}>
                        {modalData?.total_friend}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center', width: '40%'}}>
                      <View
                        style={{
                          width: normalize(86),
                          height: normalize(86),
                          backgroundColor: '#21284E',
                          borderRadius: 80,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {modalData?.profile_photo_path != null ? (
                          <Image
                            style={{
                              height: normalize(75),
                              width: normalize(75),
                              borderColor: '#E95AB2',
                              borderWidth: 1,
                              borderRadius: 80,
                              resizeMode: 'cover',
                            }}
                            source={{
                              uri: `${constants.IMAGE_URL}${modalData?.profile_photo_path}`,
                            }}
                          />
                        ) : (
                          <Image
                            style={{
                              height: normalize(75),
                              width: normalize(75),
                              borderColor: '#E95AB2',
                              borderWidth: 1,
                              borderRadius: 80,
                              resizeMode: 'cover',
                            }}
                            source={Icons.DefaultProfile}
                          />
                        )}
                      </View>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: '#B9A4F4',
                          fontSize: normalize(16),
                          textAlign: 'center',
                          marginTop: normalize(3),
                        }}>
                        {modalData?.full_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_Regular,
                          color: '#B9A4F4',
                          fontSize: normalize(10),
                          textAlign: 'center',
                          marginTop: normalize(3),
                        }}>
                        {modalData?.user_name || 'Not Available'}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center', width: '30%'}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_SemiBold,
                          textAlign: 'center',
                        }}>
                        Bars Visited :
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(22),
                          fontFamily: Fonts.Poppins_SemiBold,
                        }}>
                        {modalData?.user_visits_count}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_SemiBold,
                      color: Colors.white,
                      fontSize: normalize(15),
                      textAlign: 'center',
                      marginVertical: normalize(6),
                    }}>
                    Do you want to send a friend request?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: normalize(15),
                      marginTop: normalize(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible2(!isModalVisible2)}
                      style={{
                        height: normalize(42),
                        borderRadius: normalize(10),
                        backgroundColor: '#EC41AB',
                        width: '48%',
                        borderColor: '#241453',
                        borderWidth: 2,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: normalize(11),
                          width: normalize(20),
                          resizeMode: 'contain',
                        }}
                        source={Icons.uncheckWhite}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: Colors.white,
                          fontSize: normalize(16),
                        }}>
                        Ignore
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => sendFriendRequest()}
                      style={{
                        height: normalize(42),
                        borderRadius: normalize(10),
                        backgroundColor: '#2AE8AB',
                        marginLeft: normalize(10),
                        width: '48%',
                        borderColor: '#241453',
                        borderWidth: 2,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: normalize(11),
                          width: normalize(20),
                          resizeMode: 'contain',
                        }}
                        source={Icons.checkWhite}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: Colors.white,
                          fontSize: normalize(16),
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            {/* <Modal
                isVisible={isModalVisible10}
                onBackdropPress={() => setModalVisible10(false)}>
                <View
                  style={{
                    height:
                      Platform.OS == 'android'
                        ? normalize(290)
                        : normalize(290),
                    // borderRadius: normalize(15),
                    alignSelf: 'center',
                    width: normalize(300),
                    alignItems: 'center',
                    backgroundColor: '#08103A',
                    borderRadius: normalize(10),
                  }}>
                  <View
                    style={{
                      height: normalize(250),
                      width: normalize(275),
                      backgroundColor: '#161F5C',
                      marginTop: normalize(18),
                      borderRadius: normalize(10),
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: normalize(20),
                            color: '#FF58BF',
                            marginTop: normalize(8),
                          }}>
                          Your request has been submitted, Thank You!
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal> */}
          </Modal>
          <Modal
            isVisible={isModalVisible3}
            onBackdropPress={() => setModalVisible3(false)}>
            <KeyboardAvoidingView
              style={{flexGrow: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                style={{flexGrow: 1}}
                contentContainerStyle={{
                  justifyContent: 'center',
                  flexGrow: 1,
                  paddingVertical: normalize(40),
                }}>
                <View
                  style={{
                    width: normalize(280),
                    backgroundColor: '#08103A',
                    alignSelf: 'center',
                    paddingBottom: normalize(15),
                    borderRadius: normalize(10),
                  }}>
                  <View
                    style={{
                      height: normalize(50),
                      width: normalize(280),
                      backgroundColor: '#D73F9D',
                      alignSelf: 'center',
                      borderTopRightRadius: normalize(10),
                      borderTopLeftRadius: normalize(10),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible3(!isModalVisible3)}
                      style={{
                        height: normalize(30),
                        width: normalize(30),
                        borderRadius: normalize(5),
                        backgroundColor: '#E95AB2',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: normalize(15),
                      }}>
                      <Image
                        source={Icons.Arrow}
                        resizeMode={'contain'}
                        style={{
                          height: normalize(8),
                          width: normalize(8),
                          transform: [{rotate: '90deg'}],
                          tintColor: '#fff',
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(18),
                        fontWeight: '600',
                        paddingHorizontal: normalize(67),
                      }}>
                      Friend
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: normalize(10),
                      justifyContent: 'space-between',
                    }}>
                    <View style={{alignItems: 'center', width: '30%'}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_SemiBold,
                        }}>
                        Friends :
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(22),
                          fontFamily: Fonts.Poppins_SemiBold,
                        }}>
                        {modalData1?.total_friend}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center', width: '40%'}}>
                      <View
                        style={{
                          width: normalize(86),
                          height: normalize(86),
                          backgroundColor: '#21284E',
                          borderRadius: 80,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {modalData1?.profile_photo_path != null ? (
                          <Image
                            style={{
                              height: normalize(75),
                              width: normalize(75),
                              borderColor: '#E95AB2',
                              borderWidth: 1,
                              borderRadius: 80,
                              resizeMode: 'cover',
                            }}
                            source={{
                              uri: `${constants.IMAGE_URL}${modalData1?.profile_photo_path}`,
                            }}
                          />
                        ) : (
                          <Image
                            style={{
                              height: normalize(75),
                              width: normalize(75),
                              borderColor: '#E95AB2',
                              borderWidth: 1,
                              borderRadius: 80,
                              resizeMode: 'cover',
                            }}
                            source={Icons.DefaultProfile}
                          />
                        )}
                      </View>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: '#B9A4F4',
                          fontSize: normalize(16),
                          textAlign: 'center',
                          marginTop: normalize(3),
                        }}>
                        {modalData1?.full_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_Regular,
                          color: '#B9A4F4',
                          fontSize: normalize(10),
                          textAlign: 'center',
                          marginTop: normalize(3),
                        }}>
                        {modalData1?.user_name || 'Not Available'}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center', width: '30%'}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_SemiBold,
                          textAlign:'center'
                        }}>
                        Bars Visited :
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(22),
                          fontFamily: Fonts.Poppins_SemiBold,
                        }}>
                        {modalData1?.user_visits_count}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'center',
                      paddingHorizontal: normalize(15),
                      marginTop: normalize(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => deleteFriend()}
                      style={{
                        height: normalize(42),
                        borderRadius: normalize(10),
                        backgroundColor: '#EC41AB',
                        width: '70%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: Colors.white,
                          fontSize: normalize(16),
                        }}>
                        Remove Friend
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

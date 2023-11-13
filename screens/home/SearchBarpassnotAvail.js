import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import moment from 'moment';
import ButtonItems from '../../components/ButtonItems';
import {SliderBox} from 'react-native-image-slider-box';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Tags from 'react-native-tags';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import ColorText from '../../components/ColorText';
import {
  barDetailsRequest,
  favouriteRequest,
  requestPass,
} from '../../redux/reducer/HomeReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import constants from '../../utils/helpers/constants';
export default function SearchBarpassnotAvail(props) {
  const [sliderImg, setSliderImg] = useState([]);
  const [sliderImgIndex, setSliderImgIndex] = useState(0);
  const [grant, setGrant] = useState(true);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    checkLocation();
    fetchDetails();
  }, []);
  console.log('---length', sliderImg.length, sliderImgIndex);
  function Increment() {
    if (sliderImg.length - 1 != sliderImgIndex)
      setSliderImgIndex(sliderImgIndex + 1);
  }
  function Decrement() {
    if (sliderImgIndex != 0) setSliderImgIndex(sliderImgIndex - 1);
  }
  console.log('permission', HomeReducer.permissionResponse);
  useEffect(() => {
    if (HomeReducer.status == 'Home/favouriteSuccess') {
      fetchDetails();
    } else if (HomeReducer.status == 'Home/barDetailsSuccess') {
      const arr = [];
      for (
        let index = 0;
        index < HomeReducer.barDetailsResponse?.bar_details?.images?.length;
        index++
      ) {
        arr.push(
          constants.IMAGE_URL +
            HomeReducer.barDetailsResponse?.bar_details?.images[index]?.image,
        );
      }
      setSliderImg(arr);
    } else if (HomeReducer.status == 'Home/requestPassSuccess') {
      fetchDetails();
    }
  }, [HomeReducer.status]);
  function fetchDetails() {
    let obj = new FormData();
    obj.append('bar_owner_id', props.route.params.id);
    connectionrequest()
      .then(() => {
        dispatch(barDetailsRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  function handleFavourite(id, status) {
    console.log('---favourite tap=====>', id, status);
    if (status == 1) {
      var newStatus = 0;
    } else {
      var newStatus = 1;
    }
    let obj = new FormData();
    obj.append('bar_owner_id', id);
    obj.append('is_fav', newStatus);
    console.log('appended', obj);
    dispatch(favouriteRequest(obj));
    fetchDetails();
  }
  function checkLocation() {
    try {
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
        }),
      ).then(res => {
        console.log('granted', res);
        if (res == 'granted') {
          setGrant(true);
        } else {
          setGrant(false);
          // console.log("Location is not enabled");
        }
      });
    } catch (error) {
      console.log('location set error:', error);
    }
  }

  function barVisitRequest() {
    let obj = new FormData();
    obj.append('user_id', ProfileReducer?.profileResponse?.user?.id);
    obj.append('bar_owner_id', HomeReducer.barDetailsResponse?.bar_details?.id);
    connectionrequest()
      .then(() => {
        dispatch(requestPass(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }
  function getCurrentAmount(item) {
    console.log('item', item.tier_amounts);
    let amount;
    if (item?.tier_amounts?.length > 0 && item?.remaining_ticket > 0) {
      for (let index = 0; index < item?.tier_amounts?.length; index++) {
        if (item?.tier_amounts[index]?.current_tire == 1) {
          amount = item?.tier_amounts[index].amount;
        }
      }
      return amount;
    }
    return 0;
  }
  return (
    <>
      <MyStatusBar backgroundColor={'#060C30'} barStyle={'light-content'} />
      <Loader
        visible={
          HomeReducer.status == 'Home/requestPass' ||
          HomeReducer.status == 'Home/barDetailsRequest'
        }
      />

      <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
        <>
          <View
            style={{
              flexDirection: 'row',
              height: normalize(55),
              width: '100%',
              backgroundColor: '#060C30',

              marginTop: Platform.OS == 'android' ? STATUSBAR_HEIGHT : null,

              // alignItems: 'center',

              // justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{
                  height: normalize(30),
                  width: normalize(30),
                  borderRadius: normalize(6),
                  backgroundColor: '#D73F9D',
                  // alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: normalize(15),
                }}>
                <Image
                  source={Icons.Arrow}
                  resizeMode="contain"
                  style={{
                    height: normalize(15),
                    width: normalize(8),
                    transform: [{rotate: '90deg'}],
                    tintColor: '#fff',
                  }}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#fff',
                    fontSize: normalize(16),
                    fontWeight: '500',
                    marginRight: normalize(2),
                    width: normalize(200),
                    textAlign: 'center',
                  }}>
                  {HomeReducer.barDetailsResponse?.bar_details?.first_name}{' '}
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: '#D73F9D',
                      fontSize: normalize(16),
                      fontWeight: '500',
                      marginLeft: normalize(2),
                    }}>
                    {HomeReducer.barDetailsResponse?.bar_details?.last_name}
                  </Text>
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  handleFavourite(
                    HomeReducer.barDetailsResponse?.bar_details?.id,
                    HomeReducer.barDetailsResponse?.bar_details?.is_fav,
                  )
                }
                //   onPress={() => props.navigation.navigate('Settings')}
              >
                <Image
                  source={
                    HomeReducer.barDetailsResponse?.bar_details?.is_fav == 1
                      ? Icons.pLove
                      : Icons.outlinelove
                  }
                  resizeMode="contain"
                  style={{
                    height: normalize(20),
                    width: normalize(22),
                    tintColor: '#fff',
                    marginRight: normalize(20),
                    tintColor:
                      HomeReducer.barDetailsResponse?.bar_details?.is_fav == 1
                        ? '#D73F9D'
                        : '#3e456d',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={{paddingBottom: normalize(80)}}>
            <View>
              {/* {HomeReducer.barDetailsResponse?.bar_details?.bar_owner_image ? (
                <Image
                  source={{
                    uri: HomeReducer.barDetailsResponse?.bar_details
                      ?.bar_owner_image,
                  }}
                  style={{
                    height: normalize(195),
                    width: normalize(295),
                    borderRadius: normalize(10),
                    alignSelf: 'center',
                    marginVertical: normalize(18),
                    justifyContent: 'center',
                    // alignItems: 'center',
                  }}
                />
              ) : (
                <Image
                  source={Icons.defaultBanner}
                  style={{
                    height: normalize(195),
                    width: normalize(295),
                    borderRadius: normalize(10),
                    alignSelf: 'center',
                    marginVertical: normalize(18),
                    justifyContent: 'center',
                    // alignItems: 'center',
                  }}
                />
              )} */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: normalize(18),
                }}>
                {HomeReducer.barDetailsResponse?.bar_details?.images.length >
                0 ? (
                  <SliderBox
                    images={sliderImg}
                    sliderBoxHeight={normalize(195)}
                    ImageComponentStyle={{
                      borderRadius: normalize(10),
                      width: '90%',
                      marginTop: 5,
                    }}
                    // autoplay
                    // circleLoop
                    imageLoadingColor="white"
                    dotStyle={{display: 'none'}}
                    firstItem={sliderImgIndex}
                  />
                ) : (
                  <Image
                    source={Icons.defaultBanner}
                    style={{
                      height: normalize(195),
                      width: normalize(295),
                      borderRadius: normalize(10),
                      alignSelf: 'center',
                      marginVertical: normalize(18),
                      justifyContent: 'center',
                      // alignItems: 'center',
                    }}
                  />
                )}
              </View>
              {HomeReducer.barDetailsResponse?.bar_details?.images?.length >
                0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: normalize(15),
                    position: 'absolute',
                    width: '90%',
                    // bottom: 0,
                    height: normalize(235),
                    paddingHorizontal: normalize(5),
                  }}>
                  <TouchableOpacity
                    onPress={() => Decrement()}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      borderRadius: normalize(8),
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={Icons.Arrow}
                      resizeMode="contain"
                      style={{
                        tintColor: 'black',
                        height: normalize(8),
                        width: normalize(7),
                        transform: [{rotate: '90deg'}],
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Increment()}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      borderRadius: normalize(8),
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={Icons.Arrow}
                      resizeMode="contain"
                      style={{
                        tintColor: 'black',
                        height: normalize(8),
                        width: normalize(6),
                        transform: [{rotate: '270deg'}],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View
              style={{
                paddingBottom: normalize(20),
                width: normalize(295),
                borderRadius: normalize(10),
                alignSelf: 'center',
                backgroundColor: '#060C30',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  marginTop: normalize(10),
                  marginBottom: normalize(10),
                  marginLeft: normalize(10),
                }}>
                Tags
              </Text>
              {HomeReducer?.barDetailsResponse?.bar_details?.tags?.length >
              0 ? (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {HomeReducer?.barDetailsResponse?.bar_details?.tags?.map(
                    (item, index) => (
                      <TouchableOpacity
                        style={{
                          height: normalize(25),
                          paddingHorizontal: normalize(10),
                          marginBottom: normalize(5),
                          backgroundColor: '#36407D',
                          borderRadius: normalize(5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: normalize(10),
                          marginTop: normalize(5),
                          bottom: normalize(3),
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(11),
                            color: '#2AE8AB',
                            fontWeight: '700',
                          }}>
                          {item.tag.tag}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: normalize(15)}}>
                    No Tags Available
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: normalize(20),
                marginTop: normalize(10),
              }}>
              <View
                style={{
                  minHeight: normalize(100),
                  width: normalize(135),
                  backgroundColor: '#161F5C',
                  borderRadius: normalize(15),
                  borderWidth: normalize(2),
                  borderColor: '#161f5c',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  // marginHorizontal: normalize(5),
                }}>
                <View
                  style={{
                    marginHorizontal: normalize(8),
                    marginTop: normalize(15),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(13),
                        marginRight: normalize(8),
                      }}>
                      Friends Here:
                    </Text>
                    {grant == true &&
                    Number(HomeReducer?.barDetailsResponse?.total_app_friend) >=
                      5 ? null : (
                      <Image
                        style={{
                          height: normalize(14),
                          width: normalize(14),
                          resizeMode: 'contain',
                          tintColor: 'white',
                        }}
                        source={Icons.lockFriends}
                      />
                    )}
                  </View>
                  {grant &&
                  Number(HomeReducer?.barDetailsResponse?.total_app_friend) >=
                    5 ? (
                    <>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(20),
                          fontWeight: '600',
                        }}>
                        {HomeReducer?.barDetailsResponse?.total_friend}
                      </Text>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: normalize(4),
                        }}>
                        {Number(
                          HomeReducer?.barDetailsResponse?.total_app_friend,
                        ) >= 5 ? (
                          <Image
                            style={{
                              height: normalize(12),
                              width: normalize(12),
                              resizeMode: 'contain',
                            }}
                            source={Icons.allow}
                          />
                        ) : (
                          <Image
                            style={{
                              height: normalize(12),
                              width: normalize(12),
                              resizeMode: 'contain',
                            }}
                            source={Icons.dontAllow}
                          />
                        )}

                        <Text
                          style={{
                            color: '#fff',
                            marginLeft: normalize(10),
                            fontSize: normalize(10),
                            fontFamily: Fonts.Poppins_Medium,
                            width: '80%',
                            fontWeight: '600',
                          }}>
                          Have at least 5 friends
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: normalize(4),
                        }}>
                        {grant == true ? (
                          <Image
                            style={{
                              height: normalize(12),
                              width: normalize(12),
                              resizeMode: 'contain',
                            }}
                            source={Icons.allow}
                          />
                        ) : (
                          <Image
                            style={{
                              height: normalize(12),
                              width: normalize(12),
                              resizeMode: 'contain',
                            }}
                            source={Icons.dontAllow}
                          />
                        )}

                        <Text
                          style={{
                            color: '#fff',
                            marginLeft: normalize(10),
                            fontSize: normalize(10),
                            fontFamily: Fonts.Poppins_Medium,
                            width: '80%',
                            fontWeight: '600',
                          }}>
                          Have location set to ‘always’
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
              {HomeReducer?.barDetailsResponse?.userCollege != null && (
                <View
                  style={{
                    minHeight: normalize(100),
                    width: normalize(135),
                    backgroundColor: '#161F5C',
                    borderRadius: normalize(15),
                    borderWidth: normalize(2),
                    borderColor: '#161f5c',
                    paddingBottom: normalize(15),
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // marginHorizontal: normalize(5),
                  }}>
                  <View style={{marginLeft: normalize(8)}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: normalize(12),
                        marginTop: normalize(15),
                      }}>
                      College{' '}
                      {HomeReducer?.barDetailsResponse?.userCollege
                        ?.student_or_alumni == '1'
                        ? 'Students'
                        : 'Alumni'}
                      :
                    </Text>
                    {HomeReducer?.barDetailsResponse?.college_students?.length >
                    0 ? (
                      <>
                        {HomeReducer?.barDetailsResponse?.college_students?.map(
                          (item, index) => (
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: normalize(13),
                              }}>
                              {item?.college_name}: {item?.student_count}
                            </Text>
                          ),
                        )}
                      </>
                    ) : (
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(13),
                          fontFamily:Fonts.Poppins_Regular,
                          marginTop:normalize(2)
                        }}>
                        No Data
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                height: normalize(1),
                width: normalize(290),
                backgroundColor: '#161F5C',
                alignSelf: 'center',
                marginTop: normalize(15),
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: normalize(10),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: normalize(15),
                  fontWeight: '600',
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Line:
              </Text>
              <Text
                style={{
                  fontSize: normalize(13),
                  marginLeft: normalize(4),
                  fontWeight: '600',
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                {HomeReducer.barDetailsResponse?.bar_details?.line_type ==
                  '1' && (
                  <ColorText
                    colorCode={'#ffff'}
                    name={'None'}
                    size={normalize(13)}
                  />
                )}
                {HomeReducer.barDetailsResponse?.bar_details?.line_type ==
                  '2' && (
                  <ColorText
                    colorCode={'#2AE8AB'}
                    name={'Short'}
                    size={normalize(13)}
                  />
                )}
                {HomeReducer.barDetailsResponse?.bar_details?.line_type ==
                  '3' && (
                  <ColorText
                    colorCode={'#DCE024'}
                    name={'Medium'}
                    size={normalize(13)}
                  />
                )}
                {HomeReducer.barDetailsResponse?.bar_details?.line_type ==
                  '4' && (
                  <ColorText
                    colorCode={'#FF7A00'}
                    name={'Long'}
                    size={normalize(13)}
                  />
                )}
                {HomeReducer.barDetailsResponse?.bar_details?.line_type ==
                  '5' && (
                  <ColorText
                    colorCode={'#B4262C'}
                    name={'Very Long'}
                    size={normalize(13)}
                  />
                )}
              </Text>
            </View>
            {HomeReducer.barDetailsResponse?.bar_details?.line_type == '1' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: normalize(20),
                  marginTop: normalize(10),
                }}>
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
              </View>
            )}
            {HomeReducer.barDetailsResponse?.bar_details?.line_type == '2' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: normalize(20),
                  marginTop: normalize(10),
                }}>
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#2AE8AB',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#2AE8AB',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#2AE8AB',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
              </View>
            )}
            {HomeReducer.barDetailsResponse?.bar_details?.line_type == '3' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: normalize(20),
                  marginTop: normalize(10),
                }}>
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#DCE024',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#DCE024',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#DCE024',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#DCE024',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#DCE024',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#DCE024',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
              </View>
            )}
            {HomeReducer.barDetailsResponse?.bar_details?.line_type == '4' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: normalize(20),
                  marginTop: normalize(10),
                }}>
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#FF7A00',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.humanIcon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#252F6F',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
              </View>
            )}
            {HomeReducer.barDetailsResponse?.bar_details?.line_type == '5' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: normalize(20),
                  marginTop: normalize(10),
                }}>
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(35),
                    width: normalize(15),
                    marginTop: normalize(10),
                  }}
                />
                <Image
                  source={Icons.shicon}
                  resizeMode={'contain'}
                  style={{
                    tintColor: '#B4262C',
                    height: normalize(45),
                    width: normalize(20),
                  }}
                />
              </View>
            )}
            {HomeReducer?.todaysPassResponse?.length > 0 ? (
              <>
                {HomeReducer?.todaysPassResponse?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('Passpurchase', {
                        id: item.id,
                        barId: item.bar_owner_id,
                        amt: item.amount,
                        expDate: item.end_date,
                        name: item.pass_id,
                        message: item.message,
                        exptime: item.end_time,
                      })
                    }
                    style={{
                      height: normalize(86),
                      width: normalize(290),
                      backgroundColor: '#161F5C',
                      borderRadius: normalize(10),
                      alignSelf: 'center',
                      marginTop: normalize(10),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: normalize(10),
                        marginVertical: normalize(10),
                        alignItems: 'center',
                        textTransform: 'capitalize',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: normalize(18),
                            color: '#FF58BF',
                            // marginHorizontal: normalize(12),
                          }}>
                          {item.message}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          // marginTop: normalize(10),
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(12),
                            color: '#FFF',
                            textAlign: 'right',
                            // marginHorizontal: normalize(12),
                            // marginVertical: normalize(10),
                          }}>
                          Price
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(20),
                            color: '#FFF',
                            // marginHorizontal: normalize(12),
                            // marginVertical: normalize(10),
                          }}>
                          {`$${getCurrentAmount(item)}`}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', bottom: normalize(7)}}>
                      <Text
                        style={{
                          fontSize: normalize(12),
                          color: '#fff',
                          alignSelf: 'center',
                          marginLeft: normalize(11),
                        }}>
                        Date{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(12),
                          color: '#2AE8AB',
                          alignSelf: 'center',
                        }}>
                        {moment(item.end_date).format('Do MMMM YYYY')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View
                style={{
                  backgroundColor: '#161F5C',
                  padding: normalize(20),
                  marginHorizontal: normalize(20),
                  marginTop: normalize(20),
                  borderRadius: normalize(15),
                  borderWidth: normalize(2),
                  borderColor: '#161f5c',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(15),
                    marginBottom: normalize(15),
                  }}>
                  Bar does not have this feature
                </Text>
                {HomeReducer.barDetailsResponse?.request_bar_pass > 0 ? (
                  <ButtonItems
                    width={normalize(230)}
                    backgroundColor="#3B4061"
                    marginVertical={normalize(30)}
                    height={normalize(45)}
                    marginTop={normalize(5)}
                    textbutton={'Already Requested'}
                  />
                ) : (
                  <ButtonItems
                    width={normalize(230)}
                    marginVertical={normalize(30)}
                    height={normalize(45)}
                    marginTop={normalize(5)}
                    textbutton={'Request bar for passes'}
                    onPress={() => barVisitRequest()}
                  />
                )}

                <Text
                  style={{
                    color: Colors.lightgreen,
                    marginTop: normalize(15),
                    width: '98%',
                    textAlign: 'center',
                    fontFamily: Fonts.Poppins_Medium,
                    paddingRight: normalize(4),
                    fontSize: normalize(13),
                  }}>
                  {HomeReducer.barDetailsResponse?.request_pass}{' '}
                  <Text
                    style={{
                      color: '#9097CD',
                      fontFamily: Fonts.Poppins_Regular,
                    }}>
                    users have requested this feature
                  </Text>{' '}
                </Text>
              </View>
            )}

            {/* <Text
            style={{
              color: '#fff',
              marginBottom: normalize(100),
              marginLeft: normalize(15),
            }}>
            Something wrong or not working?{' '}
          </Text> */}
          </ScrollView>
        </>
      </SafeAreaView>
    </>
  );
}

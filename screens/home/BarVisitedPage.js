import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Modal from 'react-native-modal';
// import ButtonItems from '../../components/ButtonItems';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {barVisitRequest} from '../../redux/reducer/ProfileReducer';
import constants from '../../utils/helpers/constants';
export default function BarVisitedPage(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [DATA, setData] = useState([
    {
      id: 0,
      imagePro: Icons.barsimg,
      text: 'Rocco’s Ta...',
      // star: Icons.star,
      sub: 'Times Visited',
      time: '4',
      // rating: '3.5 / 5 ratings',
    },
    {
      id: 1,
      imagePro: Icons.barsimg,
      text: 'OT Tavern',
      // star: Icons.star,
      sub: 'Times Visited',
      time: '3',
      // rating: '3.5 / 5 ratings',
    },
    {
      id: 2,
      imagePro: Icons.barsimg,
      text: 'Bungalow',
      // star: Icons.star,
      sub: 'Times Visited',
      time: '12',
      // rating: '3.5 / 5 ratings',
    },
    {
      id: 3,
      imagePro: Icons.barsimg,
      text: 'Thunderbird',
      // star: Icons.star,
      sub: 'Times Visited',
      time: '31',
      // rating: '3.5 / 5 ratings',
    },
    {
      id: 4,
      imagePro: Icons.barsimg,
      text: 'Jameson’s Pub',
      // star: Icons.star,
      sub: 'Times Visited',
      time: '7',
      // rating: '3.5 / 5 ratings',
    },
    {
      id: 5,
      imagePro: Icons.barsimg,
      text: 'Green Elephant',
      // star: Icons.star,
      sub: 'Times Visited',
      time: '5',
      // rating: '3.5 / 5 ratings',
    },
  ]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        // onPress={() => setModalVisible2(!isModalVisible2)}
        style={{
          height: normalize(59),
          width: normalize(290),
          backgroundColor: '#0E1648',
          marginVertical: normalize(10),
          borderRadius: normalize(10),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Modal
          isVisible={isModalVisible2}
          onBackdropPress={() => setModalVisible2(false)}>
          <View
            style={{
              height: normalize(500),
              width: normalize(300),
              backgroundColor: '#060C30',
              alignSelf: 'center',
              borderRadius: normalize(10),
            }}>
            <View
              style={{
                height: normalize(50),
                width: normalize(300),
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
                    height: normalize(6),
                    width: normalize(10),
                    transform: [{rotate: '90deg'}],
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  fontSize: normalize(18),
                  fontWeight: '600',
                  paddingHorizontal: normalize(50),
                }}>
                Your Passes
              </Text>
            </View>
            <View
              style={{
                height: normalize(410),
                width: normalize(280),
                backgroundColor: '#161F5C',
                alignSelf: 'center',
                borderRadius: normalize(10),
                marginTop: normalize(25),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: normalize(16),
                  fontWeight: '600',
                  paddingHorizontal: normalize(50),
                  alignSelf: 'center',
                  marginVertical: normalize(10),
                }}>
                Barley House
              </Text>
              <View
                style={{
                  height: normalize(1),
                  width: normalize(280),
                  backgroundColor: '#3B4061',
                }}
              />
              <View
                style={{
                  height: normalize(60),
                  width: normalize(260),
                  backgroundColor: '#060C30',
                  borderRadius: normalize(10),
                  alignSelf: 'center',
                  marginTop: normalize(15),
                }}>
                <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
                  <Image
                    source={Icons.barsimg}
                    style={{
                      height: normalize(40),
                      width: normalize(40),
                      marginLeft: normalize(7),
                    }}
                  />
                  <View style={{marginLeft: normalize(8)}}>
                    <Text
                      style={{
                        color: '#FF58BF',
                        fontSize: normalize(16),
                        fontWeight: '600',
                      }}>
                      Barley House
                    </Text>
                    <View
                      style={{flexDirection: 'row', marginTop: normalize(4)}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        Date
                      </Text>
                      <Text
                        style={{
                          color: '#2AE8AB',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        July 15 2022
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: normalize(60),
                  width: normalize(260),
                  backgroundColor: '#060C30',
                  borderRadius: normalize(10),
                  alignSelf: 'center',
                  marginTop: normalize(15),
                }}>
                <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
                  <Image
                    source={Icons.barsimg}
                    style={{
                      height: normalize(40),
                      width: normalize(40),
                      marginLeft: normalize(7),
                    }}
                  />
                  <View style={{marginLeft: normalize(8)}}>
                    <Text
                      style={{
                        color: '#FF58BF',
                        fontSize: normalize(16),
                        fontWeight: '600',
                      }}>
                      OT Tavern
                    </Text>
                    <View
                      style={{flexDirection: 'row', marginTop: normalize(4)}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        Date
                      </Text>
                      <Text
                        style={{
                          color: '#2AE8AB',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        July 15 2022
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  color: '#858CB7',
                  fontSize: normalize(16),
                  fontWeight: '600',
                  paddingHorizontal: normalize(50),
                  alignSelf: 'center',
                  marginVertical: normalize(10),
                }}>
                Past Passes
              </Text>
              <View
                style={{
                  height: normalize(1),
                  width: normalize(280),
                  backgroundColor: '#3B4061',
                }}
              />
              <View
                style={{
                  height: normalize(60),
                  width: normalize(260),
                  backgroundColor: '#3B4061',
                  borderRadius: normalize(10),
                  alignSelf: 'center',
                  marginTop: normalize(15),
                }}>
                <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
                  <Image
                    source={Icons.barsimgbw}
                    style={{
                      height: normalize(40),
                      width: normalize(40),
                      marginLeft: normalize(7),
                    }}
                  />
                  <View style={{marginLeft: normalize(8)}}>
                    <Text
                      style={{
                        color: '#B9A4F4',
                        fontSize: normalize(16),
                        fontWeight: '600',
                      }}>
                      Barley House
                    </Text>
                    <View
                      style={{flexDirection: 'row', marginTop: normalize(4)}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        Date
                      </Text>
                      <Text
                        style={{
                          color: '#908AA3',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        {' '}
                        July 15 2022
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: normalize(60),
                  width: normalize(260),
                  backgroundColor: '#3B4061',
                  borderRadius: normalize(10),
                  alignSelf: 'center',
                  marginTop: normalize(15),
                }}>
                <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
                  <Image
                    source={Icons.barsimgbw}
                    style={{
                      height: normalize(40),
                      width: normalize(40),
                      marginLeft: normalize(7),
                    }}
                  />
                  <View style={{marginLeft: normalize(8)}}>
                    <Text
                      style={{
                        color: '#B9A4F4',
                        fontSize: normalize(16),
                        fontWeight: '600',
                      }}>
                      Barley House
                    </Text>
                    <View
                      style={{flexDirection: 'row', marginTop: normalize(4)}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        Date
                      </Text>
                      <Text
                        style={{
                          color: '#908AA3',
                          fontSize: normalize(11),
                          fontWeight: '600',
                        }}>
                        {' '}
                        July 15 2022
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            marginLeft: normalize(10),
          }}>
          {item.profile_photo_path ? (
            <Image
              source={{uri: `${constants.IMAGE_URL}${item.profile_photo_path}`}}
              style={{
                borderRadius: normalize(60),
                borderColor: '#262D5A',
                borderWidth: 2,
                height: normalize(50),
                width: normalize(50),
              }}
            />
          ) : (
            <Image
              source={Icons.bvpage}
              style={{
                height: normalize(50),
                width: normalize(50),
              }}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '74%',
              // backgroundColor: 'red',
              marginHorizontal: normalize(10),
            }}>
            <Text
              style={{
                fontSize: normalize(15),
                color: '#B9A4F4',
                fontWeight: '600',
                width: '60%',
                marginTop: normalize(5),
              }}>
              {item.first_name} {item.last_name}
            </Text>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: normalize(10),
                  color: '#fff',
                  fontWeight: '400',
                }}>
               Times Visited
              </Text>

              <Text
                style={{
                  fontSize: normalize(15),
                  color: '#B9A4F4',
                  fontWeight: '600',
                }}>
                {item.visit}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
   
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
              source={Icons.bvpage}
              style={{
                height: normalize(150),
                width: normalize(150),
                marginHorizontal: normalize(40),
                // alignSelf: 'center',
              }}
            />
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
            {ProfileReducer?.barVisitResponse?.bar_owner?.length}
          </Text>
          <Text
            style={{
              fontSize: normalize(17),
              color: '#fff',
              fontWeight: '700',
              alignSelf: 'center',
              fontFamily: Fonts.Poppins_Medium,
            }}>
            Bars Visited
          </Text>
          {ProfileReducer?.barVisitResponse?.bar_owner?.length > 0 ? (
            <FlatList
              data={ProfileReducer?.barVisitResponse?.bar_owner}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingBottom: normalize(90),
                paddingTop: normalize(10),
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: normalize(14),
                color: '#fff',
                alignSelf: 'center',
                fontFamily: Fonts.Poppins_Medium,
              }}>
              No Bar Visited
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

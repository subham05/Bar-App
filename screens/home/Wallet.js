import React, {useEffect, useState} from 'react';
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
  TextInput,
  RefreshControl,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import Modal from 'react-native-modal';
import Loader from '../../utils/helpers/Loader';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '../../components/DateTimePicker';
import {
  userpassesdetailsRequest,
  userpassesdetailsSuccess,
  userpassesdetailsFailure,
  profileRequest,
  profileSuccess,
  profileFailure,
  refundRequest,
  refundSuccess,
  refundFailure,
} from '../../redux/reducer/ProfileReducer';
import moment from 'moment';
let status = '';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';

export default function Wallet(props) {
  const [modalvisible, setmodalvisible] = useState(false);
  const [redeem, setredeem] = useState(0);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [firstdataset, setfirstdataset] = useState([]);
  const [seconddataset, setseconddataset] = useState([]);
  const [selecteddata, setselecteddata] = useState('');
  const [refreshing, setrefreshing] = useState(false);
  const [query, setquery] = useState('');
  useEffect(() => {
    dispatch(profileRequest());
    dispatch(userpassesdetailsRequest());
  }, [isFocused]);
  function fresh() {
    dispatch(userpassesdetailsRequest());
  }
  console.log(ProfileReducer?.userpassesdetailsResponse?.data?.past);
  const [dataset, setdataset] = useState([]);
  const [dataset1, setdataset1] = useState([]);
  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/userpassesdetailsRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/userpassesdetailsSuccess':
        status = ProfileReducer.status;
        // props.navigation.navigate('Signin')
        console.log('hello');
        //  datasetfunction()
        //     let arr = []
        //     let arr1=[]
        //     ProfileReducer?.userpassesdetailsResponse?.data?.map((item) => {
        //         item?.isRedeem == 0 ? (arr.push(item)):(arr1.push(item))
        //     })
        // arr.length > 0 ? setfirstdataset(arr) : (setfirstdataset(arr))
        // arr1.length>0?setseconddataset(arr1):(setseconddataset(arr1))
        break;
      case 'Profile/userpassesdetailsFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/refundRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/refundSuccess':
        status = ProfileReducer.status;

        dispatch(userpassesdetailsRequest());
        setTimeout(() => {
          showErrorAlert(ProfileReducer?.refundResponse?.message);
        }, 1000);
        break;
      case 'Profile/refundFailure':
        status = ProfileReducer.status;
        break;
    }
  }
  function datasetfunction() {
    let arr = [];
    let arr1 = [];
    ProfileReducer?.userpassesdetailsResponse?.data?.map(item => {
      item?.isRedeem == 0 ? arr.push(item) : arr1.push(item);
    });
    arr.length > 0
      ? setfirstdataset(false)
      : (setfirstdataset(true), showErrorAlert(''));
    arr1.length > 0 ? setseconddataset(false) : setseconddataset(true);
  }

  function renderdata({item, index}) {
    console.log(item);
    return (
      <>
        {/* {item?.isRedeem==0 && */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Passdetails', {data: item})}
          style={{
            backgroundColor: Colors.cardview,
            width: '100%',
            padding: normalize(15),
            marginTop: normalize(20),
            borderRadius: normalize(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri:
                    item?.passdetail?.user?.bar_owner_image == ''
                      ? item?.passdetail?.user?.profile_photo_url
                      : item?.passdetail?.user?.bar_owner_image,
                }}
                style={{
                  width: normalize(45),
                  height: normalize(45),
                  borderRadius: normalize(23),
                  resizeMode: 'contain',
                }}
              />
              <View style={{marginLeft: normalize(8)}}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontFamily: Fonts.Poppins_Medium,
                    color: Colors.lightpink,
                    textTransform: 'capitalize',
                  }}>
                  {item?.passdetail?.user?.full_name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(11),
                      fontFamily: Fonts.Poppins_Regular,
                    }}>
                    Date
                  </Text>

                  <Text
                    style={{
                      color: Colors.lightgreen,
                      marginLeft: normalize(4),
                      fontSize: normalize(11),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    {moment(item?.passdetail?.expired_at).format('D MMM yyyy')}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Passdetails', {data: item})
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
        </TouchableOpacity>
        {/* } */}
      </>
    );
  }
  function renderseconddata({item, index}) {
    return (
      <>
        {item?.isRedeem == 1 && (
          <TouchableOpacity
            onPress={() => (setmodalvisible(true), setselecteddata(item))}
            style={{
              backgroundColor: '#3B4061',
              width: '100%',
              padding: normalize(15),
              marginTop: normalize(20),
              borderRadius: normalize(10),
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{
                    uri:
                      item?.passdetail?.user?.bar_owner_image == ''
                        ? item?.passdetail?.user?.profile_photo_url
                        : item?.passdetail?.user?.bar_owner_image,
                  }}
                  style={{
                    width: normalize(45),
                    height: normalize(45),
                    borderRadius: normalize(23),
                    resizeMode: 'contain',
                  }}
                />
                <View style={{marginLeft: normalize(8)}}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontFamily: Fonts.Poppins_Medium,
                      color: '#908AA3',
                      textTransform: 'capitalize',
                    }}>
                    {item?.passdetail?.user?.full_name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(11),
                        fontFamily: Fonts.Poppins_Regular,
                      }}>
                      Date
                    </Text>

                    <Text
                      style={{
                        color: '#908AA3',
                        marginLeft: normalize(4),
                        fontSize: normalize(11),
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      {moment(item?.passdetail?.expired_at).format(
                        'D MMM yyyy',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => (setmodalvisible(true), setselecteddata(item))}
                //    onPress={()=>props.navigation.navigate('Passdetails')}
                style={{
                  width: normalize(25),
                  height: normalize(25),
                  backgroundColor: '#9D9D9D',
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
          </TouchableOpacity>
        )}
      </>
    );
  }
  function refundfunction() {
    console.log(selecteddata);
    if (query == '') {
      showErrorAlert('Please type a reason for refund');
    } else {
      setmodalvisible(false);
      setredeem(0);
      setquery('');
      let obj = {
        refund_reason: query,
        user_pass_id: selecteddata?.id,
      };
      connectionrequest()
        .then(() => {
          dispatch(refundRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }
  return (
    <SafeAreaView style={{backgroundColor: Colors.darkblue, flex: 1}}>
      <Loader
        visible={
          ProfileReducer.status == 'Profile/userpassesdetailsRequest' ||
          ProfileReducer.status == 'Profile/refundRequest'
        }
      />
      <View
        style={{
          height: normalize(60),
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: normalize(10),
          backgroundColor: Colors.themeblue,
          marginTop: Platform.OS == 'ios' ? 0 : normalize(15),
          // width: '50%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '76%',
            justifyContent: 'space-between',
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
          <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(24),
            }}>
            Your<Text style={{color: Colors.pink}}> Passes</Text>
          </Text>
        </View>
      </View>
      <ScrollView
        onEndReachedThreshold={0.9}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fresh()} />
        }>
        <FlatList
          data={ProfileReducer?.userpassesdetailsResponse?.data?.upcoming}
          renderItem={renderdata}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{width: '90%', alignSelf: 'center', marginTop: normalize(10)}}
          ListEmptyComponent={
            firstdataset.length < 1 && (
              <View
                style={{
                  backgroundColor: Colors.cardview,
                  width: '100%',
                  padding: normalize(15),
                  marginTop: normalize(20),
                  borderRadius: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{marginLeft: normalize(8)}}>
                      <Text
                        style={{
                          fontSize: normalize(14),
                          fontFamily: Fonts.Poppins_Medium,
                          color: Colors.lightpink,
                        }}>
                        No Upcoming Passes
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          }
          contentContainerStyle={{paddingBottom: normalize(30)}}
          ListHeaderComponent={
            <Text
              style={{
                color: '#858CB7',
                fontSize: normalize(15),
                fontFamily: Fonts.Poppins_Regular,
              }}>
              Upcoming Passes
            </Text>
          }
        />

        <FlatList
          data={ProfileReducer?.userpassesdetailsResponse?.data?.past}
          renderItem={renderseconddata}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{width: '90%', alignSelf: 'center', marginTop: normalize(10)}}
          contentContainerStyle={{paddingBottom: normalize(30)}}
          ListEmptyComponent={
            seconddataset.length < 1 && (
              <View
                style={{
                  backgroundColor: '#3B4061',
                  width: '100%',
                  padding: normalize(15),
                  marginTop: normalize(20),
                  borderRadius: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{marginLeft: normalize(8)}}>
                      <Text
                        style={{
                          fontSize: normalize(14),
                          fontFamily: Fonts.Poppins_Medium,
                          color: '#908AA3',
                        }}>
                        No Past Passes
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          }
          ListHeaderComponent={
            <Text
              style={{
                color: '#858CB7',
                fontSize: normalize(15),
                fontFamily: Fonts.Poppins_Regular,
              }}>
              Past Passes
            </Text>
          }
        />
      </ScrollView>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={modalvisible}
        avoidKeyboard={true}
        style={{
          width: '100%',
          alignSelf: 'center',
          margin: 0,
        }}
        animationInTiming={800}
        animationOutTiming={1000}
        onBackButtonPress={() => {
          setmodalvisible(false), setredeem(0), setquery('');
        }}
        onBackdropPress={() => {
          setmodalvisible(false), setredeem(0), setquery('');
        }}>
        <View
          style={[
            {
              backgroundColor: '#060C30',
              borderRadius: normalize(7),
              paddingBottom: normalize(15),
              paddingVertical: normalize(15),
              paddingHorizontal: normalize(10),
              width: '90%',
              alignSelf: 'center',
            },
          ]}>
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(12),
                }}>
                {selecteddata?.passdetail?.user?.full_name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setmodalvisible(false), setredeem(0), setquery('');
                }}
                style={{
                  backgroundColor: Colors.lightpink,
                  width: normalize(18),
                  height: normalize(18),
                  borderRadius: normalize(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Icons.cross}
                  style={{width: normalize(14), height: normalize(14)}}
                />
              </TouchableOpacity>
            </View>
            {redeem == 0 ? (
              <>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: normalize(13),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#0E1648',
                    borderRadius: normalize(8),
                    marginTop: normalize(20),
                    flexDirection: 'row',
                    paddingHorizontal: normalize(15),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: normalize(40),
                        height: normalize(40),
                        borderRadius: normalize(20),
                        backgroundColor: '#131D59',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={Icons.Ticket}
                        style={{
                          width: normalize(18),
                          height: normalize(18),
                          resizeMode: 'contain',
                          tintColor: Colors.pink,
                        }}
                      />
                    </View>
                    <View style={{marginLeft: normalize(10)}}>
                      <Text
                        style={{
                          color: Colors.lightpink,
                          fontFamily: Fonts.Poppins_SemiBold,
                          fontSize: normalize(14),
                          textTransform: 'capitalize',
                        }}>
                        {selecteddata?.passdetail?.message}
                      </Text>
                      <Text
                        style={{
                          color: Colors.pink,
                          fontFamily: Fonts.Poppins_SemiBold,
                          fontSize: normalize(12),
                        }}>
                        Redeemed
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: Colors.lightpink,
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    QTY<Text style={{color: Colors.white}}> 1</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setredeem(2)}
                  style={{
                    width: '100%',
                    paddingVertical: normalize(13),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.pink,
                    borderRadius: normalize(8),
                    marginTop: normalize(20),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(16),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    Request a Refund
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: Colors.lightpink,
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: normalize(14),
                    marginTop: normalize(15),
                  }}>
                  Refund Request
                </Text>
                <TextInput
                  style={{
                    width: '100%',
                    backgroundColor: '#26327C',
                    height: normalize(60),
                    marginTop: normalize(15),
                    padding: normalize(15),
                    borderRadius: normalize(10),
                    fontSize: normalize(12),
                    color: Colors.white,
                    paddingTop: normalize(10),
                  }}
                  placeholder="Input reason here"
                  value={query}
                  onChangeText={val => setquery(val)}
                  textAlignVertical="top"
                  multiline={true}
                  placeholderTextColor={Colors.placeholder}
                />
                <View style={{width: '100%'}}>
                  {/* <TouchableOpacity
     onPress={()=>{setmodalvisible(false)
            setredeem(0)
            setquery('')}}
     style={{width:'48%',paddingVertical:normalize(13),alignItems:'center',justifyContent:'center',
    backgroundColor:Colors.pink,borderRadius:normalize(8),marginTop:normalize(20)}}>
        <Text style={{color:Colors.white,fontSize:normalize(16),fontFamily:Fonts.Poppins_Medium}}>Decline</Text>

      </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => {
                      refundfunction();
                    }}
                    style={{
                      width: '70%',
                      paddingVertical: normalize(13),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.pink,
                      borderRadius: normalize(8),
                      marginTop: normalize(20),
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

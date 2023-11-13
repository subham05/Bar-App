import React,{useEffect, useState} from 'react';
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
   TextInput
 } from 'react-native';
import { Colors, Fonts, Icons } from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen'
import Modal from 'react-native-modal';
import Loader from '../../utils/helpers/Loader';
import showErrorAlert from '../../utils/helpers/Toast'
import connectionrequest from '../../utils/helpers/NetInfo'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from '../../components/DateTimePicker'
import {
   historyRequest,historySuccess,historyFailure} from '../../redux/reducer/ProfileReducer'
import moment from 'moment';
let status = ''
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

export default function Paymenthistory(props){
    const [modalvisible, setmodalvisible] = useState(false)
    const [redeem, setredeem] = useState(0)
    const dispatch = useDispatch()
    const isFocused=useIsFocused()
    const ProfileReducer = useSelector(state => state.ProfileReducer);
    const [firstdataset, setfirstdataset] = useState(false)
    const [seconddataset, setseconddataset] = useState(false)
    const [selecteddata, setselecteddata] = useState('')
    const [query,setquery]=useState('')
    useEffect(() => {
    connectionrequest()
              .then(() => {
    dispatch(historyRequest());
    })
    .catch(err => {
      showErrorAlert('Please connect To Internet');
    })    
    }, [isFocused])

       if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      

        case 'Profile/historyRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/historySuccess':
            status = ProfileReducer.status;
            console.log(ProfileReducer?.historyResponse?.data)
        break;
      case 'Profile/historyFailure':
        status = ProfileReducer.status;
        break;

      
    }
       }


    function renderdata({ item, index }) {
    console.log(item);
    return(
        <>
          
                 <View style={{backgroundColor:Colors.cardview,width:'100%',padding:normalize(15),marginTop:normalize(20),borderRadius:normalize(10)}}>
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',
       }}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                {/* <Image source={item.image} style={{width:normalize(45),height:normalize(45),resizeMode:'stretch'}}/> */}
                <View style={{marginLeft:normalize(8)}}>
                    <Text style={{fontSize:normalize(14),fontFamily:Fonts.Poppins_Medium,
                    color:Colors.lightpink,textTransform:'capitalize'}}>{item?.passdetail?.message}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:Colors.white,fontSize:normalize(11),fontFamily:Fonts.Poppins_Regular}}>Date</Text>
                  
                <Text style={{color: Colors.lightgreen,marginLeft:normalize(4),
                fontSize:normalize(11),fontFamily:Fonts.Poppins_Medium}}>{moment(item?.payment_details?.created_at).format('D MMM yyyy')}</Text>
                    </View>
                </View>
                </View>
                <View
                    style={{
                         borderRadius: normalize(4),
            alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:Colors.white,fontSize:normalize(10),fontFamily:Fonts.Poppins_Regular,
                    textAlign:'right'}}>Price</Text>
                    <Text style={{fontFamily:Fonts.Poppins_Medium,color:Colors.white,fontSize:normalize(16)}}>${item?.payment_details?.amount}</Text>
               </View>
            </View>
            
    

        </View>
        
        </>
    )

}


    return(
        <SafeAreaView style={{ backgroundColor: Colors.darkblue, flex: 1 }}>
            <Loader visible={ProfileReducer.status == 'Profile/userpassesdetailsRequest'} />
            <View
      style={{
        height: normalize(60),
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalize(15),
        backgroundColor: Colors.themeblue,
          marginTop:Platform.OS=='ios'?0: normalize(15),
      }}>
        <Text style={{color:Colors.white,fontFamily:Fonts.Poppins_Medium,fontSize:normalize(24)}}>
            Payment History
        </Text>
      </View>
      <ScrollView>
    
                
           <FlatList
            data={ProfileReducer?.historyResponse?.data}
            renderItem={renderdata}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={{width:'90%',alignSelf:'center',marginTop:normalize(10)}}
                    contentContainerStyle={{ paddingBottom: normalize(30) }}
          
            ListHeaderComponent={
                <Text style={{color:'#858CB7',fontSize:normalize(15),fontFamily:Fonts.Poppins_Regular}}>Past Passes</Text>
            }
                />
                
            </ScrollView>
            
        </SafeAreaView>
    )
}
 
 
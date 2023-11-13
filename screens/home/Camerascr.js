import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { Fonts } from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
// import CameraScreen
import {Camera} from 'react-native-camera-kit';
import {addFriendRequest} from '../../redux/reducer/ProfileReducer';

const Camerascr = ({navigation}) => {
  const dispatch = useDispatch();
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
    let obj = new FormData();
    obj.append('user_id', qrvalue);
    connectionrequest()
      .then(() => {
        dispatch(addFriendRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  };

  const onOpneScanner = () => {
    // To Start Scanning

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#030721'}}>
      {opneScanner ? (
        <View style={{flex: 1}}>
          <Camera
          style={{ width:200, height:200, justifyContent: 'center', alignContent: 'center'}}
            showFrame={true}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={event => {
              onBarcodeScan(event.nativeEvent.codeStringValue);
              console.log('----', event.nativeEvent.codeStringValue);
            }}
          />
          {/* <RNCamera
          onBarCodeRead={() => onBarcodeScan()}
          /> */}
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.titleText}>Scan QR to Add friend</Text>
          {/* <Text style={styles.textStyle}>
            {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
          </Text> */}
          {qrvalue.includes('https://') ||
          qrvalue.includes('http://') ||
          qrvalue.includes('geo:') ? (
            <TouchableHighlight onPress={onOpenlink}>
              <Text style={styles.textLinkStyle}>
                {qrvalue.includes('geo:') ? 'Open in Map' : 'Open Link'}
              </Text>
            </TouchableHighlight>
          ) : null}
          <TouchableHighlight
            onPress={onOpneScanner}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.goBack()}
            style={styles.buttonStyle1}>
            <Text style={styles.buttonTextStyle}>Go Back</Text>
          </TouchableHighlight>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Camerascr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030721',
    padding: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  titleText: {
    fontSize: normalize(22),
    color: 'white',
    fontFamily: Fonts.Poppins_Medium,
    marginTop: normalize(30),
    marginBottom: normalize(30),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 50,
    fontFamily: Fonts.Poppins_Medium,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#D73F9D',
    fontFamily: Fonts.Poppins_Medium,
    padding: normalize(9),
    minWidth: 250,
    borderRadius: normalize(10),
  },
  buttonStyle1: {
    fontSize: 16,
    marginTop: normalize(16),
    color: '#D73F9D',
    backgroundColor: 'transparent',
    padding: normalize(9),
    minWidth: 250,
    borderColor:'#D73F9D',
    borderWidth:1,
    borderRadius: normalize(10),
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    fontFamily: Fonts.Poppins_Medium,
    fontSize:normalize(14),
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    fontSize:normalize(14),
    fontFamily: Fonts.Poppins_Medium,
    paddingVertical: 20,
  },
});

import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {Icons} from '../../themes/ImagePath';
import {useDispatch} from 'react-redux';
import {getTokenRequest} from '../../redux/reducer/AuthReducer';
// import constants from '../../utils/helpers/constants';
export default function Splash(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      //   props.navigation.navigate('Landing');
      dispatch(getTokenRequest());
    }, 2500);
  }, []);

  return (
    <Image
      source={Icons.Splash}
      style={{flex: 1, width: '100%', height: '100%'}}
      resizeMode="cover"
    />
  );
}

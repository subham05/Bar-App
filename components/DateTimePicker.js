import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Colors, Fonts, Icons} from '../themes/ImagePath';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/dimen';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Modal from 'react-native-modal';
export default function DateTimePicker(props) {
  function onDateChange(val) {
    if (props.onDateChange) {
      props.onDateChange(val);
    }
  }

  function onPressCancel() {
    if (props.onPressCancel) {
      props.onPressCancel();
    }
  }

  function onPressDone() {
    if (props.onPressDone) {
      props.onPressDone();
    }
  }

  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  }

  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      isVisible={props.dateTimePickerVisible}
      style={{width: '100%', alignSelf: 'center', margin: 0}}
      animationInTiming={800}
      animationOutTiming={1000}
      onBackdropPress={() => onBackdropPress()}>
      <View
        style={{
          flex: 1,
          // backgroundColor: '#ddd',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: Colors.placeholder,
          borderTopRightRadius: normalize(15),
          borderTopLeftRadius: normalize(15),
          paddingBottom: normalize(15),
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: normalize(30),
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: normalize(10),
          }}>
          <Text
            style={{
              fontSize: normalize(12),
              fontFamily: Fonts.Poppins_SemiBold,
              color: Colors.white,
            }}>
            {props.labelText}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onDateChange(props.value);
              onPressDone();
            }}>
            <Text
              style={{
                fontSize: normalize(16),
                color: Colors.white,
                marginTop: normalize(10),
                //fontFamily:Fonts.EncodeSansMedium
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        {props.isDatePicker ? (
          <DatePicker
            date={props.value}
            onDateChange={val => {
              onDateChange(val);
            }}
            androidVariant="iosClone"
            style={{
              width: Dimensions.get('screen').width,
              backgroundColor: Colors.placeholder,
            }}
            mode={props.mode}
            minimumDate={props.minDate}
            maximumDate={props.maxDate}
            textColor={'white'}
            // text
          />
        ) : (
          <DatePicker
            date={props.value}
            onDateChange={val => {
              onDateChange(val);
            }}
            minimumDate={props.minDate}
            maximumDate={props.maxDate}
            androidVariant="iosClone"
            style={{
              width: Dimensions.get('screen').width,
              // backgroundColor: Colors.white,
            }}
            mode={props.mode}
          />
        )}
      </View>
    </Modal>
  );
}

DateTimePicker.propTypes = {
  dateTimePickerVisible: PropTypes.bool,
  selectedDate: PropTypes.any,
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  onDateChange: PropTypes.func,
  format: PropTypes.string,
  onPressDone: PropTypes.func,
  onPressCancel: PropTypes.func,
  mode: PropTypes.string,
  value: PropTypes.any,
  onBackdropPress: PropTypes.func,
  isDatePicker: PropTypes.bool,
  labelText: PropTypes.string,
};

DateTimePicker.defaultProps = {
  dateTimePickerVisible: true,
  width: '85%',
  maxDate: new Date(),
  minDate: new Date(),
  onDateChange: null,
  format: 'YYYY-MM-DD',
  mode: 'date',
  value: '',
  onBackdropPress: null,
  isDatePicker: true,
  labelText: '',
  onPressDone: null,
  onPressCancel: null,
};

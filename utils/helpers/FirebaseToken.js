import React from 'react';

import {Platform} from 'react-native';

import messaging from '@react-native-firebase/messaging';


export const getDeviceToken = () => {

  return new Promise(async (resolve, reject) => {

    // await messaging().deleteToken();

    messaging()

      .getToken()

      .then(value => {

        console.log('Fire', value);

        if (value) {

          console.log('Fire', value);


          resolve(value);

        } else {

          reject('Token could not be generated');

        }

      })


      .catch(error => {

        reject('Token could not be generated');

      });

  });

};



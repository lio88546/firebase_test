import { vapidKey as cfg_vapidKey } from './config';
import { isSupported , onMessage, getToken } from "firebase/messaging";

// 主處理
export const main = async (messaging) => {
  isSupported().then(
    (isSupported) => {
      if (isSupported) {
        // 取得FCM Token
        getFCMToken(messaging).then((fcmToken) => {
          console.log('取得FCMToken: ' + fcmToken);
        }).catch((error) => {
          console.error(error);
        });

        // 監聽FCM訊息
        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);

          // 顯示通知
          showNotification(payload);
        });
      } else {
        return Promise.reject('瀏覽器不支援FCM');
      }
    }
  );
};

// 顯示通知
const showNotification = (data) => {
  if (Notification.permission === 'granted') {
    let notify = new Notification(data.notification.title, {
      body: data.notification.body,
      icon: './favicon.ico',
      vibrate: true
    });
  }
}

// 瀏覽器通知權限檢查
const checkPermission = () => {
  let granted = false;

  console.log('Checking notification permission...');

  if (Notification.permission !== 'granted') {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        granted = true;
      } else if (permission === 'denied') {
        console.log('User denied the permission.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    })
  } else {
    console.log('Permission already granted.');
    granted = true;
  }

  return granted;
}

// 取得FCM Token
export const getFCMToken = async (messaging) => {
  let token = '';

  // 有通知權限才取得client端推播token
  if (checkPermission()) {
    await getToken(messaging, {
        vapidKey: cfg_vapidKey,
    }).then((currentToken) => {
      token =  currentToken;
    })
  } else {
    return Promise.reject('請求通知權限失敗 or 無通知權限，離開');
  }

  return Promise.resolve(token);
};

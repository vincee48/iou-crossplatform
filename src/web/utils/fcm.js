import axios from 'axios';

function fcm() {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${process.env.FCM_SERVER_KEY}`,
    },
  });
}

export function sendPushNotification(deviceToken, title, message) {
  if (deviceToken) {
    fcm().post('https://fcm.googleapis.com/fcm/send', {
      to: deviceToken,
      notification: {
        title: title,
        body: message,
      },
    });
  }
}
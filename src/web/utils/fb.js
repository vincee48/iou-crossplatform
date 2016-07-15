import { FB, FacebookApiException } from 'fb';

export default function fb(req) {
  FB.options({
    appId: process.env.FB_APP_ID,
    appSecret: process.env.FB_APP_SECRET,
  });
  FB.setAccessToken(req.user.dataValues.accessToken);

  return FB;
}

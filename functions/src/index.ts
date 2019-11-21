import * as functions from 'firebase-functions';
import * as express     from 'express';
import * as querystring from 'querystring';
import * as crypto      from 'crypto';
import axios            from 'axios';

const cors = require('cors')({origin: true});


const app = express();
app.use(cors);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const OAUTH_REDIRECT_URI = 'http://localhost:4200/welcome';
const OAUTH_SCOPES = 'activity:read';

app.post('/token', async (req, res) => {
    const params = {
      client_id: functions.config().strava.client_id,
      redirect_uri: OAUTH_REDIRECT_URI,
      response_type: 'code',
      scope: OAUTH_SCOPES,
      state: crypto.randomBytes(20).toString('hex')
    };
    const authorizationUri = 'https://www.strava.com/oauth/authorize?' + querystring.stringify(params);
  
    res.redirect(authorizationUri);
  });

app.post('/callback', async (req, res) => {
    const params = {
      client_id: functions.config().strava.client_id,
      client_secret: functions.config().strava.client_secret,
      code: req.query.code,
    };
  
    const response = await axios.post('https://www.strava.com/oauth/token', querystring.stringify(params));
    // const athlete = response.data.athlete;
    // const accessToken = response.data.access_token;
    // const stravaUserID = athlete.id;
    // const photoURL = athlete.profile;
    // const email = athlete.email;
    // const displayName = athlete.firstname + ' ' + athlete.lastname;
  
    console.log(response);
  
    return res.status(200);
  });

exports.oauth = functions.https.onRequest(app);

require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:4200/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:4200';
const PORT = process.env.PORT || 4200;

const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const pool = require('./db');

const generateRandomString = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

app
  .use(express.static(path.resolve(__dirname, '../client/build')))
  .use(cors())
  .use(express.json())
  .use(cookieParser());

app.get('/login', function (req, res) {
  const state = generateRandomString(16);
  res.cookie('spotify_auth_state', state);

  const scope =
    'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

  res.redirect(
    // querystring.stringify - Serialize Object - https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    })}`
  );
});

app.get('/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    res.clearCookie('spotify_auth_state');

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${FRONTEND_URI}/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

app.get('/refresh_token', function (req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

// CREATE: Create User Details in Postgres Database
app.post('/users/:id/create', async (req, res) => {
  try {
    const { id } = req.params;
    const { display_name, email, country, external_urls } = req.body;

    const addUserToDatabase = await pool.query(
      'INSERT INTO users (user_id, firstname, email, country, spotifyurl) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
      [id, display_name, email, country, external_urls.spotify]
    );
  } catch (error) {
    console.error(error.message);
  }
});

// READ: Read User Details from Postgres Database
app.get(`/users/:id/read`, async (req, res) => {
  try {
    const { id } = req.params;

    const getUserFromDatabase = await pool.query(
      'SELECT * FROM users WHERE user_id=$1',
      [id]
    );

    res.json(getUserFromDatabase.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// UPDATE: Update User Age in Postgres Database
app.post(`/users/:id/update`, async (req, res) => {
  try {
    const { id } = req.params;
    const { age } = req.body;

    const updateUserAgeInDatabase = await pool.query(
      'UPDATE users SET age=$1 WHERE user_id=$2 RETURNING *',
      [age, id]
    );

    res.json(updateUserAgeInDatabase.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// DELETE: DELETE User Age From Postgres Database
app.post(`/users/:id/delete`, async (req, res) => {
  try {
    const { id } = req.params;
    const { display_name, email, country, external_urls, age } = req.body;

    const deleteCurrentUserFromDatabse = await pool.query(
      'DELETE FROM users WHERE user_id=$1',
      [id]
    );

    const addUserWithNoAgeToDatabase = await pool.query(
      'INSERT INTO users (user_id, firstname, email, country, spotifyurl, age) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING RETURNING *',
      [id, display_name, email, country, external_urls.spotify, age]
    );

    res.json(addUserWithNoAgeToDatabase.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get('/', function (req, res) {
  res.render(path.resolve(__dirname, '../client/build/index.html'));
});

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.warn(`Server listening on port ${PORT}`);
});

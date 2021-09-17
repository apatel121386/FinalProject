## Spotify

#### Signups & Settings

- GitHub
- Spotify [Create a few playlists in Spotify and add some songs]
- Spotify Developer Account
  - Create an App in Spotify Developer Account
  - Add this URL as Redirect URI in App Settings - `http://localhost:4200/callback`

#### Installations

- Visual Studio Code
- Node.js
- PostgeSQL
- Git

#### Create a Database "myapp" and a table "users"

```sql
\psql -U postgres

CREATE DATABASE myapp;

\c myapp

CREATE TABLE users(
  user_id VARCHAR(255) PRIMARY KEY,
  firstname VARCHAR(255),
  email VARCHAR(255),
  country VARCHAR(255),
  spotifyurl VARCHAR(255),
  age smallint
);

SELECT * FROM users;

\q
```

#### Clone Git Repository on Local

#### Change CLIENT_ID and CLIENT_SECRET for Spoify App in .env

#### Find and Replace with your own github profile link ending with repository url - https://github.com/nsdotorg/spotify

#### Run the following commands in terminal inside project root

```shell
cd client
yarn
cd server
yarn
cd ..
yarn start
```

#### References

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api/reference/#reference-index)
- [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- [Create React App](https://github.com/facebook/create-react-app)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Express](https://expressjs.com/)
- [Reach Router](https://reach.tech/router)
- [Styled Components](https://www.styled-components.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Additional Read on Bearer Token](https://swagger.io/docs/specification/authentication/bearer-authentication/)
- [Object Serialization - Node.js Reference](https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options)

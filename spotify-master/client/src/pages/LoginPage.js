import React from 'react';

const LOGIN_URI = 'http://localhost:4200/login';

const LoginPage = () => (
  <main className="w-full lg:w-9/12 max-w-full mx-auto min-h-screen py-10 flex justify-center items-center">
    <a
      className="inline-block rounded-full py-3 px-6 text-black"
      href={LOGIN_URI}
      style={{ backgroundColor: '#1ed760' }}
    >
      Login to Spotify
    </a>
  </main>
);

export default LoginPage;

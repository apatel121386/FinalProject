import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../spotify';

const UserDetailsPage = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [fetchedUser, setFetchedUser] = useState({});
  const [userAge, setUserAge] = useState();

  useEffect(() => {
    const readUserDetailsFromDatabase = async () => {
      try {
        const { user } = await getUserInfo();
        setUser(user);
        setUserId(user.id);

        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const result = await fetch(
          `http://localhost:4200/users/${user.id}/read`,
          options
        );
        const userDetails = await result.json();
        setFetchedUser(userDetails);
      } catch (error) {
        console.error(error.message);
      }
    };
    readUserDetailsFromDatabase();
  }, []);

  // UPDATE age in DB entry for the logged-in user
  const updateUserAgeInDatabase = async () => {
    const updatedUser = { age: userAge, ...user };

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      };

      const response = await fetch(
        `http://localhost:4200/users/${userId}/update`,
        options
      );

      const result = await response.json();
      const newUserDetails = { ...fetchedUser, age: result.age };
      console.log(newUserDetails);
      setFetchedUser(newUserDetails);
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeUserAgeFromDatabase = async () => {
    const updatedUser = { ...user, age: null };

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      };

      const response = await fetch(
        `http://localhost:4200/users/${userId}/delete`,
        options
      );

      const result = await response.json();
      const newUserDetails = { ...fetchedUser, age: result.age };
      console.log(newUserDetails);
      setFetchedUser(newUserDetails);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="w-full lg:w-9/12 max-w-full mx-auto min-h-screen p-10 mb-28">
      <h2 className="font-bold lg:text-5xl lg:mb-14 text-2xl mb-5">
        User Details
      </h2>
      <div className="flex lg:flex-row flex-col items-center lg:w-10/12 md:w-full">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full lg:w-9/12">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {fetchedUser.firstname}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Fetched from Postgres DB
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {fetchedUser.firstname}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Spotify ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {fetchedUser.user_id}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {fetchedUser.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {fetchedUser.age}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Country</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {fetchedUser.country}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex flex-col items-center mt-5 w-full lg:w-2/12 md:w-6/12 md:ml-0 lg:ml-5">
          <input
            className="text-black px-1 py-2 rounded w-full text-center flex-1 justify-self-stretch"
            type="text"
            name="age"
            placeholder="enter your age"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
          />
          <button
            className="bg-black hover:bg-white text-white hover:text-black rounded px-3 py-2 w-full mt-2 flex-1 transition"
            type="submit"
            onClick={updateUserAgeInDatabase}
          >
            Update Age
          </button>
          <button
            className="bg-black hover:bg-white text-white hover:text-black rounded px-3 py-2 w-full mt-2 flex-1 transition"
            type="submit"
            onClick={removeUserAgeFromDatabase}
          >
            Delete Age
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserDetailsPage;

import React from 'react';
import { Link } from '@reach/router';

import { FaSpotify, FaUser } from 'react-icons/fa';
import { RiPlayListFill } from 'react-icons/ri';
import { BiMessageSquareDetail } from 'react-icons/bi';

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: 'active' } : null;

const NavLink = (props) => (
  <Link getProps={isActive} {...props} className="h-full" />
);

const NavBar = () => (
  <nav className="flex lg:flex-col lg:w-1/12 w-full justify-center items-center fixed bg-black lg:min-h-screen lg:top-0 bottom-0 text-center z-50 h-24">
    <div
      style={{ color: '#1ed760' }}
      className="text-center hidden lg:block w-full lg:mt-12"
    >
      <Link to="/">
        <FaSpotify className="h-12 w-14 mx-auto" />
      </Link>
    </div>
    <ul className="flex lg:flex-col w-full lg:justify-center lg:items-end h-full">
      <li className="text-sm text-gray-300 lg:w-full lg:flex-none flex-1">
        <NavLink to="/">
          <div className="flex flex-col justify-center items-center">
            <FaUser className="w-5 h-5 mb-2" />
            <div>Profile</div>
          </div>
        </NavLink>
      </li>
      <li className="text-sm text-gray-300 lg:w-full lg:flex-none flex-1">
        <NavLink to="/playlists">
          <div className="flex flex-col justify-center items-center">
            <RiPlayListFill className="w-5 h-5 mb-2" />
            <div>Playlists</div>
          </div>
        </NavLink>
      </li>
      <li className="text-sm text-gray-300 lg:w-full lg:flex-none flex-1">
        <NavLink to="/details">
          <div className="flex flex-col justify-center items-center">
            <BiMessageSquareDetail className="w-5 h-5 mb-2" />
            <div>Details</div>
          </div>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;

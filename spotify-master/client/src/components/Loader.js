import React from 'react';
import styled, { keyframes } from 'styled-components';

const dance = keyframes`
  from {
    height: 10px;
  }
  to {
    height: 100%;
  }
`;

const Bar = styled.div`
  animation-name: ${dance};
  animation-duration: 400ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.delay || '0ms'};
`;

const Loader = () => (
  <div className="flex justify-center items-center absolute mx-auto left-0 right-0 text-center h-full w-full">
    <div className="flex justify-center items-end overflow-hidden w-24 min-w-min h-12 mx-auto z-10">
      <Bar className="bg-gray-300 w-2 h-1.5 m-px" delay="250ms" />
      <Bar className="bg-gray-300 w-2 h-1.5 m-px" delay="715ms" />
      <Bar className="bg-gray-300 w-2 h-1.5 m-px" delay="475ms" />
      <Bar className="bg-gray-300 w-2 h-1.5 m-px" delay="25ms" />
      <Bar className="bg-gray-300 w-2 h-1.5 m-px" delay="190ms" />
    </div>
  </div>
);

export default Loader;

import './index.css';
import React, { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [response, setResponse] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);
  };

  const handleSearchButtonClick = async () => {
    setResponse('');
  
    if (isToggleOn) {
      try {
        const response = await fetch('https://www.jokegenerator.click/api/cleanjoke', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'query': searchTerm
          },
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log(response)
          setResponse(data[0]['joke']);
        } else {
          console.log('API request failed');
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    } else {
      try {
        const response = await fetch('https://www.jokegenerator.click/api/joke', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'query': searchTerm
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data[0])
          setResponse(data[0]['joke']);
        } else {
          console.log('API request failed');
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    }
  };

  return (
    <>
      <img className='smallWP' style={{ width: '100%', height: '100%', objectFit: 'cover'}} src='https://media.tenor.com/5f3s1LEfRb4AAAAC/living-wallpaper-moving-wallpaper.gif' />
      <img className='mediumWP' style={{ width: '100%', height: '100%', objectFit: 'cover'}} src="https://thumbs.gfycat.com/EvenAgonizingCanvasback-size_restricted.gif" />
      <img className='largeWP' style={{ width: '100%', height: '100%', objectFit: 'cover'}} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2ad383c-7c26-4461-9fa6-262a71882b87/d50bwgl-cf02f614-d7c1-43cb-83bc-5ecebb4407e7.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyYWQzODNjLTdjMjYtNDQ2MS05ZmE2LTI2MmE3MTg4MmI4N1wvZDUwYndnbC1jZjAyZjYxNC1kN2MxLTQzY2ItODNiYy01ZWNlYmI0NDA3ZTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.u_5UeT_9_I7IMo83QjfnvUYR6h1-hLOMfLZHS5yuUuU" />
      <div className="center" style={{ textAlign: 'center' }}>
        <p className="text-4xl mb-10 frontTextColor">Joke Generator</p>
        <div className="flex items-center justify-center mb-10">
          <input
            type="text"
            className="border border-gray-300 rounded-l-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter in some categories"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r-lg px-4 py-2 ml-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSearchButtonClick}
          >
            Search
          </button>
        </div>
        <label className="flex justify-center cursor-pointer mt-4">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isToggleOn}
              onChange={handleToggleChange}
            />
            <div className={`block ${isToggleOn ? 'bg-green-500' : 'bg-gray-300'} w-14 h-8 rounded-full`} />
            <div className={`dot absolute left-1 top-1 ${isToggleOn ? 'bg-white' : 'bg-gray-400'} w-6 h-6 rounded-full transition-transform duration-300 ${isToggleOn ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
          <div className="ml-3 text-gray-700 font-medium frontTextColor">My boss is watching</div>
        </label>
        <p className='mt-10 frontTextColor'>{ response }</p>
      </div>
    </>
  );
}

export default App;

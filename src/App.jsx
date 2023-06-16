import './index.css';
import React, { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [response, setResponse] = useState('');
  const [expanded, setExpanded] = useState(true);

  const handleExpanded = () => {
    setExpanded(!expanded);
  }

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
        const response = await fetch('https://jokegenerator.click/api/cleanjoke', {
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
        const response = await fetch('https://jokegenerator.click/api/joke', {
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
    <div>
      <img className='smallWP' style={{ width: '100%', height: '100%', objectFit: 'cover'}} src='https://i.pinimg.com/originals/75/2a/bc/752abcae3eea76aa7484f5d97f882cf0.gif' />
      <img className='mediumWP' style={{ width: '100%', height: 'auto%', objectFit: 'cover'}} src="https://i.pinimg.com/originals/68/b5/80/68b5802287649ad7bb59cff215e28969.gif" />
      <img className='mlWP' style={{ width: '100%', height: '100%', objectFit: 'fill'}} src="https://images.hdqwalls.com/wallpapers/landscape-night-moon-stars-uw.jpg" />
      <img className='largeWP' style={{ width: '100%', height: '100%', objectFit: 'cover'}} src="https://openseauserdata.com/files/dca95043e622749d823a49cc60a0d4b8.gif" />
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
          <div className="ml-3 text-gray-700 font-medium frontTextColor">Clean joke filter</div>
        </label>
        { response != '' && 
          <div className="w-full rounded overflow-hidden shadow-lg mt-10 bg-gray-700">
            <div style={{ padding: '10px' }}>
                <p className="text-gray-700 text-base text-white">
                  { response }
                </p>
            </div>
          </div>
        }
        <div className="flex flex-col items-center">
          <div className= {`${expanded ? 'w-full' : 'max-w-sm'} rounded overflow-hidden shadow-lg mt-10 bg-gray-700`}>
            <div style={{ padding: expanded ? '15px 15px 0px 15px' : '0px' }}>
                <p className="text-gray-700 text-base text-white" style={{ display: expanded ? 'inline' : 'none' }}>
                  Note: I don't condone nor endorse any of the jokes
                  above. The jokes in the "clean jokes filter" are cleaned using linguistic techniques that calculate the Levenshtein distance between unwanted and target words and
                  a ML model trained on toxic wikipedia comments. The database of jokes were taken from <a target='_blank' style={{ color: 'lightblue' }} href='https://github.com/amoudgl/short-jokes-dataset'>here</a>.
                  Learn more about the project on my <a target='_blank' style={{ color: 'lightblue' }} href='https://robertssun.me/portfoliodev/#/projects'>website</a>.
                </p>
            </div>
            <div style={{ padding: '15px' }}>
            <button onClick={handleExpanded}>
              <p style={{ display: expanded ? 'none' : 'inline' }} className='pr-2 text-white'>Show Disclaimer</p>
              <p style={{ display: expanded ? 'inline' : 'none' }} className='pr-2 text-white'>Hide Disclaimer</p>
              {expanded ? '▲' : '▼'}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

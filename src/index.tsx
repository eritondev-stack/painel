import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWrapper from './routes';


ReactDOM.render(
  <React.StrictMode>

{/*       <div className='flex flex-row bg-white border border-b hidden'>
        <div className='w-full draggable'></div>
        <div onClick={() => {
          window.electron.minimize()
        }} className='ml-auto text-gray-600 flex flex-col justify-center items-center hover:bg-gray-300 cursor-pointer'>
          <span className="material-icons-outlined">
            minimize
          </span>
        </div>
        <div onClick={() => {
          window.electron.quit()
        }} className='ml-auto text-gray-600 flex flex-col justify-center items-center hover:bg-red-500 hover:text-white cursor-pointer'>
          <span className="material-icons-outlined">
            close
          </span>
        </div>
      </div> */}
      <AppWrapper />
 
  </React.StrictMode>,
  document.getElementById('root')
);


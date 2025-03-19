'use client'
import { useEffect, useState } from 'react';

export default function Page() {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  const [arrayDivs, setArrayDivs] = useState([
    { id: 1, position: -2 },
    { id: 2, position: -1 },
    { id: 3, position: 0 },
    { id: 4, position: 1 },
    { id: 5, position: 2 }
  ]);

  return (
    <div>
      <h1>Test Animacion</h1>
      <div className='text-center gap-4'>
        <div>
          <button
            className='p-2 bg-gray-300 cursor-pointer'
            onClick={() => {
              setArrayDivs(arrayDivs.map(div => ({
                ...div,
                position: div.position + 1
              })));
            }}
          >
            Left
          </button>
          <button
            className='p-2 bg-gray-200 cursor-pointer'
            onClick={() => {
              setArrayDivs(arrayDivs.map(div => ({
                ...div,
                position: div.position - 1
              })));
            }}
          >
            Right
          </button>
        </div>
        <div className='w-full flex justify-center'>


          {arrayDivs.map((div) => (
            <div
              key={div.id}
              className='border w-[100px] h-[100px]'
              style={{
                transform: `translateX(${div.position === 0 && div.id !== 3 ? -100 : div.position * 100}px) ${div.position === 0 ? 'scale(1.0)' : 'scale(0.7)'}`,
                transition: 'transform 1s'
              }}
            ></div>
          ))}

          
        </div>
      </div>
    </div>
  );
}
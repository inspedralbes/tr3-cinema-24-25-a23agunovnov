'use client'

import { useEffect } from 'react';
import socket from '../services/socket';


export default function Home() {
  // useEffect(() => {
  //   socket.emit("message", "Hello World");
    
  //   socket.on("message", (message) => {
  //     console.log(message);
  //   });

  //   return () => {
  //     socket.off("message");
  //   }
  // }, []);

  return (
    <>
      <h1>Index</h1>
    </>
  );
}

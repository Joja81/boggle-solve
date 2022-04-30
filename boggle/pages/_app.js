import '../styles/globals.css';
import {UserContext} from "../lib/context";
import { useState } from 'react';
import {generateLetters} from "../functions/generateLetters"

function MyApp({ Component, pageProps }) {

  const [letters, setLetters] = useState(generateLetters(4))
  
  const [solutions, setSolutions] = useState(null)


  return <UserContext.Provider value={{letters, setLetters, solutions, setSolutions}}>
    <Component {...pageProps} />
  </UserContext.Provider>


  
}

export default MyApp

import '../styles/globals.css';
import {UserContext} from "../lib/context";
import { useState } from 'react';
import {generateLetters} from "../functions/generateLetters"

function MyApp({ Component, pageProps }) {

  const [letters, setLetters] = useState(generateLetters(4))


  return <UserContext.Provider value={{letters, setLetters}}>
    <Component {...pageProps} />
  </UserContext.Provider>


  
}

export default MyApp

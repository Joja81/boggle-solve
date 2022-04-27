import '../styles/globals.css';
import {UserContext} from "../lib/context";

function MyApp({ Component, pageProps }) {

  const letters = null;


  return <UserContext.Provider value={{letters}}>
    <Component {...pageProps} />
  </UserContext.Provider>


  
}

export default MyApp

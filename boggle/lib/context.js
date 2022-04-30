import { createContext } from "react";

export const UserContext = createContext({

    letters: null,
    setLetters : () => null,
    solutions : null,
    setSolutions : () => null,

});

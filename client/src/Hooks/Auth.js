import { useState, useEffect, createContext, useContext, useMemo } from "react";
const AuthContext = createContext();
// require("dotenv").config();


// const urlEndpoint = 'http://localhost:5004/users'
const urlEndpoint = process.env.REACT_APP_USER_ENDPOINT


/* 
@Source: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/#basic-routing-with-routes
*/
export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userID, setUserID] = useState("")
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    useEffect(() => {

        //get session data if session is still active from the browser
        const userData = getLSUserData();
        
        // console.log(userData)

        if (userData && userData.token) {
            setUserToken(userData.token);
        }
        if (userData && userData.userFirstName) {
            setUserFirstName(userData.userFirstName);
        }
        if (userData && userData.userLastName) {
            setUserLastName(userData.userLastName);
        }            
        if (userData && userData.email) {
            setUserEmail(userData.email);
        }
        if (userData && userData.userID) {
            setUserToken(userData.userID);
        }

    }, [isAuthLoading]);

    // call this function when you want to register the user
    const register = async (firstName, lastName, email, password) => {
        // console.log('in register')
        setIsAuthLoading(true);
        const registerResult = await registerUser(firstName, lastName, email, password);
        console.log(registerResult)
        if(registerResult.success){
          const loginResult = await loginUser(email, password)
          if(loginResult.success){
            setLSUserData(loginResult.token, loginResult.userFirstName, loginResult.userLastName, loginResult.email)
          }
        }
        setIsAuthLoading(false);
        return registerResult;
    };

    const registerUser = async (firstName, lastName, email, password) => {

        const url = `${urlEndpoint}/register`;
        const response = await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                }),
            });
        const responseJSON = await response.json();
        return responseJSON;
    };

    // call this function when you want to authenticate the user
    const login = async (email, password) => {
        setIsAuthLoading(true);
        const loginResult = await loginUser(email, password);
            // console.log("auth hook loginResult: ", loginResult)
        if (loginResult.success) {
        //update browser session details 
            // console.log(loginResult)
            setLSUserData(loginResult.token, loginResult.firstName, loginResult.lastName, loginResult.email);
        }

        setIsAuthLoading(false);
        return loginResult
    };

    const loginUser = async (email, password) => {
        const url = `${urlEndpoint}/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email,
            password,
            }),
        });
        const responseJSON = await response.json();
        console.log("login user response" + responseJSON)
        return responseJSON;
    };

    // call this function to sign out logged in user
    const logout = async () => {
        setIsAuthLoading(true);
        await removeLSUserData(); // This has to be awaited for the useEffect to work
        setUserToken(null);
        setUserEmail("");
        setIsAuthLoading(false);
    };

    /*  
        https://reactjs.org/docs/hooks-reference.html#usememo
        Memoization is essentially caching. The variable value will only be recalculated if the 
        variables in the watched array change.
    */

    const value = useMemo(
            () => ({
                userToken,
                userEmail,
                userFirstName,
                userLastName,
                login,
                logout,
                register,
            }),
            [userToken]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const setLSUserData = (token, userFirstName, userLastName, email) => {

  // caching our token session/ email 
  // in the browser window
  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify({token, userFirstName, userLastName, email})
  );
};

const removeLSUserData = () => {
  //remove session from browser 
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getLSUserData = () => {
  //get session from browser
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};

import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setAccount: () => {},
    setToken: () => {},
    setNotification: () => {},
    setPersons: () => {},
    setProducts: () => {},
    setAdvancedInfo: () => {},
    setUsers: () => {},
    setPayLog: () => {},
    setPurchasedLog: () => {},
    setConnectionVipLog: () => {},
    setIsLoading: () => {},
});

const TOKEN_EXPIRATION_TIME = 7200000; // 2 час в миллисекундах

export const ContextProvider = ({ children }) => {
    const [persons, setPersons] = useState({});
    const [user, setUser] = useState({});
    const [users, setUsers] = useState({});
    const [products, setProducts] = useState({});
    const [advancedInfo, setAdvancedInfo] = useState({});
    const [purchasedLog, setPurchasedLog] = useState({});
    const [payLog, setPayLog] = useState({});
    const [connectionVipLog, setConnectionVipLog] = useState({});
    const [account, setAccount] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const tokenTimestamp = localStorage.getItem("TOKEN_TIMESTAMP");

        if (tokenTimestamp) {
            const currentTime = new Date().getTime();
            const timePassed = currentTime - parseInt(tokenTimestamp, 10);

            if (timePassed > TOKEN_EXPIRATION_TIME) {
                setToken(null);
            } else {
                const remainingTime = TOKEN_EXPIRATION_TIME - timePassed;
                setTimeout(() => setToken(null), remainingTime);
            }
        }
    }, []);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            const timestamp = new Date().getTime();
            localStorage.setItem("ACCESS_TOKEN", token);
            localStorage.setItem("TOKEN_TIMESTAMP", timestamp.toString());
            setTimeout(() => {
                setToken(null);
            }, TOKEN_EXPIRATION_TIME);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("TOKEN_TIMESTAMP");
        }
    };

    const setNotification = (message) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                account,
                setAccount,
                token,
                setToken,
                notification,
                setNotification,
                persons,
                setPersons,
                isLoading,
                setIsLoading,
                products,
                setProducts,
                advancedInfo,
                setAdvancedInfo,
                purchasedLog,
                setPurchasedLog,
                users,
                setUsers,
                payLog,
                setPayLog,
                connectionVipLog,
                setConnectionVipLog,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

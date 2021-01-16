import React, { createContext, useEffect, useContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
} from "react-router-dom";
import axios from 'axios';

function getCookie(name: string) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return ''
}

const authContext = createContext<{ user: string, signin: Function, loginUser: Function }>({
    user: getCookie('playeruid'),
    signin: () => { },
    loginUser: () => { }
});

const useAuth = () => {
    return useContext(authContext)
}

const ProvideAuth = ({ children }: { children: React.ReactNode }) => {
    const auth = useProvideAuth()

    axios.interceptors.response.use(function (response) {

        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            auth.signout()
        }
        return Promise.reject(error);
    });

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

const useProvideAuth = () => {
    const [user, setUser] = useState(getCookie('playeruid'));

    const signin = (username: string, password: string, captcha: string, success: Function, fail: Function) => {
        let data = new FormData()
        data.append('name', username)
        data.append('password', password)
        data.append('captcha', captcha)
        axios({
            method: 'post',
            url: '/tasks/login',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res.data)
            if (res.data === 'Success') {
                setUser(username);
                success()
            }
        }).catch(rej => {
            if (rej.response.status === 401) {
                setUser('');
                fail(rej.response.data)
            }
        })
    };

    const signout = () => {
        setUser('')
    }
    const loginUser = (u: string) => {
        setUser(u)
    }

    return {
        user,
        signin,
        signout,
        loginUser
    };
}

interface Props {
    children: React.ReactNode;
    path?: string;
    elementType?: keyof JSX.IntrinsicElements;
}

function PrivateRoute({ children, ...rest }: Props) {
    let auth = useAuth();
    // useEffect(() => {
    //     axios.get('/tasks/isLogin').then(res => {
    //         auth.loginUser(res.data.result)
    //     })
    // })

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user && !/('')|("")/.test(auth.user) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: `/player/loginuser`,
                                search: `?r=${location.pathname}`,
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export { useAuth, ProvideAuth, PrivateRoute } 
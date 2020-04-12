import {
    Route,
    Redirect
} from "react-router-dom";
import React from "react";

interface PrivateRouteProps {
    isLogin: boolean,
    path: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isLogin, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute
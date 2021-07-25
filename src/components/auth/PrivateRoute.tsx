import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

interface Props extends RouteProps {
    children: any;
}

function PrivateRoute({ children, ...rest }: Props) {
    let { authenticated } =  useAppSelector(state => state.auth);

    return (
        <Route
        {...rest}
        render={({ location }) =>
            authenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute;

/*
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

interface Props extends RouteProps {
    component: any;
}

function PrivateRoute({ component: Component, ...rest }: Props) {
    let { authenticated } =  useAppSelector(state => state.auth);

    return (
      <Route
        {...rest}
        render={props => authenticated 
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: "/signin",
                    state: { from: location }
                }}
            />
        }
      />
    );
}

export default PrivateRoute;

*/ 
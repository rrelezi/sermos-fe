import React from "react";
import {Router} from "@reach/router";
import {commonRoutes} from "./routes";

const App = () => {
    return(
        <Router>
            {
                commonRoutes.map((route,key) => {
                    const Route = route.component;
                    return <Route key={key} path={route.path}/>
                })
            }
        </Router>
    )
}

export default App;
import React from "react";
import Nav from "@/components/Nav";

const Layout = ({children}) => {

    return (<React.Fragment>
        <Nav/>
            <div>{children}</div>
        </React.Fragment>
        );
        };

        export default Layout;
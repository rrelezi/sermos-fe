import React from "react";

interface IAppLayout {
    children: any
}

const AppLayout = ({ children }: IAppLayout) => (
    <div className={'background'}>
        <div className={'app-layout'}>
            {children}
        </div>
    </div>
);

export default AppLayout;
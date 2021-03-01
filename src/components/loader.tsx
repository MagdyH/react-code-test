import React, { ReactElement } from 'react';

export const Loader: React.FunctionComponent = (): ReactElement => {

    return (
        <>
            <div className={'wide-circle'}>
                <div className={'circle'}>

                </div>
            </div>
            <div className={'cenetr-circle'}>

            </div>
        </>
    )
}

export default Loader; 
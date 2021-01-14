import React, { useEffect, useState } from 'react'
import { BackedObjects } from '../../types'
import '../../styles/landingPage/singleItem.scss'

interface propsType {
    data: BackedObjects
}

const SingleItem = (props: propsType) => {
    // make the render component
    const [ renderElement, setRenderElement ] = useState<JSX.Element>()

    /// map the data 
    useEffect( () => {
        if (props.data) {
            setRenderElement(
                <div className='singleItemBox'>
                    <h2>{props.data.name}</h2>
                    <hr />
                    <div className='innerDisplay'>
                        <h3>Website: {props.data.website}</h3>
                        <h3>Exchange Id: {props.data.exchange_id}</h3>
                        <h3>Starting Trade: {new Date(props.data.data_trade_start).toDateString()}</h3>
                        <h3>Ending Trade: {new Date(props.data.data_trade_end).toDateString()}</h3>
                        <h3>Volume 1 Day: {props.data.volume_1day_usd}</h3>
                        <h3>Volume 1 Month: {props.data.volume_1mth_usd}</h3>
                        <h3>Volume 1 Hour: {props.data.volume_1hrs_usd}</h3>
                    </div>
                </div>
            )
        }
    }, [props])

    return(
        <>
            {renderElement}
        </>
    )
}

export default SingleItem
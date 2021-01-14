import React, { useEffect, useState } from 'react'
import { BackedObjects } from '../../types'
import '../../styles/landingPage/exchangeDisplay.scss'

interface propTypes {
    data: Array<BackedObjects>
    selectItem: Function
}

const ExchangeDisplay = (props: propTypes) => {
    // local state
        // render array
        const [ renderObjects, setRenderObjects ] = useState<Array<JSX.Element>>([])

    // map props to scroll
    useEffect( () => {
        if (props.data.length > 0) {
            let localObjectsArray: Array<JSX.Element> = []
            props.data.forEach( (element, elemntId) => {
                localObjectsArray.push(
                    <div className='scrollArrayItem' onClick={(e: React.SyntheticEvent) => props.selectItem(e, element)}>
                        <h3>{element.name}</h3>
                    </div>
                )
            })
            setRenderObjects(localObjectsArray)
        }
    }, [props])

    return (
        <div className='exchangeDisplayContainer'>
            <h2>Exchanges</h2>
            <div className='scrollContainer'>
                {renderObjects}
            </div>
        </div>
    )
}

export default ExchangeDisplay
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
            let localCount = 0
            props.data.forEach( (element, elemntId) => {
                if (localCount < 200) {
                    if (element.price_usd ) {
                        localObjectsArray.push(
                            <div className='scrollArrayItem' onClick={(e: React.SyntheticEvent) => props.selectItem(e, element)}>
                                <h3>{element.name}</h3>
                            </div>
                        )
                        localCount++
                    }
                }
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
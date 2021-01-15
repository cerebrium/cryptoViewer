import React, { useEffect, useState } from 'react'
import { BackedObjects } from '../../types'
import '../../styles/landingPage/scrollTop.scss'

interface propTypes {
    data: Array<BackedObjects>
}

var myInterval: NodeJS.Timeout;
var myIntervalReset: NodeJS.Timeout;
var outsideAdjustment = 0

const ScrollTop = (props: propTypes) => {
    // local state
    // render array
    const [ renderObjects, setRenderObjects ] = useState<Array<JSX.Element>>([])

    // scroll position
    const [ leftAdjust, setLeftAdjust ] = useState(0)

    // handling the scroll
    useEffect( () => {
        // reset the interval outside of the component
        clearInterval(myInterval)

        // make the scroll happen every 20 miliseconds
        const timeFunction = () => {
            let setPosition = () => {
                outsideAdjustment = outsideAdjustment-1
                setLeftAdjust(outsideAdjustment)
            }
            myInterval = setInterval( setPosition, 20)
        }

        // call the funtion
        timeFunction()
    }, [])

    // reset the scroll to initial position every 2 minutes
    useEffect( () => {
        clearInterval(myIntervalReset)
        const timeFunction = () => {
            let setPosition = () => {
                outsideAdjustment = 0
                setLeftAdjust(outsideAdjustment)
            }
            myIntervalReset = setInterval( setPosition, 200000)
        }
        timeFunction()
    }, [])

    // map props to scroll
    useEffect( () => {
        if (props.data.length > 0) {
            let localObjectsArray: Array<JSX.Element> = []
            let localCount = 0
            props.data.forEach( (element, elemntId) => {
                if (localCount < 200) {
                    if (element.price_usd ) {
                        localObjectsArray.push(
                            <div className='scrollArrayItem'>
                                <h3>{element.name}: {element.price_usd.toFixed(2)}</h3>
                            </div>
                        )
                        localCount++
                    }
                }
            })
            setRenderObjects(localObjectsArray)
        }
    }, [props])

    return(
        <div className='scrollTopContainer'>
            <div 
                className='innerScrollContainer'
                style={{
                    left: leftAdjust
                }}
            >
                {renderObjects}
            </div>
        </div>
    )
}

export default ScrollTop
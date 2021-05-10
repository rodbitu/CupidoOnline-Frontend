import React from 'react'
import './main.scss'

export default props => {

    return (
        <>

            <div class="label-float">

                <input type={props.type}placeholder=" " />
                <label>{props.label}</label>
                
            </div>


        </>

    )
}
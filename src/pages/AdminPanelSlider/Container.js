import React from 'react'
import DisplayData from "../../Sections/AdminPanelSliderSections/DisplayData"
import useApi from "../../Utils/useApi"
const Container = () => {
    const {data} = useApi("http://3.138.190.235/v1/sliders")
    return (
        <div>
            <DisplayData array={data}/>

        </div>
    )
}

export default Container

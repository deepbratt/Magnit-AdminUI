import React from 'react'
import DisplayData from "../../Sections/AdminPanelSliderSections/DisplayData"
import { HomeSlider } from "../../Utils/Text";
import useApi from "../../Utils/useApi"
const Container = () => {
    const {data} = useApi()
    return (
        <div>
            <DisplayData array={data}/>

        </div>
    )
}

export default Container

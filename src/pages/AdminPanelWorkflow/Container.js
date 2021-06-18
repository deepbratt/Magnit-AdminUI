import React from 'react'
import WorkFlowContext from "../../Sections/AdminPanelWorkflow/WorkFlowContext"
import useApi from "../../Utils/useApi"
const Container = () => {
    const {data} = useApi("http://3.138.190.235/v1/workflows")
    return (
        <div>
            <WorkFlowContext array={data}/>

        </div>
    )
}

export default Container

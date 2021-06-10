import { Grid } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import ContentTable from '../../components/Table'

const Facts = () =>{
    const data = [
        {
          id: "328uuec",
          title: "item1",
          query: "1223123",
        },
        {
          id: "384uudc",
          title: "item2",
        },
        {
          id: "38u23ec",
          title: "item3",
        },
      ];
    return(
        <Grid container>
            <Grid item xs={12}>
                form
            </Grid>
            <Grid item xs={12}>
                <ContentTable dataArray={data}/>
            </Grid>
        </Grid>
    )
}


export default withRouter(Facts)
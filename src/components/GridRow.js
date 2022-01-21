import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function GridRow({letters}) {
  return (
    <div style={{height: '92px', width: '515px'}}>
      <Grid container spacing={1} style={{display: 'flex', justifyContent: 'center'}}>
        <Grid item xs={6} sm={2}>
          <Paper style={{height: '80px', width: '80px', borderRadius: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '40px'}}>
            {letters[0]}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper style={{height: '80px', width: '80px', borderRadius: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '40px'}}>
            {letters[1]}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper style={{height: '80px', width: '80px', borderRadius: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '40px'}}>
            {letters[2]}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper style={{height: '80px', width: '80px', borderRadius: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '40px'}}>
            {letters[3]}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper style={{height: '80px', width: '80px', borderRadius: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '40px'}}>
            {letters[4]}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper style={{height: '80px', width: '80px', borderRadius: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '40px'}}>
            {letters[5]}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default GridRow;
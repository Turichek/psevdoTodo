import { Grid } from '@mui/material';
import './App.css';
import Main from './components/Main';
import ToPDF from "./components/ToPDF";
import ToClipboard from "./components/ToClipboard";
import FromJson from "./components/FromJson";
import ParsePsevdoCode from './components/ParsePsevdoCode';

function App() {
  return (
    <div className="App">
      <Grid sx={{ mt: '2%' }} container columns={{ xl: 9 }} justifyContent={'space-around'}>
        <Grid item xl={2}>
          <ParsePsevdoCode />
        </Grid>
        <Grid item xl={2}>
          <ToPDF />
        </Grid>
        <Grid item xl={2}>
          <ToClipboard />
        </Grid>
        <Grid item xl={2}>
          <FromJson />
        </Grid>

      </Grid>
      <Main />
    </div>
  );
}

export default App;

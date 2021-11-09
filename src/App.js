import { Grid } from '@mui/material';
import './App.css';
import Main from './components/Main/Main';
import ToPDF from "./components/PDF/ToPDF";
import ToClipboard from "./components/Main/ToClipboard";
import FromJson from "./components/Main/FromJson";
import ParsePsevdoCode from './components/ParsePsevdoCode/ParsePsevdoCode';

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

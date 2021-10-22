import './App.css';
import Main from './components/Main';
import MyContainer from './components/MyContainer';

function App() {
  return (
    <div className="App">
      <MyContainer>
        <Main/>
      </MyContainer>
    </div>
  );
}

export default App;

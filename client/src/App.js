import Axios from 'axios'

function App() {

  const signup = async () => {
    await Axios.post('http://localhost:5000/signup').then(() => console.log('user saved to db')).catch((err) => console.log(err))
  }
  return (
    <div className="App">
      <button onClick={signup}>click me</button>
    </div>
  );
}

export default App;

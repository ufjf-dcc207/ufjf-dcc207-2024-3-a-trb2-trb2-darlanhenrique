import './App.css'
import PRODUCTIONS from './Audiovisual_productions.json'
import Production from './Production'
import logo from './assets/logo/Net_Prime_Plus_Max_Flix.png';

function App() {

  return (
    <div>
      <img className="logo" src={logo} alt="Net Prime Plus Max Flix" />
      {PRODUCTIONS.audiovisual_productions.map((production) => (
        <Production 
          key={production.name}
          name={production.name}
          year={production.year}
          type={production.type} 
          genre={production.genre} 
          length={production.length} 
          description={production.description} 
          image={production.image}
          isNew={production.isNew}
        />
      ))
    }
    </div>
  )
}

export default App

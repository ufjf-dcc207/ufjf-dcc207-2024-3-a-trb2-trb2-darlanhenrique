import './App.css'
import PRODUCTIONS from './Audiovisual_productions.json'
import Production from './Production'

function App() {

  return (
    <div>
      <h1>Produções Audiovisuais</h1>
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

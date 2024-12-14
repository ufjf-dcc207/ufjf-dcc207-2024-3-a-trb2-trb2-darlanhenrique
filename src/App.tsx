import './App.css'
import PRODUCTIONS from './Audiovisual_productions.json'
import Production from './Production'

function App() {

  return (
    <div>
      <h1>Produções Audiovisuais</h1>
      <Production 
        name={PRODUCTIONS.audiovisual_productions[0].name} 
        type={PRODUCTIONS.audiovisual_productions[0].type} 
        genre={PRODUCTIONS.audiovisual_productions[0].genre} 
        length={PRODUCTIONS.audiovisual_productions[0].length} 
        description={PRODUCTIONS.audiovisual_productions[0].description} 
        image={PRODUCTIONS.audiovisual_productions[0].image}
        isNew={PRODUCTIONS.audiovisual_productions[0].isNew} 
      />
      <Production 
        name={PRODUCTIONS.audiovisual_productions[1].name} 
        type={PRODUCTIONS.audiovisual_productions[1].type} 
        genre={PRODUCTIONS.audiovisual_productions[1].genre} 
        length={PRODUCTIONS.audiovisual_productions[1].length} 
        description={PRODUCTIONS.audiovisual_productions[1].description} 
        image={PRODUCTIONS.audiovisual_productions[1].image}
        isNew={PRODUCTIONS.audiovisual_productions[1].isNew}
      />
    </div>
  )
}

export default App

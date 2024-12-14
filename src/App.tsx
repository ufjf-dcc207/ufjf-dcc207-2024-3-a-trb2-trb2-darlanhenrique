import './App.css'
import PRODUCTIONS from './Audiovisual_productions.json'
import Production from './Production'
import logo from './assets/logo/Net_Prime_Plus_Max_Flix.png';

type CategoryTuplaType = [string, ProductionTuplaType[]];
type ProductionTuplaType = [string, number, string, string, number, string, string, boolean];

const allGenres = [
  new Set(
    PRODUCTIONS.audiovisual_productions
      .flatMap((production) => production.genre.split("/").map((genre) => genre.trim()))
  ),
];

function App() {
  return (
    <div>
      <header className='header'>      
        <img className="logo" src={logo} alt="Net Prime Plus Max Flix" />
        <div className='title'>Net Prime Plus Max Flix</div>
        <div className='subtitle'>Aqui você encontra as melhores produções audiovisuais de maneira 100% "honesta"</div>
      </header>
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

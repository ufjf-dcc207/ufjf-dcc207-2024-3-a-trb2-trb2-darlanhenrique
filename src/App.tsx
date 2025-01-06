import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import PRODUCTIONS from './Audiovisual_productions.json'
import Category from './Category';
import Production from './Production'
import logo from './assets/logo/Net_Prime_Plus_Max_Flix.png';

const allGenres: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .flatMap((production) => production.genre.split("/").map((genre) => genre.trim()))
  )
);

const allTypes: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .map((production) => production.type.trim()) 
  )
);


function App() {
  return (
    <div>
      <header className='header'>      
        <img className="logo" src={logo} alt="Net Prime Plus Max Flix" />
        <div className='title'>Net Prime Plus Max Flix</div>
        <div className='subtitle'>Aqui você encontra as melhores produções audiovisuais de maneira 100% "honesta"</div>
      </header>

      {/* PARA AGRUPAR POR NOVAS PRODUÇÕES */}
      <Category key="new-productions" name="Novas Produções">
        {PRODUCTIONS.audiovisual_productions
          .filter((production) => production.isNew)
          .map((production) => (
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
          ))}
      </Category>
      {/* PARA AGRUPAR POR GENEROS */}
      {allGenres.map((genre) => (
        <Category key={genre} type='category'  name={genre}>
          {PRODUCTIONS.audiovisual_productions.filter((production) => 
              production.genre.split("/").map((g) => 
              g.trim()).includes(genre)).map((production) => (
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
          ))}
        </Category>  
      ))}
      {/* PARA AGRUPAR POR TIPOS */}
      {allTypes.map((type) => (
        <Category key={type} name={type}>
          {PRODUCTIONS.audiovisual_productions.filter((production) => 
              production.type.trim() == type)
              .map((production) => (
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
          ))}
        </Category>  
      ))}


    </div>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import PRODUCTIONS from './Audiovisual_productions.json'
import Category from './Category';
import Production from './Production'
import Navbar from './Navbar';

const allGenres: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .flatMap((production) => production.genre.map((genre) => genre.trim()))
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
      <header className='mb-5'>
        <Navbar />
      </header>
      
      <div id="top-space"></div>

      {/* PARA AGRUPAR POR NOVAS PRODUÇÕES */}
      <Category key="new-productions" name="Novas Produçõe">
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
              classification={production.indicativeClassification}
              isOriginal={production.isOriginal}
            />
          ))}
      </Category>
      {/* PARA AGRUPAR POR GENEROS */}
      {allGenres.map((genre) => (
        <Category key={genre} type='category' name={genre}>
          {PRODUCTIONS.audiovisual_productions.filter((production) =>
            production.genre.map((g) =>
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
                  classification={production.indicativeClassification}
                  isOriginal={production.isOriginal}
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
                classification={production.indicativeClassification}
                isOriginal={production.isOriginal}
              />
            ))}
        </Category>
      ))}


    </div>
  )
}

export default App

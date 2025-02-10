import PRODUCTIONS from '../../database/Audiovisual_productions.json'
import Category from './Category';
import Production from './Production'
import NewProduction from './NewProduction'

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

const streamServices: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .map((production) => production.streamService.trim())
  )
);


export default function Main() {
  return (
    <div>
        {/* PARA AGRUPAR POR NOVAS PRODUÇÕES / CARROSSEL PRINCIPAL */}
        <Category key="new-productions" name="Novas Produções">
          {PRODUCTIONS.audiovisual_productions
            .filter((production) => production.isNew)
            .map((production) => (
              <NewProduction
                key={production.id}
                id={production.id}
                name={production.name}
                type={production.type}
                genre={production.genre}
                length={production.length}
                description={production.description}
                image={production.image}
                isNew={production.isNew}
                classification={production.indicativeClassification}
                streamService={production.streamService}
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
                    key={production.id}
                    id={production.id}
                    name={production.name}
                    year={production.year}
                    type={production.type}
                    genres={production.genre}
                    length={production.length}
                    description={production.description}
                    image={production.image}
                    isNew={production.isNew}
                    classification={production.indicativeClassification}
                    streamService={production.streamService}
                  />
                ))}
          </Category>
        ))}
    </div>
  )
}
import Category from './Category';
import Production from './Production';
import NewProduction from './NewProduction';
import PRODUCTIONS from '../../database/Audiovisual_productions.json';

interface MainProps {
    productions: any[];
    filterName: string;
    onProductionClick: (production: any) => void;
}

export default function Main({ productions, filterName, onProductionClick }: MainProps) {
    const isFilterActive = filterName !== "Produções Recomendadas";

    return (
        <>
            {/* EXIBIR CARROSSEL DE NOVAS PRODUÇÕES APENAS QUANDO NENHUM FILTRO ESTÁ ATIVO */}
            {!isFilterActive && (
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
                                onClick={() => onProductionClick(production)}
                            />
                        ))}
                </Category>
            )}

            {/* EXIBIR PRODUÇÕES FILTRADAS */}
            <Category key="filtered-productions" name={filterName}>
                {(filterName === "Produções Recomendadas"
                    ? productions.sort(() => 0.5 - Math.random()).slice(0, 6)
                    : productions
                ).map((production) => (
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
                        onClick={() => onProductionClick(production)}
                    />
                ))}
            </Category>
        </>
    );
}
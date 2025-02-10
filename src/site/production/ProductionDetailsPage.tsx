import { getClassificationLabel } from "../../utils/utils";
import "../../css/ProductionDetailsPage.css";

interface ProductionDetailsPageProps {
    production: any;
    onBackToList: () => void;
}

export default function ProductionDetailsPage({ production, onBackToList }: ProductionDetailsPageProps) {
    const classificationLabel = getClassificationLabel(production.indicativeClassification);
    
    return (
        <div className="production-details-page" key={production.id}>
            {/* Banner */}
            <div className="production-banner" style={{ backgroundImage: `url(./img/productions/${production.image})` }}>
                <div className="overlay">
                    <h1 className="production-title">{production.name}</h1>
                    <div className="indicative-classification d-flex align-items-center">
                        <span className="production-classification">
                            <img
                                className="production-image-indicative"
                                src={`./img/indicative/${classificationLabel}.png`}
                                alt={`${classificationLabel} classification`}
                            />
                        </span>
                        <span className="production-summary">
                            <u>{production.genre ? production.genre.join(", ") : "N/A"}</u>
                        </span>
                    </div>
                    {/* Botão "Comece a Assistir" */}
                    <div className="mt-3 text-center">
                        <div
                            key={`${production.name}_first_episode`}
                            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
                            rel="noopener noreferrer"
                            style={{
                                backgroundColor: "#ff9900",
                                border: "none",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "50px",
                                transition: "transform 0.2s, background-color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#cc7a00")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff9900")}
                        >
                            <i className="bi bi-play-circle-fill" style={{ fontSize: "1.5rem", color: "#fff", }}></i>
                            Assista Agora
                        </div>
                    </div>

                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="production-main-content">
                <div className="row">
                    {/* Sinopse */}
                    <div className="col-md-6">
                        <section className="production-section synopsis">
                            <h2 className="mb-3">Sinopse</h2>
                            <div className="synopsis-text">
                                <p className="text-white">{production.description}</p>
                            </div>
                        </section>
                    </div>

                    {/* Detalhes */}
                    <div className="col-md-6">
                        <section className="production-section details">
                            <h2 className="mb-3">Detalhes</h2>
                            <div className="details-list">
                                <p><strong>Ano de Lançamento:</strong> {production.year}</p>
                                <p><strong>Tipo de Produção:</strong> {production.type}</p>
                                <p><strong>Duração:</strong> {production.length} {production.type == "filme" || production.type == "documentário" ? " minutos" : " episódios"}</p>
                                <p><strong>Serviço de Streaming:</strong> {production.streamService}</p>
                            </div>
                        </section>
                    </div>
                </div>
                {/* Episódios */}
                <section className="production-section episodes">
                    <h2>{production.type == "filme" || production.type == "documentário" ? "Assista Agora" : "Episódios"}</h2>
                    <div className="episodes-grid">
                        {production.type == "filme" || production.type == "documentário" ?
                            <div key={`${production.name}_${1}`} className="episode-card">
                                <div className="episode-image-wrapper">
                                    <img
                                        src={`./img/productions/${production.image}`}
                                        alt={`Episode ${1}`}
                                        className="episode-image"
                                    />
                                    <div className="episode-overlay">
                                        <h3 className="episode-number">{production.name}</h3>
                                    </div>
                                </div>
                            </div>


                            : Array.from({ length: production.length || 0 }).map((_, index) => (
                                <div key={`${production.name}_${index + 1}`} className="episode-card">
                                    <div className="episode-image-wrapper">
                                        <img
                                            src={`./img/productions/${production.image}`}
                                            alt={`Episode ${index + 1}`}
                                            className="episode-image"
                                        />
                                        <div className="episode-overlay">
                                            <h3 className="episode-number">Episode {index + 1}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            </div>
            <button className="btn btn-primary mb-3" onClick={onBackToList}>Voltar</button>
        </div >
    );
}

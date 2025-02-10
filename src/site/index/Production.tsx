import "../../css/Production.css";
import { getClassificationLabel } from "../../utils/utils";

interface ProductionProps {
    id: number;
    name: string;
    year: number;
    type: string;
    genres: string[];
    length: number;
    description: string;
    image: string;
    isNew?: boolean;
    classification: number;
    streamService: string;
}

export default function Production({ id, name, year, type, genres, length, description, image, isNew, classification, streamService }: ProductionProps) {
    let classificationLabel = getClassificationLabel(classification);

    return (
        <div key={id} className="production position-relative">
            <div className="production_image_wrapper">
                <img className="production_image img-fluid" src={`./img/productions/${image}`} alt={name} />
                {isNew && <div className="production-new">{type === "série" || type === "novela" ? "Nova" : " Novo"} {type}</div>}
                {streamService == "original" && <div className="production-stream-service">Original</div>}
                {streamService === "Netflix" && <div className="production-stream-service" style={{ backgroundColor: "rgb(229,9,20)" }}>Netflix</div>}
                {streamService === "Globoplay" && <div className="production-stream-service" style={{ background: "linear-gradient(87.96deg, rgb(251, 2, 52) 34.05%, rgb(255, 143, 1) 99.97%)" }} >GloboPlay</div>}
                {streamService === "Prime Video" && <div className="production-stream-service" style={{ backgroundColor: "#1399FF" }}>Prime</div>}
                {streamService === "Disney+" && <div className="production-stream-service" style={{ backgroundColor: "#02d6e8" }}>Disney+</div>}
                {streamService === "Crunchyroll" && <div className="production-stream-service" style={{ backgroundColor: "#ff640a" }}>Crunchyroll</div>}
                <div className="production_text">
                    <span className="production_name_external text-center text-truncate">{name}</span>
                </div>
            </div>
            <div className="production_details text-decoration-none text-white text-start">
                <div className="production_name_internal text-justify mb-1">{name}</div>
                <div className="row">
                    <span className="classification col-3 d-flex justify-content-center">
                        <img className="image_indicative" src={`./img/indicative/${classificationLabel}.png`} alt={name} />
                    </span>
                    <div className="production_year col-4">{year}</div>
                    <div className="production_length col-5">{length}{type === "filme" || type === "documentário" ? " min" : " ep"}</div>
                </div>
                <div className="production_description mt-1">{description}</div>
                <div className="production_genre">
                    {genres.map((genreItem) => (
                        <span key={genreItem} className="genre-item">
                            <a className="me-1" href={`#${genreItem}`}>{genreItem.trim()}</a>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
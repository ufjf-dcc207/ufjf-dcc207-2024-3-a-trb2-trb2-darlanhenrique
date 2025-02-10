import "../../css/NewProduction.css";
import { getClassificationLabel } from "../../utils/utils";

interface ProductionProps {
    id: number;
    name: string;
    type: string;
    genre: string[];
    length: number;
    description: string;
    image: string;
    isNew?: boolean;
    classification: number;
    streamService?: string;
}

export default function Production({ name, type, genre, length, description, image, isNew, classification, streamService }: ProductionProps) {
    let classificationLabel = getClassificationLabel(classification);

    return (
        <div className="new_production -mx-4" style={{ display: "flex", height: "85vh", backgroundColor: "#00050d" }}>
            <div className="new_production_details" style={{ width: "60%" }} >
                {isNew && <div className="new">{type === "série" || type === "novela" ? "Nova" : " Novo"} {type}</div>}

                <div className="new_name">{name}</div>

                <div className="new_details">
                    <div className="new_description">{description}</div>
                </div>
                <div className="new_buttons">
                    <button className="btn btn-outline-secondary ">▶️ Assista Agora</button>
                    <button className="btn btn-outline-secondary rounded-full">🛈</button>
                </div>

                <div className="new_info">
                    <div className="me-2 new_type text-capitalize">{type}</div>
                    <div className="mx-2 new_length">{length}{type === "filme" || type === "documentário" ? " min" : " episódios"}</div>
                </div>
                <div className="new_genre">
                    {genre.map((genreItem) => (
                        <span key={genreItem} className="new_genre-item">
                            <a className="me-1" href={`#${genreItem}`}>{genreItem.trim()}</a>
                        </span>
                    ))}
                </div>
            </div>

            <div className="new_production_image" style={{ backgroundImage: `url(./img/productions/${image})` }}>
                {streamService === "original" && <div className="new_original" style={{ backgroundColor: "#f41246" }}>Original</div>}
                {streamService === "Netflix" && <div className="new_original" style={{ backgroundColor: "rgb(229,9,20)" }}>Netflix</div>}
                {streamService === "Globoplay" && <div className="new_original" style={{ background: "linear-gradient(87.96deg, rgb(251, 2, 52) 34.05%, rgb(255, 143, 1) 99.97%)" }} >GloboPlay</div>}
                {streamService === "Prime Video" && <div className="new_original" style={{ backgroundColor: "#1399FF" }}>Amazon Prime</div>}
                {streamService === "Disney+" && <div className="new_original" style={{ backgroundColor: "#02d6e8" }}>Disney+</div>}
                {streamService === "Crunchyroll" && <div className="new_original" style={{ backgroundColor: "#ff640a" }}>Crunchyroll</div>}

                <div className="indicative-classification">
                    <span className="classification">
                        <img className="new_image_indicative" src={`./img/indicative/${classificationLabel}.png`} alt={name} />
                    </span>
                </div>
            </div>
        </div>
    )

}
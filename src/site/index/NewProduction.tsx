import "../../css/NewProduction.css";

interface ProductionProps {
    name: string;
    type: string;
    genre: string[];
    length: number;
    description: string;
    image: string;
    isNew?: boolean;
    classification: number;
    isOriginal?: boolean;
}

export default function Production({ name, type, genre, length, description, image, isNew, classification, isOriginal }: ProductionProps) {
    // console.log("Production props:", { name, type, genre, length, description, image, isNew, classification, isOriginal });

    function getClassificationLabel(classification: number): string {
        let classificationLabel: string;
        switch (classification) {
            case 0:
                classificationLabel = "free";
                break;
            case 10:
                classificationLabel = "ten_years";
                break;
            case 12:
                classificationLabel = "twelve_years";
                break;
            case 14:
                classificationLabel = "fourteen_years";
                break;
            case 16:
                classificationLabel = "sixteen_years";
                break;
            case 18:
                classificationLabel = "eighteen_years";
                break;
            default:
                classificationLabel = "free";
                break;
        }
        return classificationLabel;
    }

    let classificationLabel = getClassificationLabel(classification);

    return (
        <div className="new_production -mx-4" style={{ display: "flex", height: "85vh" }}>
            <div className="new_production_details" style={{ width: "60%" }}>
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
                {isOriginal && <div className="original">Original</div>}
                <div className="indicative-classification">
                    <span className="classification">
                        <img className="new_image_indicative" src={`./img/indicative/${classificationLabel}.png`} alt={name} />
                    </span>
                </div>
            </div>
        </div>
    )

}
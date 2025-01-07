import "../../css/Production.css";

interface ProductionProps {
    name: string;
    year: number;
    type: string;
    genre: string[];
    length: number;
    description: string;
    image: string;
    isNew?: boolean;
    classification: number;
    isOriginal?: boolean;
}

export default function Production({name, year, type, genre, length, description, image, isNew, classification, isOriginal}: ProductionProps) {

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
    <div className="production">
        <div className="image-container">
            <img className="image" src={`./img/productions/${image}`} alt={name} />
            {isNew && <div className="new">{type === "série" || type === "novela" ? "Nova" : " Novo"} {type}</div>}
            {isOriginal && <div className="original">Original</div>}
        </div>
        <div className="details">
            <div className="name">{name}</div>
            <div className="description">{description}</div>
            <div className="type">{type}</div>
            <div className="year">{year}</div>
            <div className="length">{length}{type === "filme" || type === "documentário" ? " min" : " episódios"}</div>
            <div className="genre ">
                {genre.map((genreItem) => (
                    <span key={genreItem} className="genre-item">
                    <a className="me-1" href={`#${genreItem}`}>{genreItem.trim()}</a>
                    </span>
                ))}
            </div>
            <div className="indicative-classification">
                <span className="classification">
                    <img className="image_indicative " src={`./img/indicative/${classificationLabel}.png`} alt={name} />
                </span>
            </div>
        </div>
    </div>
  );
}
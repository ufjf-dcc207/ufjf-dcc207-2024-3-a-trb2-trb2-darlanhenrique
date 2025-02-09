// Function to get the rating label based on the rating
export function getClassificationLabel(classification: number): string {
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
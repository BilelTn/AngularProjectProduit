// product.model.ts
export class Produit {
    id: number | undefined;
    code: string | undefined;
    designation: string | undefined;
    prix: number | undefined;
    quantite: number | undefined;
    dateAchat: string | undefined;
    enPromotion: boolean | undefined;
    categorie: {
        id: number | undefined;
        code: string | undefined;
        libelle: string | undefined;
    } = {
        id: 0,
        code: '',
        libelle: ''
    };
    stocks: any[] | undefined; // Use a more specific type if possible
}

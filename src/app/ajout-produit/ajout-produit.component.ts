import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  categories: any[] = [];


  produits: Array<Produit> = [];
  nouveauProduit: Produit = {
    code: '',
    prix: 0,
    designation: '',
    categorie: {
      id:0,
      code: '',
      libelle: ''
    },
    id: 0,
    quantite: 0,
    dateAchat: undefined,
    enPromotion: false,
    stocks: undefined
  };
  
  etatAjout: string = "";
  categorieFiltre: any;
  produitsFiltres: any;
  
onCategorieSelectionnee(event: any) {
  this.nouveauProduit.categorie = event.target.value;
}
chargerCategories() {
  this.produitsService.getCategorie().subscribe({
    next: data => {
      this.categories = data;
    },
    error: err => {
      console.log("Erreur lors du chargement des catégories");
    }
  });
}



  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    this.afficheListeProduit();
    this.listCategorie();
    this.chargerCategories();
  }
  filtrerProduitsParCategorie() {
    if (this.categories.length > 0 && this.categorieFiltre) {
      this.produitsFiltres = this.produits.filter(p => p.categorie?.id === this.categorieFiltre?.id);
    } else {
      this.produitsFiltres = this.produits;
    }
  }

  listCategorie() {
    this.produitsService.getCategorie().subscribe({
      next: data => {
        this.categories = data;
      }
    });
  }

  afficheListeProduit() {
    this.produitsService.getProduits().subscribe({
      next: data => {
        this.produits = data;
      },
      error: err => {
        console.log("erreur de chargement de données")
      }
    });
  }
  categorieSelectionnee: any;
  
ajouterProduit(form: NgForm) {
  console.log('Valeur de nouveauProduit avant envoi :', this.nouveauProduit);

  this.nouveauProduit.code = form.value.code;
  this.nouveauProduit.prix = form.value.prix;
  this.nouveauProduit.designation = form.value.designation;

  const selectedCategoryId = Number(form.value.categorie);

  const selectedCategory = this.categories.find(categorie => categorie.id === selectedCategoryId);

  if (selectedCategory) {
    this.nouveauProduit.categorie = selectedCategory;

    console.log('Nouvelle valeur de nouveauProduit après traitement :', this.nouveauProduit);

    this.produitsService.addProduit(this.nouveauProduit).subscribe({
      next: produitajouter => {
        this.etatAjout = "Produit ajouté avec succès";
        this.nouveauProduit=new Produit();
      },
      error: err => {
        console.log("Erreur produit non ajouté :", err);
      }
    });
  } else {
    console.log('Erreur : Catégorie non trouvée');
  }
}

filtrerParCategorie() {
  if (this.categorieSelectionnee) {
    this.produits = this.produits.filter(
      produit => produit.categorie.id === this.categorieSelectionnee.id
    );
  } else {
    this.afficheListeProduit();
  }
}
}
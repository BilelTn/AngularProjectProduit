import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  produits: Array<Produit> = [];
  nouveauProduit = new Produit();
  etatajout: string="";
  
  constructor(private produitsService: ProduitsService) { }
  ngOnInit(): void {
    this.afficheListeProduit();

  }
  afficheListeProduit() {
    this.produitsService.getProduits().subscribe({
      next: data => {
        console.log("success de chargement");
        this.produits = data;
      }, error: err => {
        console.log("erreur de chargement de données")
      }
    })
  }
  validerFormulaire(form: NgForm) {

    const idRechercher = form.value.id;
    console.log("ID récupéré du formulaire :", idRechercher); // Vérification de l'ID récupéré

    const isPresent = this.produits.some(objet => objet.id === idRechercher);

    if (isPresent) {
      alert("Identificateur de produit déjà existant..")
    } else {
      console.log("id non existant");
      this.ajouterProduit(form);
      



    }
    this.nouveauProduit = new Produit();

  }
  ajouterProduit(form: NgForm) {

    this.produitsService.addProduit(form.value).subscribe({
      next: produitajouter => {
        this.etatajout="Produit ajouté avec sucess";
      },
      error: err => {
        console.log("erreur produit non ajouté")
      }
    });

  }

}

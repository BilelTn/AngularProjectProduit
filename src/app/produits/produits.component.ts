import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: any[] = [];
  categories: any[] = [];
  etatajout = "";
  etaEdit = "";
  categorieCourante: any = { id: null, libelle: '' }; 
  constructor(private produitsService: ProduitsService) { }
  nouveau: boolean = true;
  ngOnInit(): void {
    this.consulterProduits();
    this.chargerCategorie();
  }
  categorieFiltre: any = { id: null }; 
  produitsFiltres: any[] = [];

  chargerCategorie() {
    return this.produitsService.getCategorie().subscribe({
      next: data => {
        this.categories = data;
        console.log("liste categories :", this.categories);
      }
    });
  }
 
  produitCourant: any;

  selectionnerProduit(p: Produit) {
    this.nouveau = false;
    this.produitCourant = { ...p };
    this.categorieCourante = this.produitCourant.categorie;
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits()
      .subscribe({
        next: data => {
          console.log("Succès GET");
          this.produits = data;
        },
        error: err => {
          console.log("Erreur GET");
        }
      });
  }

  editerProduit(form: NgForm) {
    if (!this.produitCourant) {
      console.error("Produit courant non défini.");
      return;
    }
  
    let produitAediter: any = { ...this.produitCourant };
  
    produitAediter.categorie = produitAediter.categorie || {};
  
    produitAediter.id = form.value.id;
    produitAediter.code = form.value.code;
    produitAediter.designation = form.value.designation;
    produitAediter.prix = form.value.prix;
  
    produitAediter.categorie.libelle = form.value.categorie || '';
  
    console.log(form.value);
  
    let reponse: boolean = confirm("Confirmez-vous la mise à jour de : " + this.produitCourant.designation + " ?");
    if (reponse) {
      this.produitsService.updateProduit(produitAediter)
        .subscribe({
          next: updatedProduit => {
            console.log("Succès PUT");
            this.etaEdit = "Produit mis à jour avec succès";
            this.consulterProduits();
          },
          error: err => {
            console.log("Erreur PUT");
          }
        });
    } else {
      console.log("Mise à jour annulée");
    }
  
    this.produitCourant = new Produit();
    this.nouveau = true;
  }
    ajouterProduit(form: NgForm) {
    this.produitsService.addProduit(form.value).subscribe({
      next: produitajouter => {
        this.etatajout = "ajouter avec succès";
        this.consulterProduits();
      },
      error: err => {
        this.etatajout = "echec produit non ajouté";
      }
    });
  }

  supprimerProduit(p: Produit) {
    const produitAsupprime: Produit = { ...p };
    console.log(produitAsupprime);
    let quest: boolean = confirm("voulez vous vraiment supprimer '" + p.code + "'  '" + p.designation + " '");
    if (quest) {
      this.produitsService.deleteProduit(produitAsupprime.id)
        .subscribe({
          next: produitSupprime => {
            console.log("Succès Delete");
            this.produitsService.getProduits()
              .subscribe({
                next: data => {
                  console.log("Succès get");
                  this.consulterProduits();
                },
                error: err => {
                  console.log("Erreur get");
                }
              });
          },
          error: err => {
            console.log("Erreur delete");
          }
        });
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  //[style.backgroundColor]="action==actionCourante?'white':'blue'"

  produits: Array<Produit> = [];
  etatajout = "";
  etaEdit = "";
  constructor(private produitsService: ProduitsService) { }
  nouveau: boolean = true;
  ngOnInit(): void {
    console.log("intialisation du composant");
    this.consulterProduits();


  }
  produitCourant = new Produit();
  selectionnerProduit(p: Produit) {
    this.nouveau = false;
    this.produitCourant = { ...p };

  }
  consulterProduits() {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits()
      .subscribe(
        {
          //En cas de succès
          next: data => {
            console.log("Succès GET");
            this.produits = data;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur GET");
          }
        }
      )
  }
  editerProduit(form: NgForm) {
    let produitAediter=new Produit();
    produitAediter.id=form.value.id;
    produitAediter.code=form.value.code;
    produitAediter.designation=form.value.designation;
    produitAediter.prix=form.value.prix;
    console.log(form.value);        
        let reponse: boolean = confirm(" Confirmez vous la mise à jour de :" + this.produitCourant.designation + " ?");
        if (reponse == true) {
          //mettre à jour dans le BackEnd
          
          this.produitsService.updateProduit(form.value.id, produitAediter)
            .subscribe(
              {
                next: updatedProduit => {
                  console.log("Succès PUT");
                  //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
                  this.etaEdit = "Produit mis a jour avec sucess"
                  this.consulterProduits();

                },
                error: err => {
                  console.log("Erreur PUT");
                }
              }
            )
        }
        else {
          console.log("Mise à jour annulée");
        }

      

    
        this.produitCourant = new Produit();
    this.nouveau = true;

  }

  ajouterProduit(form: NgForm) {

    this.produitsService.addProduit(form.value).subscribe({
      next: produitajouter => {
        this.etatajout = "ajouter avec sucess";
        this.consulterProduits();
      }

      , error: err => {
        this.etatajout = "echec produit non ajouté";
      }
    });

  }


  supprimerProduit(p: Produit) {
    const produitAsupprime: Produit = { ...p };
    let quest: boolean = confirm("voulez vous vraiment supprimer '" + p.code + "'  '" + p.designation + " '")
    if (quest) {

      this.produitsService.deleteProduit(produitAsupprime.id)
        .subscribe(
          {
            next: produitSupprime => {
              console.log("Succès Delete");

              this.produitsService.getProduits()
                .subscribe(
                  {
                    next: data => {
                      console.log("Succès get");
                      this.consulterProduits();
                    },
                    error: err => {
                      console.log("Erreur get");
                    }
                  }
                )

            },
            error: err => {
              console.log("Erreur delete");
            }
          });
    }
  }
}
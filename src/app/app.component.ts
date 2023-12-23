import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   actions: Array<any> = [
    { titre: "Accueil", route: "/accueil", icone: "bi-house" },
    { titre: "Liste des produits", route: "/produits", icone: "bi-list-ul" },
    { titre: "Ajouter produit", route: "/ajouterProduit", icone: "bi-plus" }
  ];
  
  
actionCourante:any;
setActionCourante(a:any){
  this.actionCourante=a;
}


}

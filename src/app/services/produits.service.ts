import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';
import { Categorie } from '../model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  urlHote="http://localhost:3333/produits/";


  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
    }),
    responseType: 'text' as 'json', 
  };
  getProduits() :Observable<Array<Produit>>
{
return this.http.get<Array<Produit>> (this.urlHote);
}
deleteProduit(id:number|undefined)
{
return this.http.delete (this.urlHote+"delete/"+id);
}
addProduit(nouveau: Produit)
 {

return this.http.post<Array<Produit>> (this.urlHote+"add",nouveau);
}
updateProduit( nouveau: Produit)
 {
  
return this.http.put(this.urlHote+"update",nouveau);
}
getCategorie():Observable<Array<any>>{
  return this.http.get<Array<any>>(this.urlHote+"categories");

}}

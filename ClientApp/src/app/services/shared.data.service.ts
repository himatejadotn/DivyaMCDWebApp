import { Injectable } from '@angular/core';  
 import{BehaviorSubject}from 'rxjs' 
@Injectable({
    providedIn: 'root',
})

export class SharedDataService {  
  private data = {};  
  private content =new BehaviorSubject<object>({});
  public share=this.content.asObservable();
constructor(

){
}
updateData(data){
this.content.next(data);
}
  setOption(response) {  
    this.data=response;  
  }  
  
  getOption() {  
    return this.data;  
  }  
}
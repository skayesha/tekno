import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import * as customerDetails from '../tabledata.json';

interface customerData {  
   
  customerName:String,
  projectName:String
  globalMaster:String
  indicator:String
  techniccalPerson:String
  forecastGenerated:String
}  

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  customers: customerData[] = customerDetails;  
  
  getDataUrl:any
  receivedData:any

  constructor(private router:Router , private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get(this.getDataUrl).subscribe(data=>{
      this.receivedData=data
    },
    error=>{
      console.log(error);
      
    })
  }
viewData(){}

editData(){}

deleteData(){}
  
logout(){
  localStorage.clear()
this.router.navigateByUrl('/login')

}
}

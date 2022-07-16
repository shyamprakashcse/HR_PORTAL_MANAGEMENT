import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  EmployeeDetail:any={}
  private _ProfileURL = 'http://localhost:3000/api/empprofile'
  private _profileBody = {
    "HCMID":localStorage.getItem('id')
  }

  btn:any="";
  nav:any="";
  headnav:any=""
  tog:boolean=false;
  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    this.http.post<any>(this._ProfileURL,this._profileBody).subscribe((res)=>{
        this.EmployeeDetail = res ;
        Swal.fire({
          icon: 'success',
          title: 'User Data found',
          text: 'Employee Profile Data is Found!...',
          timer : 2000

        })
    },(err)=>{

      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'User found',
        text: 'Employee Profile Details Not Found!...',
        timer : 2000

      })


    })
  }





toggle(){
  this.btn = document.getElementById("btn");
  this.nav = document.getElementById("nav");
  this.headnav = document.getElementById("headnav")
  if(this.tog==false){
    this.btn.classList.add("toggle");
    this.nav.classList.add("togglenav");
    this.headnav.classList.add("headnavtoggle")
    this.tog=true
  }
  else{
    this.tog=false;
    this.btn.classList.remove("toggle");
    this.nav.classList.remove("togglenav");
    this.headnav.classList.remove("headnavtoggle");
  }

}

logout(){
   this.route.navigate(['login'])
}

leaveRecord(){
  this.route.navigate(['employee/leave'])
}

leaveGraph(){
  this.route.navigate(['employee/lg'])
}
payslip(){
  this.route.navigate(['employee/payslip'])
}

profile(){
  this.route.navigate(['employee/profile'])
}
}

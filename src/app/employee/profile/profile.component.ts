import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _ProfileURL = 'http://localhost:3000/api/empprofile'
  private _profileBody = {
    "HCMID":localStorage.getItem('id')
  }
  print:any;

  EmployeeDetail:any;


  constructor(private http:HttpClient,private loader:NgxSpinnerService,private route:Router) { }

  ngOnInit(): void {

    this.http.post<any>(this._ProfileURL,this._profileBody).subscribe((res)=>{
      this.EmployeeDetail = res ;
      console.log(res)
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


  });






  }

   ExportPDF(){


  this.print = document.getElementById('print');
  //var width = document.getElementById('print').offsetWidth;
  html2canvas(this.print).then(canvas => {
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    var position = 5;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
    pdf.save('Profile_Report.pdf');
   })




}
  back(){
     this.route.navigate(['home'])
  }
}

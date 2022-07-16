import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  private _ProfileURL = 'http://localhost:3000/api/empprofile'
  private _profileBody = {
    "HCMID":localStorage.getItem('id')
  }
  print:any;
  Leaverecord:any=[]
  ReportDisplay:boolean=false
  TotalLeave:number=0
  GL:number=0 ;
  ML:number=0;
  PAL:number=0;
  UPL:number=0;
  PL:number=0;
  EmployeeDetail:any;
  year:any="";
  month:any="";
  selectedMonth=""
  monthArr=["January","February","March","April","May","June","July","August","September","October","November","December"]

  private _LeaveRecordURL = 'http://localhost:3000/api/empleave'
  private _LeaverecordBody = {
    "Year" : this.year,
    "Month" : this.month,
    "HCMID":localStorage.getItem('id')
  }
  constructor(private http:HttpClient,private loader:NgxSpinnerService,private route:Router) { }

  ngOnInit(): void {

    this.http.post<any>(this._ProfileURL,this._profileBody).subscribe((res)=>{
      this.EmployeeDetail = res ;
      console.log(res)
      // Swal.fire({
      //   icon: 'success',
      //   title: 'User Data found',
      //   text: 'Employee Profile Data is Found!...',
      //   timer : 2000

      // })
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


 fetch(){

   this.ReportDisplay = false
   const fetchedYear = parseInt(this.year)
   const fetchedMonth = parseInt(this.month)
   const currentYear = new Date().getFullYear();
   if(this.year=="" || this.month=="" || fetchedYear<=0 || fetchedYear>currentYear || fetchedMonth<0 || fetchedMonth>12){
    Swal.fire({
      icon: 'error',
      title: 'Invalid Date',
      text: 'Choose Valid Date',
      timer : 2000

    });
    this.year=""
    this.month=""
    this.ReportDisplay=false ;


   }
   else{

    this.loader.show(undefined,{
      type: "ball-climbing-dot",
      color:'#0f1aec',
      size:'large',
      fullScreen:false,

      bdColor:'rgba(100,149,237,0.1)',

    });

    this._LeaverecordBody["Month"] = this.month.toString().padStart(2,'0');
    this._LeaverecordBody["Year"] = this.year.toString();
    this.ReportDisplay=false
    this.http.post<any>(this._LeaveRecordURL,this._LeaverecordBody).subscribe((res)=>{
      this.Leaverecord = res ;
      this.selectedMonth = this.monthArr[fetchedMonth-1];
      this.getLeaveCount();
      console.log(this.Leaverecord);
      this.loader.hide();
      if(this.Leaverecord.length>0){
        this.ReportDisplay=true;
        this.year=""
        this.month=""


      Swal.fire({
        icon: 'success',
        title: 'Record found',
        text: 'Leave Data is Found!...',
        timer : 2000

      });


    }
    else{

      Swal.fire({
        icon: 'error',
        title: 'No Record Found',
        text: 'No data is available for the particular dates',
        timer : 3000

      });
      this.ReportDisplay=false;
      this.month=""
      this.year=""

    }


    },(err)=>{

      console.log(err);
      this.loader.hide();
      Swal.fire({
        icon: 'error',
        title: 'No Record Found',
        text: 'No data is available for the particular dates',
        timer : 3000

      });

    })

   }
 }


 getLeaveCount(){
     this.Leaverecord.forEach((value:any) => {

      if(value.NO_OF_DAYS_LEAVE!=""){
        this.TotalLeave+=parseInt(value.NO_OF_DAYS_LEAVE)
      }

        if(value.LEAVE_TYPE=="ML"){
          this.ML+=parseInt(value.NO_OF_DAYS_LEAVE)
        }
        else if(value.LEAVE_TYPE=="PL"){
          this.PL+=parseInt(value.NO_OF_DAYS_LEAVE)
        }
        else if(value.LEAVE_TYPE=="GL"){
          this.GL+=parseInt(value.NO_OF_DAYS_LEAVE)
        }
        else if(value.LEAVE_TYPE=="PAL"){
          this.PAL+=parseInt(value.NO_OF_DAYS_LEAVE)
        }
        else if(value.LEAVE_TYPE=="UPL"){
          this.UPL+=parseInt(value.NO_OF_DAYS_LEAVE)
        }



     })
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
    pdf.save(this.selectedMonth+' Leave_Report.pdf');
   })




}

back(){
  this.route.navigate(['home'])
}


}

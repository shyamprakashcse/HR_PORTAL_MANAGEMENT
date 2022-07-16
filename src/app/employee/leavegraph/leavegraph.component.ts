import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js'
import Chart from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-leavegraph',
  templateUrl: './leavegraph.component.html',
  styleUrls: ['./leavegraph.component.css']
})
export class LeavegraphComponent implements OnInit {
  EmployeeDetail:any={}
  print:any;
  Total:number=0
  chart:any=[]
  LeaveGraphData:any=[]
  LeaveGraphArr:any=[]
  SelectedYear:string= new Date().getFullYear().toString()
  year:string=""
  ReportDisplay:boolean=false
  private _ProfileURL = 'http://localhost:3000/api/empprofile'
  private _profileBody = {
    "HCMID":localStorage.getItem('id')
  }
  private _LeaveGraphURL = 'http://localhost:3000/api/empleavegraph'
  private _LeaveGraphBody = {
    "HCMID":localStorage.getItem('id'),
    "Year" : new Date().getFullYear().toString()
  }
  constructor(private http:HttpClient,private route:Router,private loader:NgxSpinnerService) {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
   }

  ngOnInit(): void {

    this.loader.show(undefined,{
      type: "ball-climbing-dot",
      color:'#0f1aec',
      size:'large',
      fullScreen:false,

      bdColor:'rgba(100,149,237,0.1)',

    });


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



   this.http.post<any>(this._LeaveGraphURL,this._LeaveGraphBody).subscribe((res)=>{
    this.LeaveGraphArr=res
     res.forEach((value:any) => {
       if(value.NO_OF_DAYS!="")
        this.LeaveGraphData.push(parseInt(value.NO_OF_DAYS));
     });
     console.log(this.LeaveGraphData);
     this.findTotal()
     this.loader.hide();

     this.chart = new Chart('canvas',{
      type : 'line',
      data : {
        labels : ["Jan","Feb","Mar","Apr","May","Jun","Aug","Sep","Oct","Nov","Dec"],
        datasets : [
          {
            label:'Leave Graph Year'+this.SelectedYear,
            // data : [1,3,5,10,56,65,35,543,543,543],
            data : this.LeaveGraphData,
            backgroundColor:'blue',
            borderColor:'#03fc5e',
            fill:false
          }
        ]
      }
    })
   },(err)=>{
    console.log(err);
    this.loader.hide();
   })

  }

  ExportPDF(){

  this.print = document.getElementById('print');
  //var width = document.getElementById('print').offsetWidth;
  html2canvas(this.print).then(canvas => {
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf.jsPDF('p', 'mm', 'a3');
    var position = 5;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
    pdf.save(this.SelectedYear+'_Leave_Statistics_Report.pdf');
   })

  }

  fetch(){
    this.SelectedYear=this.year;
    const fetchedYear = parseInt(this.year);
    const CurrentYear = new Date().getFullYear()
    if(fetchedYear< 0 || this.SelectedYear=="" || fetchedYear>CurrentYear){
      Swal.fire({
        icon: 'error',
        title: 'No Record Found',
        text: 'No data is available for the particular dates',
        timer : 3000

      });
    }
    else{
      this.SelectedYear = this.year
      this._LeaveGraphBody["Year"] = this.year.toString()
      this.loader.show(undefined,{
        type: "ball-climbing-dot",
        color:'#0f1aec',
        size:'large',
        fullScreen:false,

        bdColor:'rgba(100,149,237,0.1)',

      });

      this.http.post<any>(this._LeaveGraphURL,this._LeaveGraphBody).subscribe((res)=>{
        this.LeaveGraphArr=res
        res.forEach((value:any) => {
          if(value.NO_OF_DAYS!="")
           this.LeaveGraphData.push(parseInt(value.NO_OF_DAYS));
        });
        console.log(this.LeaveGraphData);
        this.findTotal();

        this.loader.hide();

        this.ReportDisplay=true

        this.chart = new Chart('canvas',{
         type : 'line',
         data : {
           labels : ["Jan","Feb","Mar","Apr","May","Jun","Aug","Sep","Oct","Nov","Dec"],
           datasets : [
             {
               label:'Leave Graph Year: '+this.SelectedYear,
               // data : [1,3,5,10,56,65,35,543,543,543],
               data : this.LeaveGraphData,
               backgroundColor:'blue',
               borderColor:'#03fc5e',
               fill:false
             }
           ]
         }
       });

       this.year=""


      },(err)=>{
        this.year=""
        this.ReportDisplay=false
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

  back(){
    this.route.navigate(['home']);
  }

  findTotal(){
    this.Total=0;
    this.LeaveGraphData.forEach((value:any) => {
      this.Total+=value;

    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  private _PaySlipURL = 'http://localhost:3000/api/emppayslip'
  private _PaySlipBody = {
    "HCMID":localStorage.getItem('id')
  }

  private _PaySlipPDFURL = 'http://localhost:3000/api/emppayslippdf'
  private _PaySlipPDFBody = {
    "HCMID":localStorage.getItem('id')
  }
  BASE64:string="";
  linkSource:string="";

  PaySlipData:any=[]
  constructor(private http:HttpClient,private route:Router,private loader:NgxSpinnerService) { }

  ngOnInit(): void {
    this.http.post<any>(this._PaySlipURL,this._PaySlipBody).subscribe((res)=>{
      this.PaySlipData=res;
      console.log(this.PaySlipData)
    },(err)=>{
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'No Record Found',
        text: 'No data is available for the particular ID',
        timer : 3000

      });

    })


  }

  downloadPaySlip(){
    this.loader.show(undefined,{
      type: "ball-climbing-dot",
      color:'#0f1aec',
      size:'large',
      fullScreen:false,

      bdColor:'rgba(100,149,237,0.1)',

    });
    this.http.post<any>(this._PaySlipPDFURL,this._PaySlipPDFBody).subscribe((res)=>{
      this.loader.hide();
      this.BASE64 = res[0]
      console.log(this.BASE64);
      this.linkSource = `data:application/pdf;base64,${this.BASE64}`;
      const DownLoadLink = document.createElement("a");
      const FileName = "PaySlip.pdf";
      DownLoadLink.href = this.linkSource ;
      DownLoadLink.download = FileName;
      DownLoadLink.click();

    },(err)=>{
       console.log(err);
       this.loader.hide();
    })
  }

  back(){
      this.route.navigate(['home'])
  }

}

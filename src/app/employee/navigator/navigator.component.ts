import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  private _PaySlipPDFURL = 'http://localhost:3000/api/emppayslippdf'
  private _PaySlipPDFBody = {
    "HCMID":localStorage.getItem('id')
  }
  BASE64:string="";
  linkSource:string="";
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.post<any>(this._PaySlipPDFURL,this._PaySlipPDFBody).subscribe((res)=>{
      this.BASE64 = res[0]
      console.log(this.BASE64);
      this.linkSource = `data:application/pdf;base64,${this.BASE64}`;
      const DownLoadLink = document.createElement("a");
      const FileName = "PaySlip.pdf";
      DownLoadLink.href = this.linkSource ;
      DownLoadLink.download = FileName;
      //DownLoadLink.click();

    },(err)=>{
       console.log(err);
    })
  }




}

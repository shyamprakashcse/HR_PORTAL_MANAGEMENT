import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _EmployeeLoginURL = "http://localhost:3000/api/emplogin";
  private spinner:boolean=false;
  private validAuth:any;
  private token:any="";
  private UserID:string="";
  public LoginUserObject:any;
  private _barrerTokenCheckURL="http://localhost:3000/api/barrer";

  private empprofile = {
    "EMPID": "00000003",
    "OBJECT_TYPE": "P",
    "JOININGDATE": "2020-12-01",
    "LEAVINGDATE": "9999-12-31",
    "EMPLOYEE_STATUS": "3",
    "COMPANY_CODE": "0001",
    "PERSONNEL_AREA": "KT01",
    "EMPLOYEE_GROUP": "1",
    "EMPLOYEE_SUBGROUP": "AH",
    "CONTROLLING_AREA": "0001",
    "ORGANIZATION_UNIT": "50000074",
    "ORGANIZATION_TEXT": "HCM Practice",
    "DESIGNATION_UNIT": "50000077",
    "EMP_DESIGNATION": "Consultant",
    "ADDRESS_UNIT": "1",
    "EMPLOYEE_NAME": "Arjun Raj",
    "LAST_NAME": "Raj",
    "FIRST_NAME": "Arjun",
    "EMPLOYEE_DOB": "1999-07-18",
    "EMPLOYEE_COUNTRY": "IN",
    "EMPLOYEE_CITY": "Chennai",
    "EMPLOYEE_POSTALCODE": "600113",
    "STREET_NAME": "Perumal Koil St",
    "TELEPHONE_NO": "9987678765"
}

private empleave = [
  {
      "PERNR": [
          "00000003"
      ],
      "BEGDAT": [
          "2021-01-07"
      ],
      "ENDDAT": [
          "2021-01-11"
      ],
      "ABSDAYS": [
          "4.00"
      ],
      "REASON": [
          "PERSONAL LEAVE"
      ],
      "ABSYEAR": [
          "2021"
      ],
      "ABSMONTH": [
          "01"
      ],
      "ABSENCETYPE": [
          "PL"
      ],
      "ABSENCETYPTXT": [
          "PERSONAL LEAVE"
      ]
  },
  {
      "PERNR": [
          "00000003"
      ],
      "BEGDAT": [
          "2021-01-29"
      ],
      "ENDDAT": [
          "2021-01-30"
      ],
      "ABSDAYS": [
          "2.00"
      ],
      "REASON": [
          "SUFFERING FROM SICK . NEED A MEDICAL TREATMENT ."
      ],
      "ABSYEAR": [
          "2021"
      ],
      "ABSMONTH": [
          "01"
      ],
      "ABSENCETYPE": [
          "ML"
      ],
      "ABSENCETYPTXT": [
          "MEDICAL LEAVE"
      ]
  }
]

private empleavegraph = [
  {
      "LEAVE_YEAR": "",
      "LEAVE_MONTH": "",
      "MONTH_NAME": "",
      "NO_OF_DAYS": "0"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "01",
      "MONTH_NAME": "JANUARY",
      "NO_OF_DAYS": "2.00"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "02",
      "MONTH_NAME": "FEBURAURY",
      "NO_OF_DAYS": "0"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "03",
      "MONTH_NAME": "MARCH",
      "NO_OF_DAYS": "1.00"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "04",
      "MONTH_NAME": "APRIL",
      "NO_OF_DAYS": "2.00"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "05",
      "MONTH_NAME": "MAY",
      "NO_OF_DAYS": "0"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "06",
      "MONTH_NAME": "JUNE",
      "NO_OF_DAYS": "6.00"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "07",
      "MONTH_NAME": "JULY",
      "NO_OF_DAYS": "1.00"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "08",
      "MONTH_NAME": "AUGUST",
      "NO_OF_DAYS": "1.00"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "09",
      "MONTH_NAME": "SEPTEMBER",
      "NO_OF_DAYS": "2.00"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "10",
      "MONTH_NAME": "OCTOBER",
      "NO_OF_DAYS": "0"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "11",
      "MONTH_NAME": "NOVEMBER",
      "NO_OF_DAYS": "0"
  },
  {
      "LEAVE_YEAR": "2021",
      "LEAVE_MONTH": "12",
      "MONTH_NAME": "DECEMBER",
      "NO_OF_DAYS": "6.00"
  }
]


  constructor(private http:HttpClient,private route:Router,private loader:NgxSpinnerService) { }

  async loginUser(loginUserFormData:any){
    this.http.post<any>(this._EmployeeLoginURL,loginUserFormData).subscribe((res)=>{
       this.validAuth = true
       this.UserID = res["USERID"]
       this.token = res["TOKEN"]
       localStorage.setItem('id',this.UserID);
       localStorage.setItem('token',this.token);
       this.loader.hide();
       this.SuccessMessage("Authenticated Successfully");
       this.route.navigate(['/home']);
    },(err)=>{
      this.loader.hide();
      this.validAuth=false
       console.log(err)
       if(err.status === 404)
       this.ErrorMessage("UnAuthorized User . Please Enter a valid Credentials")
       else
       this.ErrorMessage("Internal Server Error");

       this.route.navigate(['/login']);
       return false;

    })
  }



  ErrorMessage(Text:any){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: Text,

    })

  }

  SuccessMessage(Text:any){
    Swal.fire({
      icon: 'success',
      title: 'Successful',
      text: Text,

    })

  }


  getSpinnerValue()
  {
    return this.spinner;
  }
  setSpinnerValue(value:boolean)
  {
    this.spinner=value;

    console.log(this.spinner)
  }

  async checkBarrerToken()
  {
    this.http.get<any>(this._barrerTokenCheckURL).subscribe((res)=>{
     return true;
   },(err)=>{
     this.route.navigate(['/login']);
     return false;
   })
  }

  getTokenFromLocalStorage()
  {
    return localStorage.getItem('token');
  }

  deleteLocalStorage()
  {
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
  logout()
  {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }



}

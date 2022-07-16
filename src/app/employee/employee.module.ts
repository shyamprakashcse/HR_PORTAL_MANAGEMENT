import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { LeaveComponent } from './leave/leave.component';
import { LeavegraphComponent } from './leavegraph/leavegraph.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorComponent } from './navigator/navigator.component';
import { FormsModule } from '@angular/forms';
import { PayslipComponent } from './payslip/payslip.component';

const route:Routes = [
    {path:'',redirectTo:'home'},
    {path:'home',component:NavigatorComponent},
    {path:'profile',component:ProfileComponent},
    {path:'leave',component:LeaveComponent},
    {path:'lg',component:LeavegraphComponent},
    {path:'payslip',component:PayslipComponent}
]

@NgModule({
  declarations: [
    ProfileComponent,
    LeaveComponent,
    LeavegraphComponent,
    NavigatorComponent,
    PayslipComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild(route)
  ]
})
export class EmployeeModule {
  constructor(){
    console.log("Employee Module")
  }
}

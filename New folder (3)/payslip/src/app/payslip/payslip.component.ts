import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PayslipServerService } from '../payslip-server.service';
import { Subject } from 'rxjs';
import{getset} from '../getset'
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit, OnDestroy, AfterViewInit  {
  @ViewChild('myTable') myTable1: any;
  data: any;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();
  year: any;
  month: any;
  public date: any;
  myId='Element'
  id: any;
  hide:boolean
  show:boolean
  datas: Object;
  detail: any;
  Employee_id: any;
  Employee_Name: any;
  Gender: any;
  PAN: any;
  Location: any;
  Designation: any;
  Date_of_Joining: any;
  Bank_AC_Number: any;
  LOP: any;
  Basic: any;
  HRA: any;
  Other_allowance: any;
  Salary: any;
  arr:any=[]
  Conveyance: any;

  displayedColumns: string[] = ['id', 'name', 'select', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private server:PayslipServerService, private router:Router) {
    this.id=getset.rowdata()
    console.log(getset.rowdata());
    this.hide=false
    this.show=true
   }

  ngOnInit(): void {


    this.getEmpData()
  }

  ngOnDestroy(): void {
    // dtTrigger.unsubscribe();
  }

  getEmpData(){
    this.server.getEmpDetail().subscribe((result:any)=>{
      console.log(result);
      
   this.dataSource = new MatTableDataSource(result);
  this.dataSource.paginator=this.paginator
  this.dataSource.sort=this.sort
  // dtTrigger.next();
    })
  }
  ngAfterViewInit() {
    // if (this.myTable1 && this.myTable1.nativeElement) {
    //   this.myTable1.nativeElement.print();
    // }
  }
  print(emp: any,date: any){
    console.log(emp);
    
    // this.hide=true
    // this.show=false
    
    var splitDate=date.split("-")
   this.year=splitDate[0]
   this.month=new Date(date).toLocaleString('en-US', {month: 'long'})
      var data={
        Employee_id:emp.Employee_id,
        // Employee_Name:emp.Employee_Name,
        Month:this.month,
        Year: this.year
      }
      console.log(data);
      this.server.getPayslipDetail(data).subscribe((result)=>{
        console.log(result);
        var obj=JSON.parse(JSON.stringify(result))
        // console.log(obj);
        
        if (obj!=null) {
          this.detail=obj.Result[0]
          console.log(this.detail);

          if (this.detail.Employee_id!=undefined) {
            this.Employee_id=this.detail.Employee_id
          }
          if (this.detail.Employee_Name!=undefined ) {
            this.Employee_Name=this.detail.Employee_Name
          }
          if (this.detail.Gender!=undefined) {
            this.Gender=this.detail.Gender
          }
          if (this.detail.PAN!=undefined) {
            this.PAN=this.detail.PAN
          }
          if (this.detail.Location!=undefined) {
            Location=this.detail.Location
          }
          if (this.detail.Designation!=undefined) {
            this.Designation=this.detail.Designation
          }
          if (this.detail.Date_of_Joining!=undefined) {
            this.Date_of_Joining=this.detail.Date_of_Joining
          }
          if (this.detail.Bank_AC_Number!=undefined) {
            this.Bank_AC_Number=this.detail.Bank_AC_Number
          }
          if (this.detail.LOP!=undefined) {
            this.LOP=this.detail.LOP
          }
          if (this.detail.Basic!=undefined) {
            this.Basic=this.detail.Basic
          }
          if (this.detail.HRA!=undefined) {
            this.HRA=this.detail.HRA
          }
          if (this.detail.Conveyance!=undefined) {
            this.Conveyance=this.detail.Conveyance
          }
          if (this.detail.Other_allowance!=undefined) {
            this.Other_allowance=this.detail.Other_allowance
          }
          if (this.detail.Salary!=undefined) {
            this.Salary=this.detail.Salary
          }
           this.arr.push({
            Employee_id:this.Employee_id,
            Employee_Name:this.Employee_Name,
            PAN:this.PAN,
            Gender:this.Gender,
            Location:this.Location,
            Designation:this.Designation,
            Date_of_Joining:this.Date_of_Joining,
            Bank_AC_Number:this.Bank_AC_Number,
            LOP:this.LOP,
            Basic:this.Basic,
            HRA:this.HRA,
            Conveyance:this.Conveyance,
            Other_allowance:this.Other_allowance,
            Salary:this.Salary,
            Company_Name:this.detail.Company_Name,
            Month:this.detail.Month,
            Year:this.detail.Year,
            Total_Detuctions:this.detail.Total_Detuctions
           })
           console.log(this.arr);
           
          getset.setPayslip(this.arr)
this.router.navigateByUrl("print")
        }
        // const printContents = document.getElementById(myId).innerHTML;
        // const originalContents = document.body.innerHTML;
      
        // document.body.innerHTML = printContents;
      
        // window.print();
      
        // document.body.innerHTML = originalContents;
        
      })
    
  //  
  // }
  // else{
  //   alert("something went wrong")
  // }
// }
      // if (myTable1) {
        
      // myTable1.nativeElement.print();
      // }
      // console.log(myTable1);
      

    //   const printContents = document.getElementById(divName).innerHTML;
    //  const originalContents = document.body.innerHTML;
    //  document.body.innerHTML = printContents;
    //  window.print();
    //  document.body.innerHTML = originalContents;
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

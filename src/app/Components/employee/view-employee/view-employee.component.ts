import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  employeeId: any;
  employeeDetail : any= [];
   
  constructor(private route: ActivatedRoute, private httpProvider : EmployeeService) { }
  
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];      
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {       
    this.httpProvider.getEmployee(this.employeeId).subscribe(
      {
        next : (data : any) => {      
          if (data != null ) {
            var resultData = data;
            if (resultData && resultData.data) {
              this.employeeDetail = resultData.data;
            }
          }
        },
        error: (error :any)=> { }
      }
    ); 
  }

}

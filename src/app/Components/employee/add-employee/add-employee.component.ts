import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { employee } from 'src/app/Models/employee';
//import { HttpProviderService } from '../service/http-provider.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employee = new employee();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  AddEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.addEmployee(this.addEmployeeForm).subscribe(
        {
          next: async data => {
              if (data != null && data.data != null) {
                var resultData = data;
                if (resultData != null && resultData.isSuccess) {
                  this.toastr.success(resultData.message);
                  setTimeout(() => {
                    this.router.navigate(['/employee']);
                  }, 500);
                }
              }
            
          },
          error:async error => {
              this.toastr.error(error.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
      });
    }
  }

}


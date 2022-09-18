import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: employee = new employee();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: EmployeeService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {
    this.httpProvider.getEmployee(this.employeeId).subscribe(
      { next : 
      (data: any) => {
      if (data != null && data.data != null) {
        var resultData = data.data;
        if (resultData) {
          this.editEmployeeForm.Id = resultData.id;
          this.editEmployeeForm.FirstName = resultData.firstName;
          this.editEmployeeForm.LastName = resultData.lastName;
          this.editEmployeeForm.Email = resultData.email;
          this.editEmployeeForm.Address = resultData.address;
          this.editEmployeeForm.Phone = resultData.phone;
        }
      }
    },
      error : (error: any) => { }
    })
  }

  EditEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.editEmployee(this.editEmployeeForm).subscribe( 
        {next : async data => {
        if (data != null) {
          var resultData = data;

            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/employee']);
              }, 500);
            }
          
        }
      },
       error : async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      });
    }
  }
}

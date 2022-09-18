import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/_services/employee.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class employeesComponent implements OnInit {
  closeResult = '';
  employeeList: any = [];
  isLoggedIn = false;
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : EmployeeService,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if(!this.isLoggedIn){
      window.location.replace('/login')
    }
    
    this.getAllEmployee();
  }

  async getAllEmployee() {
    this.httpProvider.getEmployees().subscribe(
      {
        next: (data : any) => {
          if (data != null) {
            var resultData = data;
            if (resultData) {
              console.log(resultData);
              this.employeeList = resultData;
            }
          }
        },
        error: (error : any)=> {
          if (error) {
            if (error.status == 404) {
              if(error.error && error.error.message){
                this.employeeList = [];
              }
            }
          }
        }
      });
      
      
      
      

  }

  AddEmployee() {
    this.router.navigate(['employee/Add']);
  }

  deleteEmployeeConfirmation(employee: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteEmployee(employee);
      },
        (reason) => {});
  }

  deleteEmployee(employee: any) {
    this.httpProvider.deleteEmployee(employee.id).subscribe( 
      {next : (data : any) => {
      if (data != null) {
        var resultData = data;
        if (resultData != null && resultData.isSuccess) {
          this.toastr.success(resultData.message);
          this.getAllEmployee();
        }
      }
    },
    error : (error : any) => {}});
  }
}
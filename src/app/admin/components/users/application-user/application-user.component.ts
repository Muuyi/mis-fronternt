import { Component, OnInit } from '@angular/core';
import { AdministratorsService, ApplicationUserService } from 'src/app/shared/employees.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application-user',
  templateUrl: './application-user.component.html',
  styleUrls: ['./application-user.component.scss']
})
export class ApplicationUserComponent implements OnInit {
  closeResult : string;

  constructor(public userService : ApplicationUserService,private modalService: NgbModal,private toastr : ToastrService) { }

  ngOnInit() {
    this.userService.formModel.reset();
  }
  //SUBMIT FORM
  onSubmit(){
    this.userService.register().subscribe(
      (res : any) => {
        if(res.succeeded){
          this.toastr.success('Record inserted successfully','User registration');
          this.userService.formModel.reset();
        }else{
          res.errors.forEach(element => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('Username already taked','User registration');
                break;
              default:
                  this.toastr.error(element.description,'User registration');
                  break;
            }
          });
        }
      },
      err => {
        console.log(err)
      }
    );
  }
   //EDIT AND ADD DATA OPEN MODAL WINDOW
   openModal(content,id,index) {
    if(id == null){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{

    }
      
  }
  //DISMISS MODAL WINDOW
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

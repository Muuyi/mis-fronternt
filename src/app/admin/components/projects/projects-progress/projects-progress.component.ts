import { Component, OnInit } from '@angular/core';
import { ProjectsProgress } from 'src/app/shared/employees.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsProgressService, ProjectsService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-projects-progress',
  templateUrl: './projects-progress.component.html',
  styleUrls: ['./projects-progress.component.scss']
})
export class ProjectsProgressComponent implements OnInit {
  formData : ProjectsProgress;
  closeResult : string;
  constructor(private projectsProgressService : ProjectsProgressService,private toastr : ToastrService,private modalService: NgbModal,private projectsService : ProjectsService ) { }

  ngOnInit() {
    //RESET FORM
    this.resetForm();
    //PROJECTS SERVICE
    this.projectsService.getProjects();
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.formData = {
      Id : null,
      ProjectsId:null,
      Comments:'',
      Metric:null,
      CreatedDate:null,
    }
  }
  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){ 
    this.projectsProgressService.postProjectsProgress(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Projects Progress addition');
      this.projectsProgressService.getProjectsProgress();
      this.resetForm(form);
    })
  }
  //POPULATE EMPLOYEES RECORDS
  populateEmployeesForm(content){
    this.formData = Object.assign({});
    // console.log(this.employeeService.formData);
    this.openModal(content);
  }
  //EDIT AND ADD DATA OPEN MODAL WINDOW
  openModal(content) {
    // if(index == null){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
     
    // }else{
    //   this.getEmployeeData = index;
    //   this.modalService.open(content);
    //   console.log(this.employeeService.formData);
    // }
      
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
  //DELETE EMPLOYEES
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.projectsProgressService.deleteProjectsProgress(id).subscribe(res=>{
        this.projectsProgressService.getProjectsProgress();
        this.toastr.warning('Record deleted successfully!!','Projects Progres Delete');
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProjectsProgress } from 'src/app/shared/employees.model';
import { NgForm,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsProgressService, ProjectsService } from 'src/app/shared/employees.service';
import {MatSliderModule} from '@angular/material/slider';


import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-projects-progress',
  templateUrl: './projects-progress.component.html',
  styleUrls: ['./projects-progress.component.scss']
})
export class ProjectsProgressComponent implements OnInit {
  formData : ProjectsProgress;
  closeResult : string;
  constructor(private projectsProgressService : ProjectsProgressService,private toastr : ToastrService,private modalService: NgbModal,private projectsService : ProjectsService, private fb : FormBuilder,private http : HttpClient ) { }
  progressForm = this.fb.group({
    Id : [0],
    Comments : [''],
    Metric : [''],
    ProjectsId : ['']
  })
  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    //PROJECTS SERVICE
    this.projectsService.getProjects();
    this.projectsProgressService.getProjectsProgress();
  }
  // //RESET FORM
  // resetForm(form? : NgForm){
  //   if( form != null)
  //     form.resetForm();
  //   this.formData = {
  //     Id : null,
  //     ProjectsId:null,
  //     Comments:'',
  //     Metric:null,
  //     CreatedDate:null,
  //   }
  // }
  //SUBMIT FORM DATA
  onSubmit(){
    this.insertRecord();
  }
  insertRecord(){ 
    var id 
    if(this.progressForm.value.Id == null){
      id = 0;
    }else{
      id = this.progressForm.value.Id
    }
    var body = {
      Id : id,
      Comments : this.progressForm.value.Comments,
      Metric : this.progressForm.value.Metric,
      ProjectsId : this.progressForm.value.ProjectsId 
    }
    if(this.progressForm.value.Id > 0){
      this.http.put(environment.rootApi+'/projectsProgress/'+this.progressForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Projects Progress Records');
        this.projectsProgressService.getProjectsProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.post(environment.rootApi+'/projectsProgress',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Projects Progress Records');
        this.projectsProgressService.getProjectsProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      })
    }
  }
  //SLIDER LABEL
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1) {
      return Math.round(value / 1) + '%';
    }
    return value;
  }
  //POPULATE PROJECTS MODAL
  editData(content,proj){
    this.progressForm.setValue({
      Id : proj.id,
      Comments : proj.comments,
      Metric : proj.metric,
      ProjectsId : proj.projectsId 
    })
    this.openModal(content);
  }
  //POPULATE EMPLOYEES RECORDS
  populateEmployeesForm(content){
    this.formData = Object.assign({});
    // console.log(this.employeeService.formData);
    this.openModal(content);
  }
  //EDIT AND ADD DATA OPEN MODAL WINDOW
  openModal(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });   
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
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'SERIAL NO',style:'tableHeader'},{text:'PROJECT NAME',style:'tableHeader'},{text:'PROGRESS',style:'tableHeader'},{text:'COMMENTS',style:'tableHeader'},{text:'DATE POSTED',style:'tableHeader'}]
    ]
    var projectList = this.projectsProgressService.projectsProgressList;
    projectList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.projects.projectName,key.metric+'%',key.description,key.createdDate]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'PROJECTS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 'auto', 'auto','auto', 'auto','auto'],
  
            body: tableData
          }
        }
      ],
      styles:{
        header:{
          fontSize:15,
          bold:true,
          alignment:'center'
        },
        tableHeader:{
          bold:true,
          alignment:'center',
          fontSize:15
        }
      }
    };
  pdfMake.createPdf(dd).download('ProjectsReport.pdf');
  }
}

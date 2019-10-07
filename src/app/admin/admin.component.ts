import { Component, OnInit } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ApplicationUserService } from '../shared/employees.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userDetails;
  imageUrl : string = "assets/images/profile.png";
  constructor(private router : Router, private userService : ApplicationUserService) { }

  ngOnInit() {
    $(document).ready(function(){
      //ADMIN WINDOW MENU BAR STYLING
        // "node_modules/intl-tel-input/build/css/intlTelInput.css",
        // "node_modules/intl-tel-input/build/js/intlTelInput.min.js",
      var headerHeight = $("#admin-header").height();
      $("#side-nav").css({"position":"fixed","top":headerHeight});
      
      var profileHeight = $("#user-profile").height();
      $("#navigation-body").css({"position":"relative","top":profileHeight});

      //Getting screen size
      $("#menu li:has(ul)").click(function(e){
        e.preventDefault();
        if($(this).hasClass("active")){
          $(this).removeClass("active");
          $(this).children("ul").slideUp();
        }else{
          $("#menu li ul").slideUp();
          $("#menu li").removeClass("active");
          $(this).addClass("active");
          $(this).children("ul").slideDown();
        }
      })
      //DISPLAYING ADMIN CONTENT
      //Profile width
      var sideNavWidth = $("#side-nav").width(); 
      $("#content-section").css({"margin-top":headerHeight,"margin-left":sideNavWidth}) 
    })
    //GET USER DATA
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err)
      }
    )    
  }
  //LOGOUT METHOD
  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

}

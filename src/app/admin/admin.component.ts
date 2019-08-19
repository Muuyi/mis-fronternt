import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      //ADMIN WINDOW MENU BAR STYLING
      var headerHeight = $("#admin-header").height();
      $("#side-nav").css({"position":"fixed","top":headerHeight});
      
      var profileHeight = $("#user-profile").height();
      $("#navigation-body").css({"position":"relative","top":profileHeight});

      //Getting screen size
      var windowHeight = $(window).height();
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
    })
  }

}

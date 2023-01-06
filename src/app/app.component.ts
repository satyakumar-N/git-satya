import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { WebapiService } from 'src/app/shared/webapi.services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = environment.isMultiColorActive;
  constructor(private langService: LangService,
    private renderer: Renderer2,
    private Service:WebapiService
  ) {
//
  }

  ngOnInit(): void {
    this.langService.init();
    this.token();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }

  token(){
    this.Service.Token().then((r:any)=>{
      localStorage.setItem('Blockchain_Token',r);
    })
   }
}

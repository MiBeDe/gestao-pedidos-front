import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { customTemplateBaseDrawerImports } from './custom-template-base-drawer.imports';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-template-base-drawer',
  imports: [...customTemplateBaseDrawerImports, ReactiveFormsModule],
  templateUrl: './custom-template-base-drawer.component.html',
  styleUrl: './custom-template-base-drawer.component.scss',
})
export class CustomTemplateBaseDrawerComponent implements OnInit {
  private router = inject(Router); 

  srcImg: string = '';
  expanded = signal<boolean>(true);
  fullScreenType = signal<boolean>(false);
  pathName = signal<string>('');
  
  ngOnInit(): void {
   this.srcImg = environment.srcImgs;

   this.pathName.set(this.router.url.split('/')[1]);
  }

  changeFullScreen(){

    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen()
      this.fullScreenType.set(true);
    }else if (document.exitFullscreen) {
      document.exitFullscreen();
      this.fullScreenType.set(false);
    }
  }

  logout(){

    this.router.navigateByUrl('/login');
  }

}

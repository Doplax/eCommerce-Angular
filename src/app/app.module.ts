import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }from '@angular/common/http';
import { register } from 'swiper/element/bundle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { NavComponent } from './components/nav/nav.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { TimeInterceptor } from './interceptors/time.interceptor';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


register();

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    ImgComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:TimeInterceptor, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

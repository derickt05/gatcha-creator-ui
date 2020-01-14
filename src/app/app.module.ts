import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// npm custom installations //
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { CreatorComponent } from './creator/creator.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageSelectorComponent,
    CreatorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

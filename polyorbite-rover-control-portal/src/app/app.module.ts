import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { VideoStreamSwitchComponent } from './video-stream-switch/video-stream-switch.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RoverStateComponent } from './rover-state/rover-state.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoStreamComponent,
    VideoStreamSwitchComponent,
    RoverStateComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

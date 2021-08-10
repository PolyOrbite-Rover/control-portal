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
import { InterestPointsComponent } from './interest-point/component/list/interest-points.component';
import { PhotographInterestPointDetailsComponent } from './interest-point/component/details/photograph/photograph-interest-point-details.component';
import { InterestPointDetailsComponent } from './interest-point/component/details/base/interest-point-details.component';
import { EditableTextComponent } from './editable-text/editable-text.component';
import { GpsDataVisualizerComponent } from './gps/gps-data-visualizer/gps-data-visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoStreamComponent,
    VideoStreamSwitchComponent,
    RoverStateComponent,
    MapComponent,
    InterestPointsComponent,
    PhotographInterestPointDetailsComponent,
    InterestPointDetailsComponent,
    EditableTextComponent,
    GpsDataVisualizerComponent,
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

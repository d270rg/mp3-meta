import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataViewerComponent } from './dataViewer-component/dataViewer.component';
import { UploadComponent } from './upload-component/upload.component';

@NgModule({
  declarations: [AppComponent, UploadComponent, DataViewerComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    BrowserModule,
    AppRoutingModule,
    NgModule,

    // HttpClientModule,
    // EffectsModule.forRoot([TodoListEffects]),
    // StoreModule.forRoot(combinedRootReducer),
    // StoreModule.forFeature('todoList', todoListReducer),
    // StoreModule.forFeature('modal', modalReducer),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

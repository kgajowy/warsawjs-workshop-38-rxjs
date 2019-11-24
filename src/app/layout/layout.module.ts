import {LayoutModule as MatLayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {MainNavComponent} from './main-nav/main-nav.component';

const DECLARATIONS = [MainNavComponent];
const EXPORTS = [DECLARATIONS];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule
  ],
  declarations: [DECLARATIONS],
  exports: [EXPORTS]
})
export class LayoutModule {
}

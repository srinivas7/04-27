import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { TripsComponent } from './trips/trips.component';
import { EventDetailsComponent } from './event-details/event-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  { path: 'customer', component: CustomerComponent },
  { path: 'trips/:userId', component: TripsComponent },
  { path: 'event-detail', component: EventDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

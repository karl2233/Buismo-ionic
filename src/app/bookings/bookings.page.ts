import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  loadedBookings:Booking[];
  private bookingSub:Subscription;

  constructor(private bookingService:BookingService,private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings=>{
      this.loadedBookings = bookings;
    })
  }

  onCancelBooking(bookingId:string,slidingEl:IonItemSliding){
    slidingEl.close();
    this.loadingCtrl.create({message:'Cancelling...'}).then(loadingEl=>{
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(()=>{
        loadingEl.dismiss();
      })
    })
  }

  ngOnDestoy(){////???????
   if(this.bookingSub){
     this.bookingSub.unsubscribe();
   }
  }

}

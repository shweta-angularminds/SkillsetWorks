import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  notifyMessage(type: 'success' | 'error' | 'warning' | 'info' | 'question', message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: type,
      title: message,
    });
  }

  confirmDelete():Observable<any>{
     const confirmSubject = new Subject<any>(); 

     Swal.fire({
       title: 'Are you sure?',
       text: "You won't be able to revert this!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete it!',
     }).then((result) => {
     
       confirmSubject.next(result); 
       confirmSubject.complete(); 
     });

     return confirmSubject.asObservable();
  }
}

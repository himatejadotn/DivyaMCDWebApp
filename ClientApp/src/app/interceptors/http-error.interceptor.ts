import { HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpResponse,
    HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
constructor(public toasterService: ToastrService,private spinner: NgxSpinnerService,) {}
intercept(req: HttpRequest<any>, next: HttpHandler):
Observable<HttpEvent<any>> {
     return next.handle(req).pipe(
    tap(evt => {
      if (evt instanceof HttpResponse) {
          if(evt.body && evt.body.success)
              this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
      }
  }),
   catchError( (error: HttpErrorResponse) => {
        let errMsg = '';
        // Client Side Error
        // if (error.status==404) {
        //   this.toasterService.error(`Error 404: ${error.error.message}`, 'An error occurred');
        //   errMsg = `Error: ${error.error.message}`;
        //   console.log(errMsg)
        //   this.spinner.show();
        // } else 
        if (error.status==401){
          this.toasterService.error(`${error.error.message}`, 'An error occurred');
          errMsg = `Error: ${error.error.message}`;
          this.spinner.show();
        }else if (error.status==500){
          this.toasterService.error(`${error.error.message}`, 'An error occurred');
          errMsg = `Error: ${error.error.message}`;
          this.spinner.show();
        }else if (error.status==503){
          this.toasterService.error(`${error.error.message}`, 'An error occurred');
          errMsg = `Error: ${error.error.message}`;
          this.spinner.show();
        }
        else{  // Server Side Error
            errMsg = `Message: ${error.error.message}`;
            console.log(errMsg);
        }
        return throwError(errMsg);
    })
  )}
}

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PassportUsecase} from '../../routes/passport/authentication/_usecase/passport.usecase';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private passportUsecase: PassportUsecase) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.passportUsecase.logout();
                    location.reload();
                }
                return throwError(error);
            })
        );
    }
}

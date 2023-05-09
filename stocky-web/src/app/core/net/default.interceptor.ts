import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponseBase,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient, ALAIN_I18N_TOKEN, IGNORE_BASE_URL } from '@delon/theme';
import { environment } from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
    BehaviorSubject,
    catchError,
    filter,
    mergeMap,
    Observable,
    of,
    switchMap,
    take,
    throwError,
} from 'rxjs';

const CODEMESSAGE: { [key: number]: string } = {
    200: 'The server successfully returned the requested data. ',
    201: 'Create or modify data successfully. ',
    202: 'A request has been queued in the background (asynchronous task). ',
    204: 'Delete data successfully. ',
    400: 'There was an error in the request sent, and the server did not create or modify data. ',
    401: 'User does not have permission (wrong token, username, password). ',
    403: 'The user is authorized, but access is forbidden. ',
    404: 'The request was made for a record that does not exist, and the server did not operate. ',
    406: 'The requested format is not available. ',
    410: 'The requested resource has been permanently deleted and will no longer be available. ',
    422: 'A validation error occurred while creating an object. ',
    500: 'An error occurred on the server, please check the server. ',
    502: 'Bad gateway. ',
    503: 'The service is unavailable, the server is temporarily overloaded or under maintenance. ',
    504: 'Gateway timed out.',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    private refreshTokenEnabled = environment.api.refreshTokenEnabled;
    private refreshTokenType: 're-request' | 'auth-refresh' =
        environment.api.refreshTokenType;
    private refreshToking = false;
    private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(private injector: Injector) {
        if (this.refreshTokenType === 'auth-refresh') {
            this.buildAuthRefresh();
        }
    }

    private get notification(): NzNotificationService {
        return this.injector.get(NzNotificationService);
    }

    private get tokenSrv(): ITokenService {
        return this.injector.get(DA_SERVICE_TOKEN);
    }

    private get http(): _HttpClient {
        return this.injector.get(_HttpClient);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // 统一加上服务端前缀
        let url = req.url;
        if (
            !req.context.get(IGNORE_BASE_URL) &&
            !url.startsWith('https://') &&
            !url.startsWith('http://')
        ) {
            const { baseUrl } = environment.api;
            url =
                baseUrl +
                (baseUrl.endsWith('/') && url.startsWith('/')
                    ? url.substring(1)
                    : url);
        }

        const newReq = req.clone({
            url,
            setHeaders: this.getAdditionalHeaders(req.headers),
        });
        return next.handle(newReq).pipe(
            mergeMap((ev) => {
                // 允许统一对请求错误处理
                if (ev instanceof HttpResponseBase) {
                    return this.handleData(ev, newReq, next);
                }
                // 若一切都正常，则后续操作
                return of(ev);
            })
            // catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next))
        );
    }

    private goTo(url: string): void {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }

    private checkStatus(ev: HttpResponseBase): void {
        if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
            return;
        }

        const errortext = CODEMESSAGE[ev.status] || ev.statusText;
        this.notification.error(
            `Wrong request ${ev.status}: ${ev.url}`,
            errortext
        );
    }

    // #region 刷新Token方式一：使用 401 重新刷新 Token

    /**
     * 刷新 Token 请求
     */
    private refreshTokenRequest(): Observable<any> {
        const model = this.tokenSrv.get();
        return this.http.post(`/api/auth/refresh`, null, null, {
            headers: { refresh_token: model?.['refresh_token'] || '' },
        });
    }

    private tryRefreshToken(
        ev: HttpResponseBase,
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<any> {
        // 1、若请求为刷新Token请求，表示来自刷新Token可以直接跳转登录页
        if ([`/api/auth/refresh`].some((url) => req.url.includes(url))) {
            this.toLogin();
            return throwError(() => ev);
        }
        // 2、如果 `refreshToking` 为 `true` 表示已经在请求刷新 Token 中，后续所有请求转入等待状态，直至结果返回后再重新发起请求
        if (this.refreshToking) {
            return this.refreshToken$.pipe(
                filter((v) => !!v),
                take(1),
                switchMap(() => next.handle(this.reAttachToken(req)))
            );
        }
        // 3、尝试调用刷新 Token
        this.refreshToking = true;
        this.refreshToken$.next(null);

        return this.refreshTokenRequest().pipe(
            switchMap((res) => {
                // 通知后续请求继续执行
                this.refreshToking = false;
                this.refreshToken$.next(res);
                // 重新保存新 token
                this.tokenSrv.set(res);
                // 重新发起请求
                return next.handle(this.reAttachToken(req));
            }),
            catchError((err) => {
                this.refreshToking = false;
                this.toLogin();
                return throwError(() => err);
            })
        );
    }

    // #endregion

    // #region 刷新Token方式二：使用 `@delon/auth` 的 `refresh` 接口

    /**
     * 重新附加新 Token 信息
     *
     * > 由于已经发起的请求，不会再走一遍 `@delon/auth` 因此需要结合业务情况重新附加新的 Token
     */
    private reAttachToken(req: HttpRequest<any>): HttpRequest<any> {
        // 以下示例是以 NG-ALAIN 默认使用 `SimpleInterceptor`
        const token = this.tokenSrv.get()?.token;
        return req.clone({
            setHeaders: {
                token: `Bearer ${token}`,
            },
        });
    }

    // #endregion

    private buildAuthRefresh(): void {
        if (!this.refreshTokenEnabled) {
            return;
        }
        this.tokenSrv.refresh
            .pipe(
                filter(() => !this.refreshToking),
                switchMap((res) => {
                    console.log(res);
                    this.refreshToking = true; // here
                    return this.refreshTokenRequest();
                })
            )
            .subscribe({
                next: (res) => {
                    // TODO: Mock expired value
                    res.expired = +new Date() + 1000 * 60 * 5;
                    this.refreshToking = false;
                    this.tokenSrv.set(res);
                },
                error: () => this.toLogin(),
            });
    }

    private toLogin(): void {
        this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        this.goTo(this.tokenSrv.login_url!);
    }

    private handleData(
        ev: HttpResponseBase,
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<any> {
        this.checkStatus(ev);
        // 业务处理：一些通用操作
        switch (ev.status) {
            case 200:
                // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
                // 例如响应内容：
                //  错误内容：{ status: 1, msg: '非法参数' }
                //  正确内容：{ status: 0, response: {  } }
                // 则以下代码片断可直接适用
                // if (ev instanceof HttpResponse) {
                //   const body = ev.body;
                //   if (body && body.status !== 0) {
                //     const customError = req.context.get(CUSTOM_ERROR);
                //     if (customError) this.injector.get(NzMessageService).error(body.msg);
                //     // 注意：这里如果继续抛出错误会被行258的 catchError 二次拦截，导致外部实现的 Pipe、subscribe 操作被中断，例如：this.http.get('/').subscribe() 不会触发
                //     // 如果你希望外部实现，需要手动移除行259
                //     return if (customError) throwError({}) : of({});
                //   } else {
                //     // 返回原始返回体
                //     if (req.context.get(RAW_BODY) || ev.body instanceof Blob) {
                //        return of(ev);
                //     }
                //     // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
                //     return of(new HttpResponse(Object.assign(ev, { body: body.response })));
                //     // 或者依然保持完整的格式
                //     return of(ev);
                //   }
                // }
                break;
            case 401:
                if (
                    this.refreshTokenEnabled &&
                    this.refreshTokenType === 're-request'
                ) {
                    return this.tryRefreshToken(ev, req, next);
                }
                this.toLogin();
                break;
            case 403:
            case 404:
            case 500:
                // this.goTo(`/exception/${ev.status}?url=${req.urlWithParams}`);
                break;
            default:
                if (ev instanceof HttpErrorResponse) {
                    console.warn(
                        'Unknown errors, most of which are caused by the backend not supporting cross-domain CORS or invalid configuration, please refer to https://ng-alain.com/docs/server Solve cross-domain problems',
                        ev
                    );
                }
                break;
        }
        if (ev instanceof HttpErrorResponse) {
            return throwError(() => ev);
        } else {
            return of(ev);
        }
    }

    private getAdditionalHeaders(headers?: HttpHeaders): {
        [name: string]: string;
    } {
        const res: { [name: string]: string } = {};
        const lang = this.injector.get(ALAIN_I18N_TOKEN).currentLang;
        if (!headers?.has('Accept-Language') && lang) {
            res['Accept-Language'] = lang;
        }

        return res;
    }
}

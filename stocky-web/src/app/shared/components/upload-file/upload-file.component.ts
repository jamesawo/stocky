import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders} from '@angular/common/http';
import {Component, Inject, Input} from '@angular/core';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzUploadFile, NzUploadType} from 'ng-zorro-antd/upload';
import {throwError} from 'rxjs';
import {FileType} from '../../../data/payload/common.enum';
import {UploadComponentInput} from '../../../data/payload/common.interface';
import {UtilService} from '../../utils/util.service';

export type UploadFnProps = {formData: FormData, status?: boolean};

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styles: [
        `
          /* Regular desktop layout */
          .custom-flex {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          /* Mobile layout */
          @media (max-width: 767px) {
            .custom-flex {
              flex-direction: column-reverse;
            }

            .custom-db {
              display: block;
            }

            /* Adjust width of elements to full width */
            .custom-flex > * {
              width: 100%;
            }
          }
        `
    ]
})
export class UploadFileComponent implements UploadComponentInput {

    public isUploading = false;
    public fileList: NzUploadFile[] = [];
    public uploadProgress = 0;

    @Input()
    public maxFileSizeInMB = 10;

    @Input()
    public canDownloadTemplate = false;

    @Input()
    public canUploadMultipleFiles: boolean = false;

    @Input()
    public url: string = '';

    @Input()
    public type: NzUploadType = 'drag';

    @Input()
    public allowedFileTypes: FileType[] = [];

    @Input()
    public onUploadTemplate?: (arg: UploadFnProps) => void;

    constructor(
        private http: HttpClient,
        private msg: NzMessageService,
        private notificationService: NzNotificationService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private util: UtilService
    ) {}

    @Input()
    public onDownloadTemplate: () => void = () => {};

    public beforeUpload = (file: NzUploadFile): boolean => {
        if (!this.onValidateFile(file)) {
            return false;
        }
        this.onAppendFileToList(file);
        return false;
    };

    public handleUpload(): void {
        const formData = this.prepareFormData();

        if (this.onUploadTemplate) {
            this.onUploadTemplate({formData: formData});
            return;
        } else if (this.url) {
            this.onHandleUploadFn(formData);
            return;
        }

        this.msg.error('NO UPLOAD HANDLER PROVIDED');
    }

    private onHandleUploadFn = (formData: FormData) => {
        this.isUploading = true;
        const headers = new HttpHeaders().set('Authorization', this.tokenService.get()?.token!);
        this.http.post<any>(this.url, formData, {
            headers: headers,
            reportProgress: true,
            observe: 'events'
        }).subscribe({
            next: (res) => this.handleSuccess(res),
            error: (err) => this.handleError(err)
        });
    };

    private onAppendFileToList(file: NzUploadFile) {
        if (this.canUploadMultipleFiles) {
            this.fileList = this.fileList.concat(file);
        } else {
            this.fileList = [file];
        }
    }

    private onValidateFile(file: NzUploadFile) {
        let validated = true;

        if (!this.util.isFileExtensionAllowed(file.name, this.allowedFileTypes)) {
            this.msg.error('File type is not allowed', {nzDuration: 5000, nzPauseOnHover: true});
            return false;
        }

        if (!this.util.isFileSizeAllowed(file.size, this.util.toBytes(this.maxFileSizeInMB))) {
            this.msg.error('File size is not allowed', {nzDuration: 5000, nzPauseOnHover: true});
            return false;
        }

        return validated;
    }

    private prepareFormData(): FormData {
        const formData = new FormData();
        if (this.canUploadMultipleFiles) {
            this.fileList.forEach((file: any) => formData.append('files[]', file));
        } else {
            const file: any = this.fileList[0];
            formData.append('file', file);
        }
        return formData;
    }

    private handleSuccess(res: HttpEvent<any>) {
        switch (res.type) {
            case HttpEventType.Sent:
                break;
            case HttpEventType.ResponseHeader:
                break;
            case HttpEventType.UploadProgress:
                this.uploadProgress = Math.round((res.loaded / (res.total ?? 1)) * 100);
                break;
            case HttpEventType.Response:
                if (res.body) {
                    this.msg.success('File Uploaded Successfully');
                } else {
                    this.msg.error('FAILED TO UPLOAD DATA');
                }
                const responseBody = res.body;
                console.log(responseBody);
                setTimeout(() => {
                    this.uploadProgress = 0;
                    this.isUploading = false;
                    this.fileList = [];
                }, 1000);
        }

    }

    private handleError(error: HttpErrorResponse) {
        const defaultErrorMessage: string = 'Uploading failed, please ask for help or try again';
        this.util.handleHttpRequestError(error, {service: this.msg, duration: 5000});
        this.isUploading = false;
        this.uploadProgress = 0;
        this.msg.error(defaultErrorMessage);
        return throwError(error);
    }
}

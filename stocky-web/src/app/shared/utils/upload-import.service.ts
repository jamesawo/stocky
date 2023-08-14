import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {UploadComponentInput} from '../../data/payload/common.interface';
import {UploadFileComponent} from '../components/upload-file/upload-file.component';
import {ResponsiveService} from './responsive.service';

@Injectable({
    providedIn: 'root'
})
export class UploadImportService {

    constructor(
        private drawerService: NzDrawerService,
        private http: HttpClient,
        private responsiveService: ResponsiveService
    ) { }

    public upload(arg: UploadComponentInput, title?: string) {
        return this.drawerService
            .create<UploadFileComponent, UploadComponentInput, UploadFileComponent>({
                nzTitle: title ?? 'Upload Files',
                nzFooter: ' ',
                nzExtra: ' ',
                nzClosable: true,
                nzMaskClosable: false,
                nzWidth: this.getDrawerSize(),
                nzContent: UploadFileComponent,
                nzContentParams: {...arg}
            });
    }

    public download() {}

    private getDrawerSize(): number {
        const value = this.responsiveService.screenWidth$.value;
        return value > 700 ? 720 : 350;
    }
}

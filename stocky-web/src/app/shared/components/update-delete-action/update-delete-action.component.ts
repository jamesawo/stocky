import {Component, Input} from '@angular/core';

export type EditCacheMap<T> = {
    [key: number]: {
        deleting: boolean;
        updating: boolean;
        edit: boolean;
        data: T;
    };
};

export type TableActionProps<T> = {
    saveEditHandler: (item: T) => Promise<void>;
    cancelEditHandler: (item: T) => Promise<void>;
    toggleEditHandler: (item: T) => void;
    cancelDeleteHandler: () => void;
    confirmDeleteHandler: (id: number) => Promise<void>;
    editMap?: EditCacheMap<T>;
};

@Component({
    selector: 'app-update-delete-action',
    templateUrl: './update-delete-action.component.html',
    styles: [],
})
export class UpdateDeleteActionComponent<T> {
    @Input()
    public props!: TableActionProps<T>;

    @Input()
    public item!: any;
}

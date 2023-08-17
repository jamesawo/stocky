import {FormGroup} from '@angular/forms';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {ModalOrDrawer, TableButtonEnum} from './common.enum';

export type CommonInputProps = {
    size?: NzButtonSize,
    title?: string,
    icon?: string,
    showTable?: boolean,
    showForm?: boolean,
}

export type CommonAddProps = {
    showForm?: boolean,
    showTable?: boolean
}

export type FormProps = {
    formGroup: FormGroup;
    controlName: string;
};

export type SearchProps = {
    hasError?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    span?: number;
    showLabel?: boolean;
}

export type PopupViewProps = {
    display: ModalOrDrawer
}

export type TableEditCacheMap<T> = {
    [key: number]: {
        loading: boolean;
        updating: boolean;
        edit: boolean;
        data: T;
    };
};

export type TableActionProps<T> = {
    saveEditHandler: (item: T) => Promise<void>;
    cancelEditHandler: (item: T) => Promise<void>;
    toggleEditHandler: (item: T) => void;
    editMap?: TableEditCacheMap<T>;
    cancelDeleteHandler?: () => void;
    confirmDeleteHandler?: (id: number) => Promise<void>;
    cancelToggleStatusHandler?: () => void;
    confirmToggleStatusHandler?: (id: number) => Promise<void>;

};

export type TableActionButtons = TableButtonEnum;

export type SearchResetButtonProps = {
    isLoadingSearchResult?: boolean;
    onResetAction?: () => void;
    onSearchAction?: () => void;
    onCancelAction?: () => void;
    hideSearchBtn?: boolean;
}

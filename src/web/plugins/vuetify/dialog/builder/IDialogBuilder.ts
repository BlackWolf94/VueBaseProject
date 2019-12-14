export interface IDialogButtons {
    text?: string;
    icon?: string;
    color?: string;
    action?(): any;
}

export interface IDialogTitle {
    text?: string;
    color?: string;
    icon?: string;
}

export interface IDialogProperty {
    componentProps?: any;
    text(): string;
    title(): IDialogTitle;
    component(): any;
    buttons(): IDialogButtons[];
}

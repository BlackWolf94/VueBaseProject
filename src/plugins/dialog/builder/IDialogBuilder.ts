import {Component} from 'vue';

/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */

export interface TDialogButtons {
    text?: string;
    icon?: string;
    color?: string;
    actions?: () => any;
}

export interface TDialogTitle {
    text?: string;
    color?: string;
    icon?: string;
}

export interface TDialogProperty {
    text: () => string;
    title: () => TDialogTitle;
    component: () => Component | null;
    componentProps?: any;
    buttons: () => TDialogButtons[];
}

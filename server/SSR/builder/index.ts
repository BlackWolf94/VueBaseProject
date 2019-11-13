import {NewLoader, RuleSetQuery} from 'webpack';
import {WebpackRuleBuilder} from './WebpackBuilder';

export const createLoader = <T>(loader: string, options?: Partial<T>): NewLoader =>
    (options ? {loader, options} : {loader});

export const createRule = (test: RegExp, loader?: string, options?: RuleSetQuery): WebpackRuleBuilder => {
    const rule = new WebpackRuleBuilder(new RegExp(test), loader);
    if (options) {
        rule.options(options);
    }

    return rule;
};

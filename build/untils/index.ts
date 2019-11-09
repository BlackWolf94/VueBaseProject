import {NewLoader, RuleSetCondition, RuleSetQuery, RuleSetRule, RuleSetUse} from 'webpack';

export const createLoader = <T>(loader: string, options: Partial<T> = {}): NewLoader => ({loader, options});


class WebpackRuleBuilder implements RuleSetRule {

    public options = {};
    public exclude: any = null;
    public use: RuleSetUse;

    constructor(public test: RuleSetCondition, public loader?: string) {
    }

    public setUse(use: RuleSetUse) {
        this.use = use;
        return this;
    }

    public setOptions(options: RuleSetQuery) {
        this.options = options;
        return this;
    }

    public setExclude(exclude: RuleSetCondition) {
        this.exclude = exclude;
        return this;
    }



}


export const createRule = (test: RegExp, loader?: string , options = {}): WebpackRuleBuilder =>  {
    return  new WebpackRuleBuilder(test, loader).setOptions(options);
};


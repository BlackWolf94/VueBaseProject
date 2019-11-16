import {NewLoader, RuleSetCondition, RuleSetQuery, RuleSetRule, RuleSetUse} from 'webpack';

export const createLoader = <T>(loader: string, options?: Partial<T>): NewLoader =>
    (options ? {loader, options} : {loader});


class WebpackRuleBuilder {

    public conf: RuleSetRule = {};

    constructor(test: RuleSetCondition, loader?: string) {
        this.conf.test = test;
        if (loader) {
            this.conf.loader = loader;
        }
    }

    public use(use: RuleSetUse) {
        this.conf.use = use;
        return this;
    }

    public options(options: RuleSetQuery) {
        this.conf.options = options;
        return this;
    }

    public exclude(exclude: RuleSetCondition) {
        this.conf.exclude = exclude;
        return this;
    }

    public oneOf(resourceQuery: RegExp, use: NewLoader[]) {
        if (resourceQuery) {
            this.conf.oneOf = [...this.conf.oneOf || [], {resourceQuery, use}];
        }
        else {

            this.conf.oneOf = [...this.conf.oneOf || [], {use}];
        }
        return this;
    }
}


export const createRule = (test: RegExp, loader?: string, options?: RuleSetQuery): WebpackRuleBuilder => {
    const rule = new WebpackRuleBuilder(new RegExp(test), loader);
    if (options) {
        rule.options(options);
    }

    return rule;
};

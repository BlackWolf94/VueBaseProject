import {NewLoader, RuleSetCondition, RuleSetQuery, RuleSetRule, RuleSetUse} from "webpack";

export class WebpackRuleBuilder {

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

    public exclude(exclude: RegExp) {
        this.conf.exclude = new RegExp(exclude);
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

class FilterSelect {
    selectedValue;
    defaultValue;
    label;
    id;
    #cb;
    #timer;
    values;
    constructor(defaultValue = "", label = '', id = '', changeValue, values = []) {
        this.defaultValue = defaultValue;
        this.label = label;
        this.id = id;
        this.#cb = changeValue;
        this.values = values;
    }

    async changeValue(value) {
        if (this.selectedValue !== value || value !== this.defaultValue) {
            this.selectedValue = value;
            await this.#cb();
        }
    }
}

export default FilterSelect;

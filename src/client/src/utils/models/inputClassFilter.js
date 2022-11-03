class SearchFilter {
    selectedValue;
    label;
    id;
    cb;
    timer;
    placeHolder;
    constructor(defaultValue = "", changeValue) {
        this.placeHolder = defaultValue;
        // this.label = label;
        // this.id = id;
        this.selectedValue = '';
        this.timer = null;
        this.cb = changeValue;
    }

    onChange(value) {
        this.selectedValue = value;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(async () => {
            await this.cb(this.selectedValue);
        }, 100);
    }

}

export default SearchFilter;
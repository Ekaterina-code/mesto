export class Section {
    constructor(settings, selector) {
        this.renderer = settings.renderer;
        this.items = settings.items;
        this.elements = document.querySelector(selector);
    }

    render() {
        this.items.forEach((item) => {
            this.addItem(item);
        });
    }

    addItem(item) {
        const element = this.renderer(item);
        this.elements.prepend(element);
    }
}
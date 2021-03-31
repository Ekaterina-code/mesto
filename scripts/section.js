export class Section {
    constructor(settings, selector) {
      this.renderer = settings.renderer;
      this.items = settings.items;
      this.selector = selector;
    }

    render() {
        this.items.forEach((item) =>{
            const element = this.renderer(item);
            this.addItem(element);
        });
    }

    addItem(element) {
        const elements = document.querySelector(this.selector);
        elements.prepend(element);
    }
}
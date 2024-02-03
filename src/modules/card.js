export class card {
  constructor(name, sprite) {
    this.name = name;
    this.sprite = sprite;
  }

  id = crypto.randomUUID();
  clicked = false;

  setClick() {
    this.clicked = true;
  }
}

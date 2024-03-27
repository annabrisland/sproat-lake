class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("text-message");

    this.element.innerHTML = (`
    <p>${this.text}</p>
    <button class="text-button">continue</button>
    `);

    this.element.querySelector(".text-button").addEventListener("click", () => {
      this.element.remove();
      this.onComplete();
    }
    );
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }

}
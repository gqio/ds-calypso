class StorySelect extends HTMLElement {
  get storySelector() {
    return this.getAttribute("selector") || "[data-story-id]";
  }
  select(story: string) {
    const storyBlocks = document.querySelectorAll(this.storySelector);
    for (const block of storyBlocks) {
      const storyBlock = block as HTMLElement;
      const storyId = storyBlock.dataset.storyId;
      let element = storyBlock.parentElement.classList.contains("preview-story")
        ? storyBlock.parentElement
        : storyBlock;
      element.style.height = storyId === story ? "100%" : "0";
      element.style.opacity = storyId === story ? "1" : "0";
    }
  }

  connectedCallback() {
    this.style.display = "block";
    let first = "";
    const storyBlocks = document.querySelectorAll(this.storySelector);
    const select = document.createElement("select");
    for (const block of storyBlocks) {
      const storyBlock = block as HTMLElement;
      const storyId = storyBlock.dataset.storyId;
      const option = document.createElement("option");
      option.value = storyId;
      option.innerText = storyId;
      select.appendChild(option);
      if (!first) first = storyId;
    }
    select.onchange = (e) => this.select((e.target as any).value.toLowerCase());
    this.appendChild(select);
    this.select(first);
  }
}
customElements.define("story-select", StorySelect);

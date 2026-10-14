// Live word count under the abstract textarea (/abstract-submission/). The server enforces the limits.

export function initAbstractForm() {
  const textarea = document.querySelector<HTMLTextAreaElement>("[data-abstract-form] textarea[data-max-words]");
  const counter = document.querySelector<HTMLElement>("[data-abstract-form] [data-word-count]");
  if (!textarea || !counter) return;

  const min = Number(textarea.dataset.minWords);
  const max = Number(textarea.dataset.maxWords);

  const update = () => {
    const words = (textarea.value.match(/\S+/g) ?? []).length;
    counter.textContent = `${words} / ${max} words`;
    counter.toggleAttribute("data-over", words > max || (words > 0 && words < min));
  };

  counter.classList.remove("hidden");
  textarea.addEventListener("input", update);
  update();
}

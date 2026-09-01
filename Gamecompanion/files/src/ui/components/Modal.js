/** Small accessible modal used by bootstrap flows. */
export class Modal {
  constructor(root = document.body) { this.root = root; this.element = null; }
  show({ title, body, actions = [] }) {
    this.close();
    const wrapper = document.createElement('div'); wrapper.className = 'modal-backdrop'; wrapper.setAttribute('role', 'presentation');
    const dialog = document.createElement('section'); dialog.className = 'game-modal'; dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true'); dialog.setAttribute('aria-labelledby', 'modal-title');
    dialog.innerHTML = `<h2 id="modal-title">${title}</h2><div class="modal-body">${body}</div><div class="modal-actions"></div>`;
    const actionsRoot = dialog.querySelector('.modal-actions');
    actions.forEach(({ label, kind = 'secondary', onClick }) => { const button = document.createElement('button'); button.type = 'button'; button.className = `modal-${kind}`; button.textContent = label; button.addEventListener('click', onClick); actionsRoot.append(button); });
    wrapper.append(dialog); this.root.append(wrapper); this.element = wrapper; dialog.querySelector('button')?.focus();
  }
  close() { this.element?.remove(); this.element = null; }
}

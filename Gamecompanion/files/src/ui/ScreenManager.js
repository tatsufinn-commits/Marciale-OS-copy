/**
 * ScreenManager — Build 57 P1 (Aetherweave 29) Quests Window Shell
 *
 * A tiny window-mode shell so a single registered screen (currently the Quests
 * journal) can be rendered as a floating modal OR a full companion panel.
 *
 * Core state is DOM-agnostic so it is unit-testable under `node:test` (no jsdom).
 * The DOM renderer only runs in the browser (`typeof document !== 'undefined'`).
 *
 * Modes: 'modal' (default) | 'full'. Unknown screen ids return `{ ok: false }`
 * without throwing. setMode preserves the screen's render state.
 */
export class ScreenManager {
  constructor({ root = null } = {}) {
    this.root = root;
    this.screens = new Map();
    this.current = null; // { id, mode, render }
    this.element = null;
  }

  /** Register a screen. `render` must return the body HTML string. */
  register(id, { render } = {}) {
    this.screens.set(id, { render });
    return this;
  }

  /** Open a screen in the given mode ('modal' default, 'full' allowed). */
  open(id, mode = 'modal') {
    const screen = this.screens.get(id);
    if (!screen) return { ok: false };
    const safeMode = mode === 'full' ? 'full' : 'modal';
    this.current = { id, mode: safeMode, render: screen.render };
    this._render();
    return { ok: true, mode: safeMode };
  }

  /** Switch mode of the currently open screen without losing its render state. */
  setMode(mode) {
    if (!this.current) return { ok: false };
    if (mode !== 'modal' && mode !== 'full') return { ok: false };
    this.current.mode = mode;
    this._render();
    return { ok: true, mode };
  }

  /** Close the current screen. Reopening falls back to the 'modal' default. */
  close() {
    this.current = null;
    this._render();
    return { ok: true };
  }

  isOpen() { return Boolean(this.current); }
  getMode() { return this.current ? this.current.mode : null; }
  getScreenId() { return this.current ? this.current.id : null; }

  _render() {
    if (typeof document === 'undefined') return; // node-safe
    if (this.element) { this.element.remove(); this.element = null; }
    if (!this.current) return;

    const { id, mode, render } = this.current;
    const body = typeof render === 'function' ? render() : '';

    const host = this.root || document.body;
    const wrapper = document.createElement('div');
    wrapper.className = mode === 'full' ? 'screen-full' : 'screen-modal';
    wrapper.dataset.screenId = id;

    const title = document.createElement('h2');
    title.textContent = mode === 'full' ? `📜 Quest Journal — Full` : `📜 Quest Journal`;

    const bodyEl = document.createElement('div');
    bodyEl.className = 'screen-body';
    bodyEl.innerHTML = body;

    const actions = document.createElement('div');
    actions.className = 'screen-actions';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'screen-toggle';
    toggle.textContent = mode === 'full' ? '⇱ Window' : '⛶ Full';
    toggle.addEventListener('click', () => this.setMode(mode === 'full' ? 'modal' : 'full'));

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'screen-close';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => this.close());

    actions.append(toggle, closeBtn);
    wrapper.append(title, bodyEl, actions);
    host.append(wrapper);
    this.element = wrapper;
  }
}

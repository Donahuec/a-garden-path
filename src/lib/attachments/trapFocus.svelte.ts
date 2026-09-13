import { on } from 'svelte/events';

export function trapFocus(node: HTMLElement, initialId?: string, previous?: Element | null) {
  function focusable(): HTMLElement[] {
    return Array.from(
      node.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;

    const current = document.activeElement;

    const elements = focusable();
    const first = elements.at(0);
    const last = elements.at(-1);

    if (event.shiftKey && current === first) {
      last?.focus();
      event.preventDefault();
    }

    if (!event.shiftKey && current === last) {
      first?.focus();
      event.preventDefault();
    }
  }

  if (!previous) {
    previous = document.activeElement;
  }

  let initial;

  if (initialId && document.getElementById(initialId)) {
    initial = document.getElementById(initialId);
  } else {
    initial = focusable()[0];
  }

  (initial as HTMLElement)?.focus();
  const off = on(node, 'keydown', handleKeydown);

  return () => {
    off();
    (previous as HTMLElement)?.focus();
  };
}

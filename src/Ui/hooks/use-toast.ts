
type ToastOpts = {
  title: string;
  description?: string;
  duration?: number; 
};

export function toast({ title, description, duration = 3500 }: ToastOpts) {
  if (typeof window === "undefined") {
    // Server-side: no-op or log
    // eslint-disable-next-line no-console
    console.log(`TOAST: ${title}${description ? ' - ' + description : ''}`);
    return;
  }

  const containerId = 'xe-toast-container';
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.style.position = 'fixed';
    container.style.right = '18px';
    container.style.bottom = '18px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }

  const el = document.createElement('div');
  el.style.minWidth = '220px';
  el.style.maxWidth = '360px';
  el.style.background = 'rgba(20,20,20,0.95)';
  el.style.color = 'white';
  el.style.padding = '12px 14px';
  el.style.borderRadius = '10px';
  el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
  el.style.fontSize = '13px';
  el.style.opacity = '0';
  el.style.transition = 'opacity 220ms ease, transform 220ms ease';
  el.style.transform = 'translateY(6px)';

  const titleEl = document.createElement('div');
  titleEl.style.fontWeight = '600';
  titleEl.style.marginBottom = description ? '6px' : '0';
  titleEl.textContent = title;

  el.appendChild(titleEl);

  if (description) {
    const descEl = document.createElement('div');
    descEl.style.opacity = '0.9';
    descEl.style.fontSize = '12px';
    descEl.textContent = description;
    el.appendChild(descEl);
  }

  container.appendChild(el);

 
  el.offsetHeight;
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';

  // Auto-remove
  const remove = () => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    setTimeout(() => {
      el.remove();
      if (container && container.children.length === 0) container.remove();
    }, 240);
  };

  const timeout = setTimeout(remove, duration);

  // allow manual dismiss on click
  el.addEventListener('click', () => {
    clearTimeout(timeout);
    remove();
  });
}

export default toast;

// A lightweight React-friendly placeholder that ensures the toast container
// exists in the DOM and can be mounted as <Toaster /> in the app layout.
export function Toaster(): null {
  if (typeof window !== "undefined") {
    const containerId = 'xe-toast-container';
    if (!document.getElementById(containerId)) {
      const container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.right = '18px';
      container.style.bottom = '18px';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }
  }

  return null;
}

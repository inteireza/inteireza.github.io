// O conteúdo permanece visível quando JavaScript não está disponível.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const items = document.querySelectorAll('.reveal');
  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
    document.documentElement.classList.add('motion-ready');
    reducedMotion.addEventListener('change', (event) => {
      if (event.matches) {
        observer.disconnect();
        document.documentElement.classList.remove('motion-ready');
      }
    });
    // Navegação por âncora também revela imediatamente o destino.
    window.addEventListener('hashchange', () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) target.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
    });
  } catch {
    document.documentElement.classList.remove('motion-ready');
  }
})();

(function () {
  const links = [
    { href: "/about", label: "About", match: "/about" },
    { href: "/menu", label: "Menu", match: "/menu" },
    { href: "/#games", label: "Games", match: "/games" }
  ];

  class PolySiteHeader extends HTMLElement {
    connectedCallback() {
      const path = window.location.pathname;
      const linksHtml = links.map(link => {
        const current = path === link.match || (link.match === "/games" && window.location.hash === "#games");
        return `<a href="${link.href}"${current ? ' aria-current="page"' : ""}>${link.label}</a>`;
      }).join("");
      const bookingCurrent = path === "/reservation" || path === "/reservation.html";

      this.innerHTML = `
        <header class="site-header">
          <a class="brand" href="/" aria-label="Poly home">
            <span class="brand-letter brand-p">P</span><span class="brand-die" aria-hidden="true"><i></i><i></i><i></i></span><span class="brand-letter brand-l">L</span><span class="brand-letter brand-y">Y</span>
            <small>board games cafe</small>
          </a>
          <nav aria-label="Primary navigation">
            ${linksHtml}
            <a class="nav-cta" href="/reservation"${bookingCurrent ? ' aria-current="page"' : ""}>Book a table <span>&rarr;</span></a>
          </nav>
        </header>`;
    }
  }

  if (!customElements.get("poly-site-header")) {
    customElements.define("poly-site-header", PolySiteHeader);
  }
})();

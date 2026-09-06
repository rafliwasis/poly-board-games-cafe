(function(){
  // Menu & Promo section data + rendering
  const menuItems = [
    { name: "Espresso", desc: "Single shot of rich espresso", price: "$2.50", category: "Drink" },
    { name: "Cappuccino", desc: "Steamed milk, espresso, foam", price: "$3.90", category: "Drink" },
    { name: "Latte", desc: "Smooth espresso with steamed milk", price: "$4.20", category: "Drink" },
    { name: "Loose-leaf Tea", desc: "Assorted herbal and classic teas", price: "$2.80", category: "Drink" },
    { name: "Toastie", desc: "Toasted sandwich with daily filling", price: "$5.50", category: "Food" },
    { name: "Scone", desc: "Buttery scone with jam and cream", price: "$3.20", category: "Food" },
    { name: "Snack Board", desc: "Selection of nibbles for sharing", price: "$9.50", category: "Food" },
    { name: "Soft Drink", desc: "Bottled cold drink", price: "$2.00", category: "Drink" },
    { name: "Session (per person)", desc: "Table time and access to game shelf (per hour)", price: "$6.00/hr", category: "Session" }
  ];

  const promos = [
    { title: "Afternoon Pairing", desc: "Any hot drink + scone", price: "$6.00", games: ["Codenames","Sushi Go Party!"], highlight: true },
    { title: "Group Starter", desc: "Snack board + 2hrs session (per person)", price: "$12.00", games: ["Ticket to Ride Europe","Avalon"] },
    { title: "Quick Play Combo", desc: "Small drink + quick party game", price: "$5.00", games: ["UNO","Spot It"] }
  ];

  function q(sel){ return document.querySelector(sel); }
  const menuList = q('#menu-list');
  const promoList = q('#promo-list');
  const tabButtons = document.querySelectorAll('.tab-button');

  function renderMenu() {
    if (!menuList) return;
    menuList.replaceChildren(...menuItems.map(item => {
      const el = document.createElement('div');
      el.className = 'menu-item';
      el.innerHTML = `<div>\n        <h4>${item.name}</h4>\n        <p>${item.desc}</p>\n      </div>\n      <div class="menu-price">${item.price}</div>`;
      return el;
    }));
  }

  function renderPromos() {
    if (!promoList) return;
    promoList.replaceChildren(...promos.map(p => {
      const card = document.createElement('div');
      card.className = 'promo-card';
      const gamesHtml = p.games.map(g => `<span class="promo-chip">${g}</span>`).join('');
      card.innerHTML = `<h4>${p.title} <small style="font-weight:600;color:#60656d; font-size:12px;">${p.price}</small></h4>\n      <p class="promo-desc">${p.desc}</p>\n      <div class="promo-games">${gamesHtml}</div>`;
      return card;
    }));
  }

  function switchTab(tab) {
    if (!tabButtons) return;
    tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    if (menuList && promoList) {
      if (tab === 'menu') {
        menuList.hidden = false; promoList.hidden = true;
      } else {
        menuList.hidden = true; promoList.hidden = false;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderPromos();
    switchTab('menu');
    tabButtons.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  });
})();

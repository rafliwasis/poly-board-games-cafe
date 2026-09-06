(function(){
  // Real menu data (prices in Indonesian Rupiah, shown with 'K')
  const menuItems = [
    // Snacks
    { category: 'Snacks', name: 'Mix Platter', price: '32K' },
    { category: 'Snacks', name: 'Chicken Wings', price: '35K' },
    { category: 'Snacks', name: 'French Fries', price: '26K' },
    { category: 'Snacks', name: 'Siomay', price: '22K' },
    { category: 'Snacks', name: 'Batagor', price: '28K' },
    { category: 'Snacks', name: 'Cireng', price: '28K' },
    { category: 'Snacks', name: 'Otak-Otak Singapore', price: '28K' },
    { category: 'Snacks', name: 'Pisang Goreng', price: '22K' },

    // Main Courses & Ricebowls
    { category: 'Main Courses & Ricebowls', name: 'Chicken Katsu', price: '38K' },
    { category: 'Main Courses & Ricebowls', name: 'Chicken Shrimp Roll', price: '38K' },
    { category: 'Main Courses & Ricebowls', name: 'Nasi Ayam Sambal Matah', price: '39K' },
    { category: 'Main Courses & Ricebowls', name: 'Nasi Ayam Yakiniku', price: '39K' },
    { category: 'Main Courses & Ricebowls', name: 'Nasi Bakar (Ayam/Cumi)', price: '28K' },
    { category: 'Main Courses & Ricebowls', name: 'Nasi Putih', price: '10K' },

    // Noodles
    { category: 'Noodles', name: 'Shin Ramyeon', price: '29K' },
    { category: 'Noodles', name: 'Indomie Goreng', price: '20K' },
    { category: 'Noodles', name: 'Indomie Goreng Special', price: '28K' },
    { category: 'Noodles', name: 'Indomie Goreng Katsu', price: '35K' },
    { category: 'Noodles', name: 'Indomie Rebus', price: '20K' },
    { category: 'Noodles', name: 'Indomie Rebus Special', price: '28K' },

    // Add-ons
    { category: 'Add-ons', name: 'Scrambled Egg', price: '7K' },
    { category: 'Add-ons', name: 'Bakso', price: '7K' },
    { category: 'Add-ons', name: 'Keju', price: '7K' },
    { category: 'Add-ons', name: 'Kornet', price: '7K' },
    { category: 'Add-ons', name: 'Float (Ice Cream)', price: '7K' },

    // Drinks — Mocktails
    { category: 'Drinks — Mocktails', name: 'Yakult Mango Peach (Mango x Peach x Yakult)', price: '30K' },
    { category: 'Drinks — Mocktails', name: 'Blue Lagoon (Lychee x Blue Citrus)', price: '28K' },
    { category: 'Drinks — Mocktails', name: 'Sunset Breeze (Mango x Mint)', price: '28K' },
    { category: 'Drinks — Mocktails', name: 'Emerald Splash (Mint Tea x Blue Citrus)', price: '28K' },
    { category: 'Drinks — Mocktails', name: 'Orange Blue Sky (Blood Orange x Blue Citrus)', price: '28K' },
    { category: 'Drinks — Mocktails', name: 'Coffee Mocktail (Blood Orange x Mint x Espresso)', price: '28K' },

    // Drinks — Tea & Others
    { category: 'Drinks — Tea & Others', name: 'Ice Tea', price: '17K' },
    { category: 'Drinks — Tea & Others', name: 'Lychee Tea', price: '26K' },
    { category: 'Drinks — Tea & Others', name: 'Teh Tarik', price: '26K' },
    { category: 'Drinks — Tea & Others', name: 'Hot Premium Tea (Chamomile, Peppermint, or Earl Grey)', price: '25K' },
    { category: 'Drinks — Tea & Others', name: 'Mineral Water', price: '10K' },

    // Drinks — Milk Based
    { category: 'Drinks — Milk Based', name: 'Matcha', price: '28K' },
    { category: 'Drinks — Milk Based', name: 'Choco', price: '28K' },
    { category: 'Drinks — Milk Based', name: 'Choco Mint', price: '30K' },
    { category: 'Drinks — Milk Based', name: 'Choco Banana', price: '30K' },
    { category: 'Drinks — Milk Based', name: 'Choco Hazelnut', price: '30K' },
    { category: 'Drinks — Milk Based', name: 'Cookies & Cream', price: '30K' },
    { category: 'Drinks — Milk Based', name: 'Taro', price: '28K' },
    { category: 'Drinks — Milk Based', name: 'Taro Creamy', price: '30K' },
    { category: 'Drinks — Milk Based', name: 'Red Velvet', price: '28K' },
    { category: 'Drinks — Milk Based', name: 'Red Velvet Creamy', price: '30K' },

    // Drinks — Coffee
    { category: 'Drinks — Coffee', name: 'Affogato', price: '22K' },
    { category: 'Drinks — Coffee', name: 'Americano', price: '23K' },
    { category: 'Drinks — Coffee', name: 'Americano Mango', price: '25K' },
    { category: 'Drinks — Coffee', name: 'Cafe Latte', price: '25K' },
    { category: 'Drinks — Coffee', name: 'Aren Latte', price: '28K' },
    { category: 'Drinks — Coffee', name: 'Hazelnut Latte', price: '28K' },
    { category: 'Drinks — Coffee', name: 'Pandan Latte', price: '28K' },
    { category: 'Drinks — Coffee', name: 'Spanish Latte', price: '28K' },
    { category: 'Drinks — Coffee', name: 'Sea Salt Latte', price: '30K' },
    { category: 'Drinks — Coffee', name: 'B-Scotch Salt Latte', price: '30K' },
    { category: 'Drinks — Coffee', name: 'Caramel Macchiato', price: '30K' },
    { category: 'Drinks — Coffee', name: 'Mocha Butterscotch', price: '30K' }
  ];

  function q(sel){ return document.querySelector(sel); }
  const menuList = q('#menu-list');

  function renderMenu() {
    if (!menuList) return;
    // group by category in the original order
    const groups = [];
    for (const item of menuItems) {
      let g = groups.find(x => x.category === item.category);
      if (!g) { g = { category: item.category, items: [] }; groups.push(g); }
      g.items.push(item);
    }

    const children = [];
    for (const g of groups) {
      const groupWrap = document.createElement('div');
      groupWrap.className = 'menu-category';
      const title = document.createElement('h3');
      title.textContent = g.category;
      groupWrap.appendChild(title);

      const list = document.createElement('div');
      list.className = 'menu-category-list';
      for (const it of g.items) {
        const el = document.createElement('div');
        el.className = 'menu-item';
        el.innerHTML = `<div><h4>${it.name}</h4></div><div class="menu-price">${it.price}</div>`;
        list.appendChild(el);
      }
      groupWrap.appendChild(list);
      children.push(groupWrap);
    }

    menuList.replaceChildren(...children);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
  });
})();

const MENU=[
{name:"Classic Ofada",category:"ofada",desc:"Native Ofada rice served with rich, spicy ayamase and selected proteins.",price:"₦12,500",image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=82"},
{name:"Seafood Ofada",category:"ofada",desc:"A seafood-led take on the signature Ofada experience.",price:"₦18,000",image:"https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=82"},
{name:"Asun Jollof",category:"rice",desc:"Smoky jollof rice with spicy Asun-inspired flavours.",price:"₦9,500",image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=82"},
{name:"Ofada Noodles",category:"mains",desc:"A modern noodle option for customers craving something different.",price:"₦7,500",image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=82"},
{name:"Grilled Chicken",category:"mains",desc:"Tender grilled chicken prepared for a satisfying main.",price:"₦12,000",image:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=82"},
{name:"Signature Cocktail",category:"drinks",desc:"A refreshing cocktail option to pair with your meal.",price:"₦6,000",image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=82"}];
function card(item) {
	return `<article class="food-card" data-reveal>
		<div class="food-image"><img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" width="640" height="450"></div>
		<div class="food-info">
			<div class="food-meta"><small>${item.category.toUpperCase()}</small><span class="price">${item.price}</span></div>
			<h3>${item.name}</h3><p class="muted">${item.desc}</p>
			<button class="food-order add-to-cart" type="button" data-add-to-cart="${item.name}">Add to cart <span aria-hidden="true">＋</span></button>
		</div>
	</article>`;
}

const revealObserver = "IntersectionObserver" in window
	? new IntersectionObserver(entries => entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("is-visible");
			revealObserver.unobserve(entry.target);
		}
	}), { threshold: .12, rootMargin: "0px 0px -32px 0px" })
	: null;

function render(target, category = "all") {
	const container = document.querySelector(target);
	if (!container) return;
	container.innerHTML = MENU
		.filter(item => category === "all" || item.category === category)
		.map(card)
		.join("");
	container.querySelectorAll("[data-reveal]").forEach(item => {
		if (revealObserver) revealObserver.observe(item);
		else item.classList.add("is-visible");
	});
}

render("#foodGrid");
render("#fullMenu");

const socialMarks = {
	facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg>`,
	instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="social-icon-dot" cx="17.6" cy="6.8" r="1"/></svg>`,
	tiktok: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h3c.2 2 1.4 3.6 4 4v3.2a9.2 9.2 0 0 1-4-1.3v6.2a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.1.1v3.4a2.8 2.8 0 1 0 1.9 2.6V3Z"/></svg>`,
	x: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.8 6.1 21H3l7.3-8.4L2.8 3h6.5l4.5 6 5.1-6Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z"/></svg>`
};
document.querySelectorAll('a[href*="facebook.com"], a[href*="instagram.com"], a[href*="tiktok.com"], a[href*="x.com/"]').forEach(link => {
	const network = link.href.includes("facebook.com") ? "facebook" : link.href.includes("instagram.com") ? "instagram" : link.href.includes("tiktok.com") ? "tiktok" : "x";
	link.classList.add("social-link");
	link.insertAdjacentHTML("afterbegin", `<span class="social-icon social-icon-${network}">${socialMarks[network]}</span>`);
});

const CART_KEY = "ofada-heaven-cart";
const cart = (() => {
	try {
		const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
		return Array.isArray(saved) ? saved.filter(entry => MENU.some(item => item.name === entry.name) && Number.isInteger(entry.quantity) && entry.quantity > 0) : [];
	} catch {
		return [];
	}
})();

const cartMarkup = `<div class="cart-backdrop" data-cart-close hidden></div>
	<aside class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true" inert>
		<div class="cart-header"><div><p class="eyebrow">YOUR ORDER</p><h2 id="cartTitle">Your cart <span class="cart-count">0</span></h2></div><button class="cart-close" type="button" aria-label="Close cart">×</button></div>
		<div class="cart-items" id="cartItems"></div>
		<div class="cart-summary"><p>We’ll confirm current prices when you send your order.</p><button class="btn btn-primary cart-checkout" type="button">Continue on WhatsApp <span aria-hidden="true">↗</span></button><button class="cart-keep-shopping" type="button">Keep browsing</button></div>
	</aside><p class="cart-announcement" aria-live="polite" aria-atomic="true"></p>`;
document.body.insertAdjacentHTML("beforeend", cartMarkup);

const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const cartAnnouncement = document.querySelector(".cart-announcement");
const cartBackdrop = document.querySelector(".cart-backdrop");
const headerCart = document.createElement("button");
headerCart.className = "cart-trigger";
headerCart.type = "button";
headerCart.setAttribute("aria-label", "Open cart, 0 items");
headerCart.innerHTML = `Cart <span class="cart-count">0</span>`;
document.querySelector(".site-header")?.append(headerCart);

function persistCart() {
	try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* Cart remains available for this page view. */ }
}

function renderCart() {
	const itemCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
	document.querySelectorAll(".cart-count").forEach(badge => { badge.textContent = itemCount; });
	headerCart.setAttribute("aria-label", `Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
	cartItems.innerHTML = cart.length ? cart.map(entry => {
		const item = MENU.find(menuItem => menuItem.name === entry.name);
		return `<article class="cart-item"><img src="${item.image}" alt="" width="80" height="80"><div class="cart-item-copy"><strong>${item.name}</strong><small>${item.price}</small><div class="cart-quantity" aria-label="Quantity for ${item.name}"><button type="button" data-cart-action="decrease" data-item="${item.name}" aria-label="Remove one ${item.name}">−</button><span>${entry.quantity}</span><button type="button" data-cart-action="increase" data-item="${item.name}" aria-label="Add one ${item.name}">+</button></div></div><button type="button" class="cart-remove" data-cart-action="remove" data-item="${item.name}" aria-label="Remove ${item.name} from cart">×</button></article>`;
	}).join("") : `<div class="cart-empty"><span aria-hidden="true">＋</span><h3>Your cart is waiting.</h3><p>Add a few favourites and send them together in one message.</p><a href="${location.pathname.endsWith("menu.html") ? "#fullMenu" : "#menu"}" class="btn btn-outline cart-empty-link">Explore the menu</a></div>`;
	const checkoutButton = document.querySelector(".cart-checkout");
	checkoutButton.disabled = cart.length === 0;
}

function openCart() {
	renderCart();
	cartDrawer.inert = false;
	cartDrawer.setAttribute("aria-hidden", "false");
	cartBackdrop.hidden = false;
	requestAnimationFrame(() => document.body.classList.add("cart-open"));
	document.querySelector(".cart-close").focus();
}

function closeCart() {
	document.body.classList.remove("cart-open");
	cartDrawer.setAttribute("aria-hidden", "true");
	cartDrawer.inert = true;
	cartBackdrop.hidden = true;
	headerCart.focus();
}

document.addEventListener("click", event => {
	const addButton = event.target.closest("[data-add-to-cart]");
	if (addButton) {
		const name = addButton.dataset.addToCart;
		const existing = cart.find(entry => entry.name === name);
		if (existing) existing.quantity += 1;
		else cart.push({ name, quantity: 1 });
		persistCart();
		renderCart();
		cartAnnouncement.textContent = `${name} added to cart.`;
		addButton.classList.add("is-added");
		addButton.innerHTML = `Added <span aria-hidden="true">✓</span>`;
		window.setTimeout(() => {
			if (!addButton.isConnected) return;
			addButton.classList.remove("is-added");
			addButton.innerHTML = `Add to cart <span aria-hidden="true">＋</span>`;
		}, 1100);
		return;
	}
	if (event.target.closest(".cart-trigger, .mobile-cart-trigger")) { openCart(); return; }
	if (event.target.closest(".cart-close, .cart-keep-shopping, .cart-empty-link, [data-cart-close]")) { closeCart(); return; }
	const actionButton = event.target.closest("[data-cart-action]");
	if (actionButton) {
		const { item, cartAction } = actionButton.dataset;
		const entryIndex = cart.findIndex(entry => entry.name === item);
		if (entryIndex >= 0) {
			if (cartAction === "remove" || (cartAction === "decrease" && cart[entryIndex].quantity === 1)) cart.splice(entryIndex, 1);
			else cart[entryIndex].quantity += cartAction === "increase" ? 1 : -1;
			persistCart();
			renderCart();
		}
	}
});

document.querySelector(".cart-checkout").addEventListener("click", () => {
	if (!cart.length) return;
	const lines = cart.map(entry => `- ${entry.name} x${entry.quantity}`).join("\n");
	const message = `Hello Ofada Heaven, I'd like to place one order:\n${lines}\n\nPlease confirm availability and current prices. My name is:`;
	window.open(`https://wa.me/2348036295626?${new URLSearchParams({ text: message })}`, "_blank", "noopener");
});

document.addEventListener("keydown", event => {
	if (!document.body.classList.contains("cart-open")) return;
	if (event.key === "Escape") { closeCart(); return; }
	if (event.key !== "Tab") return;
	const focusable = [...cartDrawer.querySelectorAll('button:not(:disabled), a[href]')].filter(element => element.getClientRects().length);
	if (!focusable.length) return;
	const first = focusable[0];
	const last = focusable[focusable.length - 1];
	if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
	else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

document.querySelectorAll(".mobile-cart-trigger").forEach(button => button.setAttribute("aria-label", "Open cart"));
renderCart();

document.querySelectorAll(".category-tabs").forEach(tabs => {
	tabs.querySelectorAll("button").forEach(button => {
		button.type = "button";
		button.setAttribute("aria-pressed", button.classList.contains("active"));
	});
	tabs.addEventListener("click", event => {
		if (event.target.tagName !== "BUTTON") return;
		tabs.querySelectorAll("button").forEach(button => {
			const active = button === event.target;
			button.classList.toggle("active", active);
			button.setAttribute("aria-pressed", active);
		});
		render("#foodGrid", event.target.dataset.category);
		render("#fullMenu", event.target.dataset.category);
	});
});

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
if (toggle && nav) {
	const closeMenu = () => {
		nav.classList.remove("open");
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-label", "Open menu");
	};
	toggle.addEventListener("click", () => {
		const open = nav.classList.toggle("open");
		toggle.setAttribute("aria-expanded", open);
		toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
	});
	nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
	document.addEventListener("keydown", event => {
		if (event.key === "Escape") closeMenu();
	});
}

const header = document.querySelector(".site-header");
if (header) {
	const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
	updateHeader();
	window.addEventListener("scroll", updateHeader, { passive: true });
}

document.querySelectorAll(".intro, .featured .section-head, .experience-copy, .experience-grid article, .about-image, .about > div:last-child, .reserve-panel, .contact > div").forEach(item => {
	item.setAttribute("data-reveal", "");
	if (revealObserver) revealObserver.observe(item);
	else item.classList.add("is-visible");
});
document.body.classList.add("js-motion-ready", "page-ready");

const heroPhoto = document.querySelector(".hero-photo");
if (heroPhoto && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	let ticking = false;
	window.addEventListener("scroll", () => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(() => {
			heroPhoto.style.setProperty("--hero-shift", `${Math.min(window.scrollY * .08, 28)}px`);
			ticking = false;
		});
	}, { passive: true });
}

const sectionObserver = "IntersectionObserver" in window
	? new IntersectionObserver(entries => entries.forEach(entry => {
		if (!entry.isIntersecting) return;
		document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
			if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "page");
			else link.removeAttribute("aria-current");
		});
	}), { rootMargin: "-35% 0px -55% 0px" })
	: null;
document.querySelectorAll("main section[id]").forEach(section => sectionObserver?.observe(section));

const form = document.querySelector("#reservationForm");
if (form) {
	const submitButton = form.querySelector(".reservation-submit");
	const channelInputs = form.querySelectorAll('input[name="channel"]');
	channelInputs.forEach(input => input.addEventListener("change", () => {
		const emailSelected = input.checked && input.value === "email";
		if (emailSelected) submitButton.innerHTML = `Request by email <span aria-hidden="true">↗</span>`;
		else if (input.checked) submitButton.innerHTML = `Request on WhatsApp <span aria-hidden="true">↗</span>`;
	}));
	form.addEventListener("submit", event => {
		event.preventDefault();
		const data = new FormData(form);
		const message = `Hello Ofada Heaven, I'd like to request a reservation.\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nGuests: ${data.get("guests")}\nDate: ${data.get("date")}\nTime: ${data.get("time")}\nSpecial request: ${data.get("request") || "None"}`;
		if (data.get("channel") === "email") {
			const subject = "Ofada Heaven reservation request";
			window.location.href = `mailto:${form.dataset.reservationEmail}?${new URLSearchParams({ subject, body: message })}`;
			return;
		}
		const query = new URLSearchParams({ text: message });
		window.open(`https://wa.me/2348036295626?${query}`, "_blank", "noopener");
	});
}

document.querySelector("#year")?.append(new Date().getFullYear());

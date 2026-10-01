const MENU=[
{name:"Classic Ofada",category:"ofada",desc:"Native Ofada rice served with rich, spicy ayamase and selected proteins.",price:"₦12,500",image:"images/ofada.jpg"},
{name:"Seafood Pasta",category:"mains",desc:"Seafood pasta with prawns, mussels and a rich tomato sauce.",price:"₦18,000",image:"images/seafood-ofada.jpg"},
{name:"Asun Jollof Rice",category:"rice",desc:"Smoky jollof rice with spicy Asun-inspired flavours.",price:"₦9,500",image:"images/asun-jollof.jpg"},
{name:"Party Jollof Rice",category:"rice",desc:"Smoky, slow-cooked Nigerian jollof rice with a peppery finish.",price:"₦8,500",image:"images/asun-jollof.jpg"},
{name:"Seafood Fried Rice",category:"rice",desc:"Fried rice with prawns, vegetables and savoury aromatics.",price:"₦9,000",image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=82"},
{name:"Steamed White Rice",category:"rice",desc:"A simple, fluffy rice side for pairing with your favourite sauce.",price:"₦9,500",image:"https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=82"},
{name:"Noodles with Egg & Greens",category:"noodles",desc:"A comforting noodle bowl with a fried egg and greens.",price:"₦7,500",image:"images/noodles.jpg"},
{name:"Spicy Stir-fried Noodles",category:"noodles",desc:"Tossed noodles with peppers, crisp vegetables and a lively seasoning.",price:"₦10,500",image:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=82"},
{name:"Indomie with Egg",category:"noodles",desc:"A comforting noodle bowl finished with a fried egg.",price:"₦6,500",image:"images/noodles.jpg"},
{name:"Grilled Chicken",category:"mains",desc:"Tender grilled chicken prepared for a satisfying main.",price:"₦12,000",image:"images/chicken.jpg"},
{name:"Grilled Salmon",category:"mains",desc:"Grilled salmon served with fresh greens and a bright citrus finish.",price:"₦15,000",image:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=82"},
{name:"Fried Plantain",category:"sides",desc:"Golden ripe plantain, fried until tender with crisp edges.",price:"₦2,500",image:"images/ofada.jpg"},
{name:"Fried Egg Toast",category:"sides",desc:"A freshly fried egg served on toasted bread.",price:"₦1,000",image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=82"},
{name:"Pepper Sauce",category:"sides",desc:"A punchy house pepper sauce to add extra heat.",price:"₦1,500",image:"images/ofada.jpg"},
{name:"Signature Cocktail",category:"drinks",desc:"A refreshing cocktail option to pair with your meal.",price:"₦6,000",image:"images/cocktail.jpg"},
{name:"Mango Cooler",category:"drinks",desc:"A chilled mango drink with a bright, refreshing finish.",price:"₦2,500",image:"https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=900&q=82"},
{name:"Soft Drink",category:"drinks",desc:"A chilled, fizzy soft drink to enjoy with your meal.",price:"₦1,000",image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=82"},
{name:"Bottled Water",category:"drinks",desc:"Chilled bottled water.",price:"₦800",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=82"},
{name:"Chocolate Brownie",category:"desserts",desc:"A rich chocolate brownie topped with ice cream and chocolate sauce.",price:"₦4,500",image:"https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=82"},
{name:"Chocolate Doughnuts",category:"desserts",desc:"Soft doughnuts finished with chocolate and colourful sprinkles.",price:"₦3,000",image:"https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=82"}];
const ORDER_PHONE = "2348036295626";
const ORDER_EMAIL = document.querySelector("#reservationForm")?.dataset.reservationEmail || "phillipdennis076@gmail.com";

function toNaira(value) {
	const amount = Number(String(value).replace(/[^\d]/g, ""));
	return Number.isFinite(amount) ? amount : 0;
}

function formatMoney(value) {
	return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value || 0);
}

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

function render(target, category = "all", limit = null) {
	const container = document.querySelector(target);
	if (!container) return;
	const items = MENU.filter(item => category === "all" || item.category === category);
	const visibleItems = limit === null ? items : items.slice(0, limit);
	container.innerHTML = visibleItems.map(card).join("");
	container.querySelectorAll("[data-reveal]").forEach(item => {
		if (revealObserver) revealObserver.observe(item);
		else item.classList.add("is-visible");
	});
}

render("#foodGrid", "all", 3);
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
		<div class="cart-summary">
			<div class="cart-total-row"><span>Items total</span><strong id="cartTotal">₦0</strong></div>
			<p class="cart-summary-note">Add a few favourites and send them together in one message.</p>
			<button class="btn btn-primary cart-checkout" type="button">Proceed to order <span aria-hidden="true">↗</span></button>
			<button class="cart-keep-shopping" type="button">Keep browsing</button>
		</div>
	</aside><p class="cart-announcement" aria-live="polite" aria-atomic="true"></p>`;

const checkoutModalMarkup = `<div class="checkout-modal" id="checkoutModal" hidden>
	<div class="checkout-panel" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
		<div class="checkout-heading"><div><p class="eyebrow">ORDER DETAILS</p><h3 id="checkoutTitle">Complete your order</h3></div><button class="checkout-close" type="button" aria-label="Close order details" data-checkout-close>×</button></div>
		<form id="checkoutForm">
			<fieldset class="checkout-order-type"><legend>Pickup or delivery</legend><div class="checkout-options" role="group" aria-label="Choose pickup or delivery">
				<button type="button" class="checkout-option is-selected" data-order-type="pickup" aria-pressed="true">Pickup</button>
				<button type="button" class="checkout-option" data-order-type="delivery" aria-pressed="false">Delivery</button>
			</div></fieldset>
			<div class="checkout-fields">
				<label><span>Full name <b aria-hidden="true">*</b></span><input name="name" type="text" autocomplete="name" required></label>
				<label><span>Phone number <b aria-hidden="true">*</b></span><input name="phone" type="tel" autocomplete="tel" required></label>
				<label class="checkout-address" hidden><span>Delivery address <b aria-hidden="true">*</b></span><input name="address" type="text" autocomplete="street-address"></label>
				<label class="checkout-notes"><span>Additional notes</span><textarea name="notes" rows="3"></textarea></label>
			</div>
			<div class="checkout-summary"><h4>Order summary</h4><div id="checkoutSummary"></div><div class="checkout-summary-total"><span>Items total</span><strong id="checkoutTotal">₦0</strong></div></div>
			<p class="checkout-error" id="checkoutError" role="alert"></p>
			<div class="checkout-actions"><button class="btn btn-primary" type="submit" name="channel" value="whatsapp">Send on WhatsApp <span aria-hidden="true">↗</span></button><button class="btn btn-outline" type="submit" name="channel" value="email">Send by email <span aria-hidden="true">↗</span></button></div>
		</form>
	</div>
</div>`;
document.body.insertAdjacentHTML("beforeend", cartMarkup);
document.body.insertAdjacentHTML("beforeend", checkoutModalMarkup);

const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const cartAnnouncement = document.querySelector(".cart-announcement");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartTotal = document.querySelector("#cartTotal");
const cartSummaryNote = document.querySelector(".cart-summary-note");
const checkoutModal = document.querySelector("#checkoutModal");
const checkoutOptions = document.querySelectorAll(".checkout-option");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutAddress = document.querySelector(".checkout-address");
const checkoutSummary = document.querySelector("#checkoutSummary");
const checkoutTotal = document.querySelector("#checkoutTotal");
const checkoutError = document.querySelector("#checkoutError");
const orderSelection = { type: "pickup", focusReturn: null };
const headerCart = document.createElement("button");
headerCart.className = "cart-trigger";
headerCart.type = "button";
headerCart.setAttribute("aria-label", "Open cart, 0 items");
headerCart.innerHTML = `
	<span class="cart-icon" aria-hidden="true">
		<svg viewBox="0 0 24 24" role="img" aria-hidden="true">
			<path d="M3 5h2l2.3 9.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 .98-.8L19 7H7.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
			<circle cx="10" cy="18" r="1.3" fill="currentColor"/>
			<circle cx="17" cy="18" r="1.3" fill="currentColor"/>
		</svg>
	</span>
	<span class="cart-count">0</span>
`;
document.body.append(headerCart);

function persistCart() {
	try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* Cart remains available for this page view. */ }
}

function getCartTotalValue() {
	return cart.reduce((sum, entry) => {
		const item = MENU.find(menuItem => menuItem.name === entry.name);
		if (!item) return sum;
		return sum + (toNaira(item.price) * entry.quantity);
	}, 0);
}

function openCheckoutModal() {
	if (!cart.length) return;
	orderSelection.focusReturn = document.activeElement;
	checkoutModal.hidden = false;
	checkoutOptions.forEach(button => {
		const selected = button.dataset.orderType === orderSelection.type;
		button.classList.toggle("is-selected", selected);
		button.setAttribute("aria-pressed", String(selected));
	});
	updateCheckoutSummary();
	requestAnimationFrame(() => {
		checkoutModal.classList.add("is-open");
		checkoutForm.elements.name.focus();
	});
}

function closeCheckoutModal() {
	checkoutModal.classList.remove("is-open");
	window.setTimeout(() => {
		checkoutModal.hidden = true;
		orderSelection.focusReturn?.focus();
	}, 180);
}

function updateCheckoutSummary() {
	const lines = cart.map(entry => {
		const item = MENU.find(menuItem => menuItem.name === entry.name);
		const lineTotal = item ? toNaira(item.price) * entry.quantity : 0;
		return `<div class="checkout-summary-item"><span>${entry.quantity} × ${item.name}</span><strong>${formatMoney(lineTotal)}</strong></div>`;
	}).join("");
	checkoutSummary.innerHTML = lines;
	checkoutTotal.textContent = formatMoney(getCartTotalValue());
}

function setOrderType(type) {
	orderSelection.type = type;
	checkoutOptions.forEach(button => {
		const selected = button.dataset.orderType === type;
		button.classList.toggle("is-selected", selected);
		button.setAttribute("aria-pressed", String(selected));
	});
	const isDelivery = type === "delivery";
	checkoutAddress.hidden = !isDelivery;
	checkoutAddress.querySelector("input").required = isDelivery;
}

function submitOrder(event) {
	event.preventDefault();
	checkoutError.textContent = "";
	if (!cart.length) {
		checkoutError.textContent = "Your cart is empty. Add an item before placing an order.";
		return;
	}
	const data = new FormData(checkoutForm);
	const name = String(data.get("name") || "").trim();
	const phone = String(data.get("phone") || "").trim();
	const address = String(data.get("address") || "").trim();
	const notes = String(data.get("notes") || "").trim();
	if (!name || !phone || (orderSelection.type === "delivery" && !address)) {
		checkoutError.textContent = "Please complete the required order details.";
		return;
	}
	const lines = cart.map(entry => {
		const item = MENU.find(menuItem => menuItem.name === entry.name);
		const lineTotal = item ? toNaira(item.price) * entry.quantity : 0;
		return `${entry.quantity} × ${entry.name} — ${formatMoney(lineTotal)}`;
	}).join("\n");
	const total = formatMoney(getCartTotalValue());
	const serviceLabel = orderSelection.type === "delivery" ? "Delivery" : "Pickup";
	const message = `Hello Ofada Heaven, I'd like to place an order.\n\nOrder type: ${serviceLabel}\n\nItems:\n${lines}\n\nItems total: ${total}\nDelivery fee: ${orderSelection.type === "delivery" ? "To be confirmed by the restaurant" : "Not applicable"}\n\nName: ${name}\nPhone: ${phone}\nDelivery address: ${address || "Not applicable"}\n\nNotes: ${notes || "None"}\n\nPlease confirm availability and the final amount.`;
	const channel = event.submitter?.value || "whatsapp";

	if (channel === "email" && ORDER_EMAIL) {
		const subject = encodeURIComponent("Ofada Heaven order request");
		const body = encodeURIComponent(message);
		window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
	} else if (channel === "email") {
		checkoutError.textContent = "An order email address has not been configured yet. Please choose WhatsApp.";
		return;
	} else {
		const query = new URLSearchParams({ text: message });
		window.open(`https://wa.me/${ORDER_PHONE}?${query}`, "_blank", "noopener,noreferrer");
	}
	closeCheckoutModal();
	closeCart();
}

function renderCart() {
	const itemCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
	const total = getCartTotalValue();
	const menuHref = location.pathname.endsWith("menu.html") ? "#fullMenu" : location.pathname.endsWith("index.html") ? "#menu" : "menu.html";
	document.querySelectorAll(".cart-count").forEach(badge => { badge.textContent = itemCount; });
	headerCart.setAttribute("aria-label", `Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
	if (cartTotal) cartTotal.textContent = formatMoney(total);
	if (cartSummaryNote) cartSummaryNote.textContent = cart.length ? `Order total: ${formatMoney(total)}` : "Add a few favourites and send them together in one message.";
	cartItems.innerHTML = cart.length ? cart.map(entry => {
		const item = MENU.find(menuItem => menuItem.name === entry.name);
		return `<article class="cart-item"><img src="${item.image}" alt="" width="80" height="80"><div class="cart-item-copy"><strong>${item.name}</strong><small>${item.price}</small><div class="cart-quantity" aria-label="Quantity for ${item.name}"><button type="button" data-cart-action="decrease" data-item="${item.name}" aria-label="Remove one ${item.name}">−</button><span>${entry.quantity}</span><button type="button" data-cart-action="increase" data-item="${item.name}" aria-label="Add one ${item.name}">+</button></div></div><button type="button" class="cart-remove" data-cart-action="remove" data-item="${item.name}" aria-label="Remove ${item.name} from cart">×</button></article>`;
	}).join("") : `<div class="cart-empty"><span aria-hidden="true">＋</span><h3>Your cart is waiting.</h3><p>Add a few favourites and send them together in one message.</p><a href="${menuHref}" class="btn btn-outline cart-empty-link">Explore the menu</a></div>`;
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
	const mobileCartTrigger = document.querySelector(".mobile-cart-trigger");
	const focusTarget = mobileCartTrigger?.getClientRects().length ? mobileCartTrigger : headerCart;
	focusTarget.focus();
	document.body.classList.remove("cart-open");
	cartDrawer.setAttribute("aria-hidden", "true");
	cartDrawer.inert = true;
	cartBackdrop.hidden = true;
}

document.addEventListener("click", event => {
	const checkoutButton = event.target.closest(".cart-checkout");
	if (checkoutButton) {
		openCheckoutModal();
		return;
	}

	const checkoutOption = event.target.closest(".checkout-option");
	if (checkoutOption) {
		setOrderType(checkoutOption.dataset.orderType);
		return;
	}

	if (event.target.closest("[data-checkout-close]")) {
		closeCheckoutModal();
		return;
	}
	if (event.target === checkoutModal) {
		closeCheckoutModal();
		return;
	}

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

checkoutForm.addEventListener("submit", submitOrder);

document.addEventListener("keydown", event => {
	if (!checkoutModal.hidden && event.key === "Escape") {
		event.preventDefault();
		closeCheckoutModal();
		return;
	}
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
		render("#foodGrid", event.target.dataset.category, 3);
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

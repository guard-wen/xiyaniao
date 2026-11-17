const body = document.body;
const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const backToTop = document.querySelector(".back-to-top");
const productDialog = document.querySelector("#product-dialog");
const contactDialog = document.querySelector("#contact-dialog");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
const heroMedia = document.querySelector(".hero__media");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const products = {
  arc: {
    name: "弧光",
    code: "ARC / 01",
    eyebrow: "UNISEX COLLECTION",
    description:
      "干净利落的方扣与细腻哑光表面，让基础款拥有恰到好处的存在感。适合高腰裤、西装与宽松牛仔的日常组合。",
    width: "3.2 cm",
    color: "焦糖棕 / 墨黑 / 奶油白",
    image: "assets/illustrations/belt-arc.svg",
    alt: "弧光系列浅棕色极简方扣 PU 腰带",
    tone: "#c5aa84",
  },
  grid: {
    name: "网格",
    code: "GRID / 02",
    eyebrow: "MEN'S COLLECTION",
    description:
      "以双针结构呼应建筑感线条，深色带身在视觉上更利落。可通勤，也可作为街头造型的低调重点。",
    width: "3.8 cm",
    color: "墨黑 / 石墨灰 / 深咖",
    image: "assets/illustrations/belt-grid.svg",
    alt: "网格系列黑色双针扣 PU 腰带",
    tone: "#333330",
  },
  orbit: {
    name: "轨道",
    code: "ORBIT / 03",
    eyebrow: "WOMEN'S COLLECTION",
    description:
      "流线圆弧扣配合纤细带身，在柔和与力量之间取得平衡。适合连衣裙外系、高腰阔腿裤和短款上衣。",
    width: "2.8 cm",
    color: "酒红 / 黑银 / 奶油金",
    image: "assets/illustrations/belt-orbit.svg",
    alt: "轨道系列酒红色流线扣 PU 腰带",
    tone: "#85332d",
  },
  loop: {
    name: "回环",
    code: "LOOP / 04",
    eyebrow: "WOMEN'S COLLECTION",
    description:
      "小尺寸方扣与柔粉色调带来轻盈层次，适合低腰牛仔、短裙与轻薄春装，让日常搭配多一点松弛感。",
    width: "2.5 cm",
    color: "藕粉 / 沙米 / 雾白",
    image: "assets/illustrations/belt-arc.svg",
    alt: "回环系列藕粉色迷你方扣 PU 腰带",
    tone: "#cfa3a1",
  },
  tension: {
    name: "张力",
    code: "TENSION / 05",
    eyebrow: "MEN'S COLLECTION",
    description:
      "窄版双针扣保留硬朗轮廓，同时减少视觉体量。适合休闲西裤、工装裤和层次感较强的街头造型。",
    width: "3.0 cm",
    color: "石墨灰 / 黑 / 岩棕",
    image: "assets/illustrations/belt-grid.svg",
    alt: "张力系列石墨灰窄版双针扣 PU 腰带",
    tone: "#90918c",
  },
  strata: {
    name: "层岩",
    code: "STRATA / 06",
    eyebrow: "UNISEX COLLECTION",
    description:
      "加宽带身与圆角扣头形成更有分量的视觉节奏。适合风衣、阔腿裤和大轮廓单品，男女皆可自由搭配。",
    width: "4.0 cm",
    color: "橄榄绿 / 砂灰 / 黑",
    image: "assets/illustrations/belt-orbit.svg",
    alt: "层岩系列橄榄绿宽版流线扣 PU 腰带",
    tone: "#6e7563",
  },
};

let activeProduct = null;

function setBodyLock() {
  const anyDialogOpen = productDialog.open || contactDialog.open;
  body.classList.toggle("is-locked", anyDialogOpen || mobileMenu.classList.contains("is-open"));
}

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "打开菜单");
  header.classList.remove("menu-open");
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  setBodyLock();
}

menuToggle.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "关闭菜单" : "打开菜单");
  header.classList.toggle("menu-open", willOpen);
  mobileMenu.classList.toggle("is-open", willOpen);
  mobileMenu.setAttribute("aria-hidden", String(!willOpen));
  setBodyLock();
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function updateScrollUI() {
  const scrollY = window.scrollY;
  header.classList.toggle("is-scrolled", scrollY > 36);
  backToTop.classList.toggle("is-visible", scrollY > window.innerHeight * 0.9);

  if (!reducedMotion.matches && scrollY < window.innerHeight * 1.2) {
    heroMedia.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0) scale(1.015)`;
  }
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".filter-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.remove("is-active"));
    button.classList.add("is-active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

function openProduct(productKey) {
  const product = products[productKey];
  if (!product) return;

  activeProduct = product;
  document.querySelector("#product-dialog-title").textContent = product.name;
  document.querySelector("#dialog-product-code").textContent = product.code;
  document.querySelector("#dialog-product-eyebrow").textContent = product.eyebrow;
  document.querySelector("#dialog-product-description").textContent = product.description;
  document.querySelector("#dialog-product-width").textContent = product.width;
  document.querySelector("#dialog-product-color").textContent = product.color;

  const image = document.querySelector("#dialog-product-image");
  image.src = product.image;
  image.alt = product.alt;
  document.querySelector(".product-dialog__visual").style.backgroundColor = product.tone;

  if (contactDialog.open) contactDialog.close();
  productDialog.showModal();
  setBodyLock();
}

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => openProduct(button.dataset.product));
});

function openContact(event) {
  const fromProduct = Boolean(event?.currentTarget.closest("#product-dialog"));
  if (!fromProduct) activeProduct = null;
  closeMenu();
  if (productDialog.open) productDialog.close();
  formStatus.textContent = "";
  contactDialog.showModal();
  setBodyLock();
}

document.querySelectorAll("[data-open-contact]").forEach((button) => {
  button.addEventListener("click", openContact);
});

document.querySelectorAll(".dialog__close").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

[productDialog, contactDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", setBodyLock);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = String(data.get("name") || "").trim();
  const company = String(data.get("company") || "").trim() || "暂未填写";
  const contact = String(data.get("contact") || "").trim();
  const type = String(data.get("type") || "").trim();
  const message = String(data.get("message") || "").trim() || "希望进一步了解产品与定制合作。";
  const productLine = activeProduct ? `意向产品：${activeProduct.name} ${activeProduct.code}\n` : "";

  const subject = encodeURIComponent(`喜雅鸟合作咨询｜${type}｜${name}`);
  const mailBody = encodeURIComponent(
    `你好，喜雅鸟团队：\n\n${productLine}联系人：${name}\n品牌 / 公司：${company}\n联系电话 / 微信：${contact}\n合作类型：${type}\n\n需求描述：\n${message}\n\n期待沟通，谢谢。`,
  );

  formStatus.textContent = "正在打开邮件客户端，请确认内容后发送。";
  window.location.href = `mailto:hello@xiyaniao.com?subject=${subject}&body=${mailBody}`;
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) closeMenu();
});

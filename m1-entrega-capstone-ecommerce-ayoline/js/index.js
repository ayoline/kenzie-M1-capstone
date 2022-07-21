const main = document.querySelector('.main-box');
const insideCart = document.querySelector('.aside-content-box');
const qtProducts = document.querySelector('.aside-quantity-value');
const totalPrice = document.querySelector('.aside-total-value');
const menuTags = document.querySelector('.menu-second-column');
const inputSearch = document.querySelector('.aside-input-search');
const btnSearch = document.querySelector('.aside-btn-search');
const cartItens = [];
let qtProductsInt = 0;
let totalPriceVal = 0;
let cartItensCount = 20;

menuTags.addEventListener('click', searchByTag);

btnSearch.addEventListener('click', searchByInput);

main.addEventListener('click', function (event) {
  if (event.target.id === '') return;

  addItemToCart(event.target.id);
  cartItensCount++;
});

insideCart.addEventListener('click', function (event) {
  if (event.target.id === '') return;

  removeCartItem(event.target.id);
});

function renderMainBox(arrData) {
  main.innerHTML = '';

  for (let i = 0; i < arrData.length; i++) {
    const el = arrData[i];

    populateCard(el);
  }
}

function searchByInput(event) {
  const currentVal = inputSearch.value.trim().toLowerCase();
  const arrSearch = [];
  if (currentVal === '') return;

  for (let i = 0; i < data.length; i++) {
    const el = data[i];

    if (el.nameItem.toLowerCase().includes(currentVal)) arrSearch.push(el);
  }

  inputSearch.value = '';
  renderMainBox(arrSearch);
}

function searchByTag(event) {
  const currentVal = event.target.innerText;
  const arrSearch = [];
  if (currentVal === '') return;

  if (currentVal === 'Todos') return renderMainBox(data);

  for (let i = 0; i < data.length; i++) {
    const el = data[i];

    if (el.tag[0].includes(currentVal)) arrSearch.push(el);
  }

  renderMainBox(arrSearch);
}

function addItemToCart(id) {
  let produto = data.find(function (prod) {
    if (prod.id == id) return prod;
  });
  produto.cartId = cartItensCount;

  let clone = JSON.parse(JSON.stringify(produto));
  clone.cartId = cartItensCount;

  cartItens.push(clone);

  const currentItem = cartItens[cartItens.length - 1];

  populateObjCart(currentItem);

  qtProductsInt++;
  qtProducts.innerHTML = `${qtProductsInt}`;

  totalPriceVal += currentItem.value;
  totalPrice.innerHTML = `R$ ${totalPriceVal},00`;
}

function removeCartItem(cartId) {
  const indexToRemove = cartItens.findIndex((x) => x.cartId == cartId);
  totalPriceVal -= cartItens[indexToRemove].value;
  cartItens.splice(indexToRemove, 1);

  qtProductsInt--;
  qtProducts.innerHTML = `${qtProductsInt}`;
  totalPrice.innerHTML = `R$ ${totalPriceVal},00`;

  insideCart.innerHTML = '';
  for (let i = 0; i < cartItens.length; i++) {
    const el = cartItens[i];

    populateObjCart(el);
  }
}

function populateCard(obj) {
  const card = document.createElement('section');
  card.className = 'card';
  const el = obj;

  card.innerHTML = `
  <img class="card-img" src="${el.img}" alt="">
  <div class="card-body">
    <p class="card-tag">${el.tag}</p>
    <p class="card-title">${el.nameItem}</p>
    <p class="card-description">${el.description}</p>
    <p class="card-price">R$ ${el.value}</p>
    <p id="${el.id}" class="card-add-to-cart">${el.addCart}</p>
  </div>
`;
  main.appendChild(card);
}

function populateObjCart(obj) {
  const cardToCart = document.createElement('section');
  cardToCart.className = 'aside-card-box';

  cardToCart.innerHTML = `
  <img class="aside-card-img" src="${obj.img}" alt="">
  <div class="aside-card-body">
    <p class="aside-card-title">${obj.nameItem}</p>
    <p class="aside-card-price">R$ ${obj.value}</p>
    <p class="aside-card-remove" id=${obj.cartId}>Remover produto</p>
  </div>
`;

  insideCart.appendChild(cardToCart);
}

renderMainBox(data);

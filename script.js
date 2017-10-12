  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const resetBtn = document.querySelector('[type=button]');
  let items = JSON.parse(localStorage.getItem('items')) || [];

  const dateTitle = document.querySelector('h2');
  const date = Date().toString().split(' ').splice(1,2).join(' ');
  dateTitle.innerHTML = date;

  function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
  }

  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
  }

  function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }

  function clearList(e) {
    items = [];
    populateList(items, itemsList);
  }

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  resetBtn.addEventListener('click', clearList);

  populateList(items, itemsList);
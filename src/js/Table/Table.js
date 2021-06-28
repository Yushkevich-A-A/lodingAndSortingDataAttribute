export default class Table {
  constructor(data = null) {
    this.data = data;
    this.paramDataSet = Object.keys(this.data[0]);
    this.index = 0;

    this.drawTable();
  }

  drawTable() {
    this.table = document.createElement('table');
    this.table.classList.add('table');
    this.table.innerHTML = `<thead class="thead"></thead>
                              <tbody class="tbody"></tbody>`;

    document.body.appendChild(this.table);

    if (this.data == null) {
      return;
    }
    const trHead = document.createElement('tr');
    const arrKeys = Object.keys(this.data[0]);
    for (const i of arrKeys) {
      const th = document.createElement('th');
      th.dataset.thTitle = i;
      th.textContent = i;
      trHead.appendChild(th);
    }
    document.querySelector('.thead').appendChild(trHead);

    for (const item of this.data) {
      item.imdb = item.imdb.toFixed(2);
      const trData = document.createElement('tr');
      trData.innerHTML = `<td>#${item.id}</td>
                        <td>${item.title}</td>
                        <td>imdb:${item.imdb}</td>
                        <td>(${item.year})</td>`;

      for (const i of Object.keys(item)) {
        trData.dataset[i] = item[i];
      }
      this.tbody = document.querySelector('.tbody');
      this.tbody.appendChild(trData);

      this.sortMethod();
    }
  }

  drawTBody(sortData) {
    for (const i of sortData) {
      this.tbody.appendChild(i);
    }
  }

  sortMethod() {
    if (this.index === this.paramDataSet.length) {
      this.index = 0;
    }
    const parametr = this.paramDataSet[this.index];
    this.sortTimeout(parametr);
  }

  sortTimeout(param) {
    const arr = Array.from(this.tbody.children);
    const testVal = document.querySelector(`[data-${param}]`).dataset[param];
    if (typeof parseFloat(testVal) === 'number') {
      setTimeout(() => {
        arr.sort((a, b) => a.dataset[param] - b.dataset[param]);
        this.drawTBody(arr);
        setTimeout(() => {
          arr.sort((a, b) => b.dataset[param] - a.dataset[param]);
          this.drawTBody(arr);
          this.index++;
          this.sortMethod();
        }, 2000);
      }, 2000);
    } else {
      setTimeout(() => {
        arr.sort((a, b) => ((a.dataset[param] > b.dataset[param]) ? 1
          : (a.dataset[param] < b.dataset[param]) ? -1
            : 0));
        this.drawTBody(arr);
        setTimeout(() => {
          arr.sort((a, b) => ((a.dataset[param] > b.dataset[param]) ? -1
            : (a.dataset[param] < b.dataset[param]) ? 1
              : 0));
          this.drawTBody(arr);
          this.index++;
          this.sortMethod();
        }, 2000);
      }, 2000);
    }
  }
}

export default class Table {
  constructor(data = null) {
    this.data = data;
    this.paramDataSet = ['id','title','year', 'imdb'];
    this.index = 0;

    this.drawTable();
  }

  drawTable() {
    this.table = document.createElement('table');
    this.table.classList.add('table');
    this.table.innerHTML = `<thead class="thead"></thead>  
                            <tbody class="tbody"></tbody>`;

    document.body.appendChild(this.table);

    this.thead = document.querySelector('.thead');

    const trHead = document.createElement('tr');
    for(let i of this.paramDataSet) {
      const th = document.createElement('th');
      th.dataset.columnType = i;
      th.dataset.th = 'th';
      th.textContent = i;
      trHead.appendChild(th);
    }

    this.thead.appendChild(trHead);


    
    if (this.data == null) {
      return;
    }

    for (const item of this.data) {
      item.imdb = item.imdb.toFixed(2);
      const trData = document.createElement('tr');
      trData.innerHTML = `<td>#${item.id}</td>
                        <td>${item.title}</td>
                        <td>(${item.year})</td>
                        <td>imdb:${item.imdb}</td>`;

      for (const i of this.paramDataSet) {
        trData.dataset[i] = item[i];
      }
      this.tbody = document.querySelector('.tbody');
      this.tbody.appendChild(trData);
    }
    this.sortTimeout();
  }

  drawTBody(sortData) {
    for (const i of sortData) {
      this.tbody.appendChild(i);
    }
  }

  sortTimeout() {
    if (this.index === this.paramDataSet.length) {
      this.index = 0;
    }
    const param = this.paramDataSet[this.index];
    const arr = Array.from(this.tbody.children);
    setTimeout(() => {
      arr.sort((a, b) => this.funcSort(a.dataset[param], b.dataset[param]));
      this.drawTBody(arr);
      this.drawArrow(param, true);
      setTimeout(() => {
        arr.reverse();
        this.drawTBody(arr);
        this.drawArrow(param);
        this.index++;
        this.sortTimeout();
      }, 2000);
    }, 2000);
  }

  funcSort(a, b) {
  const valA = (isNaN(parseFloat(a))) ? a: parseFloat(a);
  const valB = (isNaN(parseFloat(b))) ? b: parseFloat(b);
  if (valA > valB) {
    return 1;
  }
  if (valA < valB) {
    return -1;
  }
  return 0;
  }

  drawArrow(column, arrowUp = false) {
    const arrColumnTitle = document.querySelectorAll('[data-th="th"]');
    for (let i of arrColumnTitle) {
      i.classList.remove('increase', 'decrease');
    }

    const columnElement = document.querySelector(`[data-column-type="${column}"]`);

    if(arrowUp) {
      columnElement.classList.add('decrease');
    } else {
      columnElement.classList.add('increase');
    }
  }
}

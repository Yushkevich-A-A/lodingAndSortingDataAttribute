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

      if(this.data == null) {
        return;
      }
      const tr = document.createElement('tr');
      const arrKeys = Object.keys(this.data[0])
      for(let i of arrKeys) {
        const th = document.createElement('th');
        th.dataset.thTitle = i
        th.textContent = i;
        tr.appendChild(th);
      }
      
      document.querySelector('.thead').appendChild(tr);

      for(let item of this.data) {
        item.imdb = item.imdb.toFixed(2);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>#${item.id}</td>
                        <td>${item.title}</td>
                        <td>imdb:${item.imdb}</td>
                        <td>(${item.year})</td>`
                        
        for(let i of Object.keys(item)) {
          tr.dataset[i] = item[i];
        }
        this.tbody = document.querySelector('.tbody');
        this.tbody.appendChild(tr);

        this.sortMethod();
      }
    }

    drawTBody(sortData) {
      for(let i of sortData) {
        this.tbody.appendChild(i);
      }
    }

    sortMethod() {
      if (this.index === this.paramDataSet.length) {
        this.index = 0;
      }
      const parametr = this.paramDataSet[this.index];
      this.sortTimeout(parametr)
    }

    sortTimeout(param) {
      const arr = Array.from(this.tbody.children);
      const testVal = document.querySelector(`[data-${param}]`).dataset[param];
      if (isNaN(parseFloat(testVal))) {
        setTimeout(() => {
          arr.sort((a, b) => {
            return (a.dataset[param] > b.dataset[param]) ?  1 :
                    (a.dataset[param] < b.dataset[param]) ? -1 : 
                    0;
          });
          this.drawTBody(arr);
          setTimeout(() => {
            arr.sort((a, b) => {
              return (a.dataset[param] > b.dataset[param]) ? -1 :
                     (a.dataset[param] < b.dataset[param]) ? 1 : 
                      0;
            })
            this.drawTBody(arr);
            this.index++;
            this.sortMethod();
          }, 2000);
        }, 2000);
      } else {
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
      }
    }
}
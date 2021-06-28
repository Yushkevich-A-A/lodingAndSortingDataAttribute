export default class Table {
  constructor(data = null) {
    this.data = data;
    this.thead = document.querySelector('.thead');
    this.tbody = document.querySelector('.tbody');
    this.index = 0;

    this.sortParametr = [
      {
        param: 'id',
        func: (a, b) => a.dataset.id - b.dataset.id,
      },
      {
        param: 'id',
        func: (a, b) => b.dataset.id - a.dataset.id,
      },
      {
        param: 'title',
        func: (a, b) => a.dataset.title > b.dataset.title,
      },
      {
        param: 'title',
        func: (a, b) => a.dataset.title < b.dataset.title,
      },
      {
        param: 'imdb',
        func: (a, b) => a.dataset.imdb - b.dataset.imdb,
      },
      {
        param: 'imdb',
        func: (a, b) => b.dataset.imdb - a.dataset.imdb,
      },
      {
        param: 'year',
        func: (a, b) => a.dataset.year - b.dataset.year,
      },
      {
        param: 'yaer',
        func: (a, b) => b.dataset.year - a.dataset.year,
      },
    ];

    this.drawTable();
    this.sortInterval();
    }

    sortInterval() {
      if (this.index === this.sortParametr.length) {
        this.index = 0;
      }
      setTimeout(() => {
        console.log(this.sortParametr);
        this.sort(this.sortParametr[this.index].param, this.sortParametr[this.index].func);
        this.index++;
        this.sortInterval();
      }, 2000);
    }

    drawTable() {
      if(this.data == null) {
        return;
      }
      this.drawTHead();
      this.drawTBody();
    }



    drawTHead() {
      const tr = document.createElement('tr');
      const arrKeys = Object.keys(this.data[0])
      for(let i of arrKeys) {
        const th = document.createElement('th');
        th.dataset.thTitle = i
        console.log(i)
        th.textContent = i;
        tr.appendChild(th);
      }

      this.thead.appendChild(tr);
    }

    drawTBody() {
      for(let item of this.data) {
        const tr = document.createElement('tr');
        for(let i of Object.keys(item)) {
          tr.dataset[i] = item[i];
          const td = document.createElement('td');
          td.textContent = item[i];
          tr.appendChild(td);
        }

        this.tbody.appendChild(tr);
      }

    }

    sort( param, func = null) {
      this.sortParametrs = Array.from(document.querySelectorAll(`[data-${param}]`));
      
      this.sortParametrs.sort(func);
      for (let i of this.sortParametrs) {
        this.tbody.append(i);
      }


    }

}
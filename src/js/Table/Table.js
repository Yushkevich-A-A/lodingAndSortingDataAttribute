export default class Table {
  constructor(data = null) {
    this.data = data;
    this.thead = document.querySelector('.thead');
    this.tboby = document.querySelector('.tboby');

    this.drawTable();
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

        this.tboby.appendChild(tr);
      }

    }

}
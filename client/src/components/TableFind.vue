<template>
  <div class="row">
    <div class="input-field col s6 mb0">
      <i class="fa fa-search prefix"></i>
      <input type="text" id="search" v-model.trim="search" :class="{ 'grey-text': search.length < 3 }" />
      <label for="search">Поиск</label>
    </div>
    <div class="col s6">
      <button class="btn-small mt1 right white black-text waves-effect" @click="addBtnClick"><i class="fa fa-plus left"></i>Добавить</button>
    </div>
    <div class="col s12" v-if="headers">
      <table class="striped centered highlight responsive-table">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="header in headers" :key="header.name" @click="sort(header)">
              {{ header.title }}
              <i
                class="fa"
                :class="{ 'fa-arrow-down-a-z': header.direction === 'asc', 'fa-arrow-down-z-a': header.direction === 'desc' }"
                v-show="header.direction"
              ></i>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="data && data.length">
          <tr v-for="(row, inx) in searchTable" :key="inx">
            <td>{{ inx + 1 }}</td>
            <td v-for="col in headers" :key="col.name">
              <span v-if="col.dataType == 'html'" v-html="row[col.name]"></span>
              <span v-else>{{ row[col.name] }}</span>
            </td>
            <td class="valign-wrapper">
              <button
                class="btn-small white black-text waves-effect"
                type="button"
                @click.prevent="$emit('table-btn-click', { data: row, button: 'edit', index: inx })"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn-small white black-text waves-effect"
                type="button"
                @click.prevent="deleteBtnClick({ data: row, button: 'delete', index: inx })"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="isFooter">
          <tr>
            <td>#</td>
            <td v-for="(foot, inx) in footers" :key="inx" class="center">{{ foot }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    footers() {
      if (!this.isFooter || !this.searchTable.length) {
        return []
      }
      return this.headers.map((m) => {
        switch (m.foot) {
          case 'sum':
            let sum = this.searchTable.reduce((total, st) => total + Number.parseFloat(st[m.name]), 0)
            if (sum - Math.trunc(sum) > 0) {
              sum = sum.toFixed(2)
            } else {
              sum = Math.trunc(sum)
            }
            return sum
          case 'average':
            const average = (this.searchTable.reduce((total, st) => total + Number.parseFloat(st[m.name]), 0) / this.searchTable.length).toFixed(2)
            if (isNaN(average)) {
              return ''
            }
            return average
          default:
            return ''
        }
      })
    },
    isFooter() {
      if (!this.headers) {
        return false
      }
      return Boolean(this.headers.find((h) => h.foot))
    },
    searchTable() {
      if (!this.data || !this.data.length) {
        return []
      }
      if (this.search.length < 3) {
        return this.data
      }
      return this.data.filter((el) => {
        let searchString = ''
        this.headers.forEach((h) => {
          searchString += el[h.name] + ' '
        })
        return searchString.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  data: () => ({
    search: '',
  }),
  methods: {
    addBtnClick() {
      this.$emit('add-btn-click')
    },
    deleteBtnClick(e) {
      if (confirm('Вы уверены, что хотите удалить элемент?')) {
        this.$emit('table-btn-click', e)
      }
    },
    compareString(a, b, direction) {
      let result = 0
      if (direction === 'asc') {
        if (a > b) {
          result = 1
        }
        if (a < b) {
          result = -1
        }
      }
      if (direction === 'desc') {
        if (b > a) {
          result = 1
        }
        if (b < a) {
          result = -1
        }
      }
      return result
    },
    compareNumber(a, b, direction) {
      let result = 0
      a = Number.parseFloat(a)
      b = Number.parseFloat(b)
      a = isNaN(a) ? 0 : a
      b = isNaN(b) ? 0 : b
      if (direction === 'asc') {
        result = a - b
      }
      if (direction === 'desc') {
        result = b - a
      }
      return result
    },
    sort(header) {
      this.headers.forEach((h) => {
        if (h !== header) {
          delete h.direction
        }
      })
      const type = header.type ? header.type : 'string'
      header.direction = header.direction === 'asc' ? 'desc' : 'asc'
      this.data.sort((a, b) => {
        const aValue = a[header.name]
        const bValue = b[header.name]
        switch (type) {
          case 'string':
            return this.compareString(aValue, bValue, header.direction)
          case 'number':
            return this.compareNumber(aValue, bValue, header.direction)
          case 'date':
            return this.compareNumber(Date(aValue).valueOf(), Date(bValue).valueOf(), header.direction)
        }
      })
    },
  },
  props: ['headers', 'data'],
}
</script>

<style scoped>
th {
  cursor: pointer;
}
th,
td {
  padding-top: 2px;
  padding-bottom: 2px;
}
td button {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 0.5rem;
}
.nowrap {
  width: auto;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

tfoot td {
  /* text-align: right; */
  font-weight: bold;
}
</style>

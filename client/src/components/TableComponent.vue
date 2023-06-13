<template>
  <div class="row">
    <div class="col s12" v-if="tableButtons">
      <a
        v-for="tb in tableButtons"
        :key="tb.result"
        :class="tb.class"
        @click.prevent="tableBtnClick(tb.result)"
      >
        <i class="fa left" :class="'fa-' + tb.icon"></i><span class="hide-on-small-only">{{ tb.title }}</span>
      </a>
    </div>
    <div class="input-field col s12 m6" v-if="finder">
      <i class="fa fa-search prefix"></i>
      <input
        type="text"
        id="search"
        v-model.trim="search"
        :class="{ 'grey-text': search.length < minLengthFind }"
      />
      <label for="search">Поиск</label>
    </div>
    <div class="input-field col s6 m4" v-if="filters && filters.length">
      <i class="fa fa-filter prefix"></i>
      <select v-model="activeFilter" multiple ref="selectFilters">
        <optgroup v-for="f in filters" :key="f.title" :label="f.title">
          <option
            v-for="ff in f.filter"
            :key="ff"
            :value="{
              title: f.title,
              filter: ff,
              name: f.name,
            }"
          >
            {{ ff }}
          </option>
        </optgroup>
      </select>
      <label>Фильтры</label>
    </div>
    <div class="input-field col s6 m2" :class="{ 'offset-m4': !filters || !filters.length }" v-if="pages">
      <i class="fa fa-arrow-down-short-wide prefix"></i>
      <select v-model="rowsOnPage" @change="activePage = 1" ref="rowsOnPage">
        <option v-for="rp in rowsOnPageList" :key="rp" :value="rp">{{ rp }}</option>
      </select>
      <label>Строк в таблице</label>
    </div>
    <div class="col s12" v-if="headers">
      <table class="striped centered highlight">
        <thead>
          <tr>
            <th v-if="counter">#</th>
            <th v-if="checkbox"><i class="fa fa-toggle-on"></i></th>
            <th v-for="header in headers" :key="header.name" @click="sort(header)">
              {{ header.title }}
              <i
                class="fa"
                :class="{
                  'fa-arrow-down-a-z': header.direction == 'asc',
                  'fa-arrow-down-z-a': header.direction == 'desc',
                }"
                v-show="header.direction"
              ></i>
            </th>
            <th v-if="rowButtons"></th>
          </tr>
        </thead>
        <tbody v-if="rowsData && rowsData.length">
          <tr v-for="(row, inx) in rowsPage" :key="inx">
            <td v-if="counter">{{ inx + 1 }}</td>
            <td v-if="checkbox">
              <div class="switch">
                <label>
                  <input type="checkbox" v-model="checkRows[inx]" />
                  <span class="lever"></span>
                </label>
              </div>
            </td>
            <td
              v-for="col in headers"
              :key="col.name"
              :class="(col.class ? col.class + ' ' : '') + (row.class ? row.class : '')"
            >
              <span data-r="1" v-if="col.out == 'html'" v-html="row[col.name]"></span>
              <span data-r="2" v-else-if="col.out == 'url'"
                ><a :href="row[col.name]" target="_blink">{{ row[col.name] }}</a></span
              >
              <span v-else>{{ row[col.name] }}</span>
            </td>
            <td class="valign-wrapper right" v-if="rowButtons">
              <a
                v-for="rb in rowButtons"
                :key="rb.result"
                :class="rb.class"
                @click.prevent="
                  $emit('row-btn-click', { data: row, button: rb.result, index: inx, checked: checkRows[inx] })
                "
              >
                <i class="fa" :class="'fa-' + rb.icon"></i>
                <span class="hide-on-small-only">{{ rb.title }}</span>
              </a>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="isFooter">
          <tr>
            <td v-if="counter">#</td>
            <td v-for="(foot, inx) in footers" :key="inx" class="center">{{ foot }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="col s12 center" v-if="pages">
      <ul class="pagination">
        <li
          :class="{ disabled: activePage == 1, 'waves-effect': activePage != 1 }"
          @click="setPage(activePage - 1)"
        >
          <a href="#!"><i class="fa fa-chevron-left"></i></a>
        </li>
        <li
          v-for="inx in numberOfPages"
          :key="inx"
          :class="{ active: activePage == inx, 'waves-effect': activePage != inx }"
          @click="setPage(inx)"
        >
          <a href="#!">{{ inx }}</a>
        </li>
        <li
          :class="{ disabled: activePage == numberOfPages, 'waves-effect': activePage != numberOfPages }"
          @click="setPage(activePage + 1)"
        >
          <a href="#!"><i class="fa fa-chevron-right"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  beforeDestroy() {
    if (this.selectRowsOnPage && this.selectRowsOnPage.destroy) {
      this.selectRowsOnPage.destroy()
    }
    if (this.selectFilters && this.selectFilters.destroy) {
      this.selectFilters.destroy()
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.rowsTable.length / this.rowsOnPage)
    },
    filters() {
      if (!this.headers || !this.rowsData) {
        return []
      }
      return this.headers
        .filter((f) => f.filter)
        .map((h) => {
          if (h.filter) {
            const filterGroup = {
              title: h.title,
              name: h.filter,
              filter: [],
            }

            this.rowsData.forEach((d) => {
              if (!filterGroup.filter.includes(d[h.filter])) {
                filterGroup.filter.push(d[h.filter])
              }
            })

            return filterGroup
          }
          return false
        })
    },
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
            const average = (
              this.searchTable.reduce((total, st) => total + Number.parseFloat(st[m.name]), 0) /
              this.searchTable.length
            ).toFixed(2)
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
    rowsTable() {
      this.checkRows = []
      return this.searchRows(this.filterRows(this.tdata, this.activeFilter), this.search)
    },
    rowsPage() {
      if (this.pages) {
        return this.rowsTable.slice(this.rowsOnPage * (this.activePage - 1), this.rowsOnPage * this.activePage)
      }
      return this.rowsTable
    },
    /*
    searchTable() {
      if (!this.tdata || !this.tdata.length) {
        return []
      }

      let filtredData = this.tdata
      if (this.activeFilter && this.activeFilter.length) {
        filtredData = this.tdata.filter((el) => {
          return this.activeFilter.filter((af) => el[af.name] == af.filter).length
          //return this.activeFilter.filter((af) => el[af.name] == af.filter).length == this.activeFilter.length
        })
      }

      if (this.search.length < this.minLengthFind) {
        return filtredData.slice(this.rowsOnPage * (this.activePage - 1), this.rowsOnPage * this.activePage)
      }
      return filtredData
        .filter((el) => {
          let searchString = ''
          this.headers.forEach((h) => {
            searchString += el[h.name] + ' '
          })
          return searchString.toLowerCase().includes(this.search.toLowerCase())
        })
        .slice(this.rowsOnPage * (this.activePage - 1), this.rowsOnPage * this.activePage)
    },
    */
  },
  data: () => ({
    search: '',
    activeFilter: [],
    activePage: 1,
    selectRowsOnPage: null,
    selectFilters: null,
    rowsOnPage: 1,
    tdata: [],
    checkRows: [],
  }),
  methods: {
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
      this.tdata.sort((a, b) => {
        const sortField = header.sort ? header.sort : header.name
        const aValue = a[sortField]
        const bValue = b[sortField]
        switch (type) {
          case 'string':
            return this.compareString(aValue, bValue, header.direction)
          case 'number':
            return this.compareNumber(aValue, bValue, header.direction)
          case 'date':
            return this.compareNumber(new Date(aValue).valueOf(), new Date(bValue).valueOf(), header.direction)
        }
      })
    },
    setPage(page) {
      this.activePage = page < 1 ? 1 : page > this.numberOfPages ? this.numberOfPages : page
    },
    filterRows(arrData, filters) {
      if (!filters.length) {
        return arrData
      }
      return arrData.filter((el) => {
        return this.activeFilter.filter((af) => el[af.name] == af.filter).length
        //return this.activeFilter.filter((af) => el[af.name] == af.filter).length == this.activeFilter.length
      })
    },
    searchRows(arrData, search) {
      if (search.length < this.minLengthFind) {
        return arrData
      }
      return arrData.filter((el) => {
        let searchString = ''
        this.headers.forEach((h) => {
          searchString += el[h.name] + ' '
        })
        return searchString.toLowerCase().includes(search.toLowerCase())
      })
    },
    tableBtnClick(event) {
      const checkedRows = this.tdata.filter((td, inx) => this.checkRows[inx])
      this.$emit('table-btn-click', { button: event, checkRows: checkedRows })
    },
  },
  props: [
    'headers',
    'rowsData',
    'finder',
    'minLengthFind',
    'counter',
    'checkbox',
    'pages',
    'startRowsOnPage',
    'rowsOnPageList',
    'rowButtons',
    'tableButtons',
  ],
  mounted() {
    this.tdata = this.rowsData.map((d) => d)
    this.rowsOnPage = this.startRowsOnPage
    //
    this.selectFilters = M.FormSelect.init(this.$refs.selectFilters)
    setTimeout(() => {
      this.selectRowsOnPage = M.FormSelect.init(this.$refs.rowsOnPage)
    }, 0)
  },
  watch: {
    rowsData() {
      this.tdata = this.rowsData.map((d) => d)
    },
  },
}
</script>

<style scoped>
@media only screen and (max-width: 992px) {
  table {
    display: block;
    overflow-x: auto;
  }
}
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
.filter {
  margin-top: 1rem;
}
tfoot td {
  font-weight: bold;
}
</style>

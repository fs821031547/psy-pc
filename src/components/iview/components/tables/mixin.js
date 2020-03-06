import EditSelect from './components/select'
import EditLink from './components/link'
import EditDatePicker from './components/datePicker'
import EditRadio from './components/radio'
import EditNumber from './components/input_number'
import EditCheckBox from './components/checkbox'
import MutiRow from './components/mutiRow'
import EditInput from './components/input'

export default {
  methods: {
    suportEdit (item, index, data) {
      let options = {}
      let self = this
      item.className = 'iv-table-edit'
      item.render = (h, params) => {
        options = {}
        options.props = item.options ? item.options : {}
        options.props.keyValue = item.key
        options.props.value = this.data[params.index][item.key]
        options.props.index = params.index
        switch (item.edittype) {
          case 'input':
            return h(EditInput, options)
          case 'link':
            return h(EditLink, options)
          case 'select':
            return h(EditSelect, options)
          case 'datePicker':
            return h(EditDatePicker, options)
          case 'checkbox':
            return h(EditCheckBox, options)
          case 'radio':
            options.on = {
              'on-change': function (_index) {
                self.data.filter((v, i) => {
                  let arr = v
                  if (i !== _index) {
                    arr[item.key] = false
                  } else {
                    arr[item.key] = true
                  }
                  return arr
                })
              }
            }
            return h(EditRadio, options)
          case 'number':
            return h(EditNumber, options)
        }
      }
      return item
    },
    suportMutiRow (item, index) {
      let options = {}
      item.render = (h, params) => {
        options.props = Object.assign({}, params.column, params.row)
        options.props.size = this.size
        if (params.row.list && params.row.list.length > 1) return h(MutiRow, options)
        else return h('span', params.row.list[0][params.column.subKey])
      }
      return item
    },
    remove (index, data) {
      data.splice(index, 1)
    },
    handleColumns (columns, data) {
      if (!columns) return false
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(item, index, data)
        if (res.multiRow) res = this.suportMutiRow(item, index, data)
        return res
      })
    }
  }
}

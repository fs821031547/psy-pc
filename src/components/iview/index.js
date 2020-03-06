import './less/table.less'
import * as tables from './components/tables'
const components = {
  ...tables
}
export default {
  install: Vue => {
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
  }
}

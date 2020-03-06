export default [
  {
    path: '/examples/table',
    name: 'examples-table',
    meta: {
      title: 'text',
      hideInMenu: true
    },
    component: require('@/components/iview/examples/tabel/index.vue').default
  },
  {
    path: '/operator/sup_edit',
    name: 'examples-table',
    meta: {
      title: 'text',
      hideInMenu: true
    },
    component: require('@/view/operator/supplier/sup_edit').default
  },
  {
    path: '/operator/supplier/sup_edit',
    name: 'examples-table',
    component: require('@/view/operator/supplier/sup_edit').default
  },
  {
    path: '/examples/product',
    name: 'examples-product',
    meta: {
      title: 'text',
      hideInMenu: true
    },
    component: require('@/components/iview/examples/product/product.vue').default
  }
]

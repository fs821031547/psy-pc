<template>
  <div class="container">
    <iv-layout>
      <div slot="main">
        <Row>
          <Col span="24">
            <iv-table v-model="areaData" :columns="areaData.columns" border></iv-table>
          </Col>
          <Col span="24" style="padding-top: 8px;">
            <Button icon="md-add" @click="addProduct('area')" type="primary" style="width: 160px;">
              <strong>添加</strong>
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="24">
            <iv-table v-model="hotelData" :columns="hotelData.columns"></iv-table>
          </Col>
          <Col span="24" style="padding-top: 8px;">
            <Button icon="md-add" @click="addProduct('hotel')" type="primary" style="width: 160px;">
              <strong>添加</strong>
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="24">
            <iv-table v-model="restaurantData" :columns="restaurantData.columns"></iv-table>
          </Col>
          <Col span="24" style="padding-top: 8px;">
            <Button icon="md-add" @click="addProduct('restaurant')" type="primary" style="width: 160px;">
              <strong>添加</strong>
            </Button>
          </Col>
        </Row>
        <br />
         <Row>
          <Col span="24">
            <iv-table v-model="carData" :columns="carData.columns"></iv-table>
          </Col>
          <Col span="24" style="padding-top: 8px;">
            <Button icon="md-add" @click="addProduct('car')" type="primary" style="width: 160px;">
              <strong>添加</strong>
            </Button>
          </Col>
        </Row>
      </div>
      <div slot="foot" style="text-align: center">
        <Button style="width: 80px;" type="primary">保存</Button>
        <Button type="primary">保存并安排</Button>
        <Button style="width: 80px;">关闭</Button>
      </div>
    </iv-layout>
    <product-edit
      v-model="drawerValue"
      isType="isType"
      isEdit="isEdit"
    ></product-edit>
  </div>
</template>
<script>
import ProductEdit from './product-edit'
export default {
  data () {
    return {
      isType: 'area',
      isEdit: false,
      drawerValue: false,
      areaData: {
        data: [
          {
            scenicProduct: '长隆欢乐世界',
            tags: ['5星'],
            list: [
              { mode: '全票', cost: 200, offer: 400, marketValue: 400 },
              { mode: '儿童票', cost: 150, offer: 200, marketValue: 200 },
              { mode: '半价票', cost: 100, offer: 400, marketValue: 400 }
            ]
          },
          {
            scenicProduct: '广东省广州市长隆欢乐世界股份有限公司.',
            tags: ['4星'],
            list: [
              { mode: '全票', cost: '180', offer: '350', marketValue: '350' }
            ]
          }
        ],
        columns: [
          {
            title: '序',
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '景区产品',
            key: 'scenicProduct'
          },
          {
            title: '标签',
            key: 'tags'
          },
          {
            title: '规格',
            multiRow: true,
            key: 'list',
            subKey: 'mode'
          },
          {
            title: '成本',
            multiRow: true,
            key: 'list',
            subKey: 'cost'
          },
          {
            title: '报价',
            multiRow: true,
            key: 'list',
            subKey: 'offer'
          },
          {
            title: '市场价',
            multiRow: true,
            key: 'list',
            subKey: 'marketValue'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            transfer: true,
            width: 180,
            align: 'center',
            render: (h, params) => {
              return (
                <div>
                  <i-button size='small' style={{ marginRight: '5px' }} onClick={this.editProduct.bind(this, params, 'area')}>编辑</i-button>
                  <poptip confirm transfer placement="bottom-end" title='确认要删除这条内容吗?' onOn-ok={this.delProduct.bind(this, params, 'area')}>
                    <i-button size='small' style={{ marginRight: '5px' }}>删除</i-button>
                  </poptip>
                </div>
              )
            }
          }
        ]
      },
      hotelData: {
        data: [
          {
            id: 3,
            product: '喜来登酒店',
            tags: ['5星'],
            list: [
              { mode: '标双', cost: '200', offer: '400', marketValue: '400', room: '', bed: '', people: '' },
              { mode: '三人间', cost: '150', offer: '200', marketValue: '200', room: '', bed: '', people: '' }
            ]
          },
          {
            id: 4,
            product: '维也纳酒店',
            tags: ['4星'],
            list: [
              { mode: '标双', cost: '180', offer: '350', marketValue: '350', room: '', bed: '', people: '' }
            ]
          }
        ],
        columns: [
          {
            title: '序',
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '酒店产品',
            key: 'product'
          },
          {
            title: '标签',
            key: 'tags'
          },
          {
            title: '规格',
            multiRow: true,
            key: 'list',
            subKey: 'mode'
          },
          {
            title: '成本',
            multiRow: true,
            key: 'list',
            subKey: 'cost'
          },
          {
            title: '报价',
            multiRow: true,
            key: 'list',
            subKey: 'offer'
          },
          {
            title: '市场价',
            multiRow: true,
            key: 'list',
            subKey: 'marketValue'
          },
          {
            title: '房',
            multiRow: true,
            key: 'list',
            subKey: 'room'
          },
          {
            title: '床',
            multiRow: true,
            key: 'list',
            subKey: 'bed'
          },
          {
            title: '人',
            multiRow: true,
            key: 'list',
            subKey: 'people'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            transfer: true,
            width: 180,
            align: 'center',
            render: (h, params) => {
              return (
                <div>
                  <i-button size='small' style={{ marginRight: '5px' }} onClick={this.editProduct.bind(this, params, 'hotel')}>编辑</i-button>
                  <poptip confirm transfer placement="bottom-end" title='确认要删除这条内容吗?' onOn-ok={this.delProduct.bind(this, params, 'hotel')}>
                    <i-button size='small' style={{ marginRight: '5px' }}>删除</i-button>
                  </poptip>
                </div>
              )
            }
          }
        ]
      },
      restaurantData: {
        data: [
          {
            id: 5,
            product: '如意餐厅',
            tags: ['5星'],
            list: [
              { mode: '全票', cost: '200', offer: '400', marketValue: '400' }
            ]
          }
        ],
        columns: [
          {
            title: '序',
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '餐厅产品',
            key: 'product'
          },
          {
            title: '标签',
            key: 'tags'
          },
          {
            title: '规格',
            multiRow: true,
            key: 'list',
            subKey: 'mode'
          },
          {
            title: '成本',
            multiRow: true,
            key: 'list',
            subKey: 'cost'
          },
          {
            title: '报价',
            multiRow: true,
            key: 'list',
            subKey: 'offer'
          },
          {
            title: '市场价',
            multiRow: true,
            key: 'list',
            subKey: 'marketValue'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            transfer: true,
            width: 180,
            align: 'center',
            render: (h, params) => {
              return (
                <div>
                  <i-button size='small' style={{ marginRight: '5px' }} onClick={this.editProduct.bind(this, params, 'car')}>编辑</i-button>
                  <poptip confirm transfer placement="bottom-end" title='确认要删除这条内容吗?' onOn-ok={this.delProduct.bind(this, params, 'car')}>
                    <i-button size='small' style={{ marginRight: '5px' }}>删除</i-button>
                  </poptip>
                </div>
              )
            }
          }
        ]
      },
      carData: {
        data: [
          {
            id: 6,
            product: '车辆产品',
            tags: ['5星'],
            list: [
              { driver: '林三华', phone: '13189512141', carNUmber: '粤B 51541', cost: '200', offer: '400', marketValue: '400' }
            ]
          }
        ],
        columns: [
          {
            title: '序',
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '车辆产品',
            key: 'product'
          },
          {
            title: '标签',
            key: 'tags'
          },
          {
            title: '司机',
            multiRow: true,
            key: 'list',
            subKey: 'driver'
          },
          {
            title: '司机联系方式',
            multiRow: true,
            key: 'list',
            subKey: 'phone'
          },
          {
            title: '车牌',
            multiRow: true,
            key: 'list',
            subKey: 'carNUmber'
          },
          {
            title: '成本',
            multiRow: true,
            key: 'list',
            subKey: 'cost'
          },
          {
            title: '报价',
            multiRow: true,
            key: 'list',
            subKey: 'offer'
          },
          {
            title: '市场价',
            multiRow: true,
            key: 'list',
            subKey: 'marketValue'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            transfer: true,
            width: 180,
            align: 'center',
            render: (h, params) => {
              return (
                <div>
                  <i-button size='small' style={{ marginRight: '5px' }} onClick={this.editProduct.bind(this, params, 'restaurant')}>编辑</i-button>
                  <poptip confirm transfer placement="bottom-end" title='确认要删除这条内容吗?' onOn-ok={this.delProduct.bind(this, params, 'restaurant')}>
                    <i-button size='small' style={{ marginRight: '5px' }}>删除</i-button>
                  </poptip>
                </div>
              )
            }
          }
        ]
      }
    }
  },
  methods: {
    addProduct (type) {
      this.isEdit = false
      this.isType = type
      this.drawerValue = true
    },
    editProduct (params) {
      this.isEdit = true
      this.drawerValue = true
    },
    delProduct (params, type) {
      switch (type) {
        case 'area':
          this.areaData.data.splice(params.index, 1)
          break
        case 'hotel':
          this.hotelData.data.splice(params.index, 1)
          break
        case 'restaurant':
          this.restaurantData.data.splice(params.index, 1)
          break
        case 'car':
          this.carData.data.splice(params.index, 1)
          break
      }
    }
  },
  components: {
    ProductEdit
  }
}
</script>
<style lang="less" scoped>
.container{
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
}
</style>

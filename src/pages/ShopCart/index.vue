<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价(元)</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计(元)</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" @change="updateChecked(cart,$event)" :checked="cart.isChecked==1">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:;" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input @change="handler('change',$event.target.value-0,cart)" autocomplete="off" type="text"
              :value="cart.skuNum" minnum="1" class="itxt">
            <a href="javascript:;" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" @click="deleteCartListById(cart)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" @change="updateAllCartChecked" :checked="isAllChecked&&cartInfoList.length>0"
          type="checkbox">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价(不含运费) :</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:;" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex"
  //引入节流函数
  import throttle from "lodash/throttle"
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    methods: {
      //获取个人购物车信息
      getData() {
        this.$store.dispatch("getCartList")
      },
      //修改某一个产品的个数  节流
      handler: throttle(async function (type, disNum, cart) {
        //    区分元素  变化量   获取id
        //向服务器发送请求,修改数量
        switch (type) {
          case "add":
            disNum = 1
            break
          case "minus":
            disNum = cart.skuNum > 1 ? -1 : 0
            break
          case "change":
            //用户输入 非法跟负值  进行效验
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0
            } else {
              //效验小数
              disNum = parseInt(disNum) - cart.skuNum
            }
        }
        try {
          //派发action
          await this.$store.dispatch("addOrUpdateShopCart", {
            skuId: cart.skuId,
            skuNum: disNum
          })
          //再次请求数据
          this.getData()

        } catch (error) {}
      }, 600),
      //删除某一个产品的操作
      async deleteCartListById(cart) {
        try {
          await this.$store.dispatch("deleteCartListBySkuId", cart.skuId)
          //删除成功再次发送请求
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      //修改某一个产品勾选状态
      async updateChecked(cart, event) {
        let isChecked = event.target.checked ? '1' : '0'
        try {
          await this.$store.dispatch("updateCheckedById", {
            skuId: cart.skuId,
            isChecked
          })
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      },
      //删除全部选中的商品
      // 这个回调没办法收集到有用的数据
      async deleteAllCheckedCart() {
        try {
          //派发action
          await this.$store.dispatch("deleteAllCheckedCart")
          //再次发送请求
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      },
      //修改全部产品的选中状态
      async updateAllCartChecked(event) {
        try {
          let isChecked = event.target.checked ? "1" : "0"
          let result = await this.$store.dispatch("updateAllCartChecked", isChecked)
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      }

    },
    computed: {
      ...mapGetters(["cartList"]),
      //购物车数据
      cartInfoList() {
        return this.cartList.cartInfoList || []
      },
      //计算购买产品的总价
      totalPrice() {
        let sum = 0;
        this.cartInfoList.forEach(item => {
          sum += item.skuNum * item.skuPrice
        });
        return sum
      },
      //判断复选框是否勾选,(产品都选中,都√)
      isAllChecked() {
        return this.cartInfoList.every((item) => {
          return item.isChecked == 1
        })
      },

    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              width: 40px;
              height: 30px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
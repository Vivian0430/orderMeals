// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    isTabed: true,
    isShowed: true,
    aniStyle: false,
    showFixed: true,
    showOrder: true,
    isAdd: false,
    cover: "/images/logo.png",
    price: "0.00",
    cart: [],
    order:[],
    isAdd:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // if(that.data.cart.length == 0){
    //    that.setData({
    //      isAdd: false,
    //    })
    // }else{
    //   that.setData({
    //     isAdd: true,
    //   })
    // }
    console.log(that.data.cart.length);
    wx.request({
      url: 'http://127.0.0.1:3000/product',
      method: 'get',
      success: function(res) {

        that.setData({
          products: res.data
        })
      }
    });
    wx.request({
      url: 'http://127.0.0.1:3000/cart',
      method: 'get',
      success: function(res) {
        console.log(res.data);
        that.setData({
          cart: res.data
        })
      }
    })
  },



  showCart: function(e) {
    var that = this;
    that.setData({
      showFixed: !that.data.showFixed,
      aniStyle: !that.data.aniStyle
    })
  },




  outbtn: function(e) {
    let that = this;
    that.setData({
      aniStyle: false
    })
    setTimeout(function() {
      that.setData({
        showFixed: true
      })
    }, 10)
  },



  inbtn: function(e) {
    console.log("xx");
  },



  clickTab1: function(e) {
    this.setData({
      isTabed: true,
      showOrder: true
    });
  },




  clickTab2: function(e) {
    this.setData({
      isTabed: false,
      showOrder: false
    });
  },



  showDetails: function(e) {
    var that = this;
    that.setData({
      isShowed: !that.data.isShowed,
      anistyle: !that.data.anistyle
    })
  },



  increaseProduct: function(e){
    this.onLoad();
    let that = this;
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://127.0.0.1:3000/increaseProduct',
      method: 'post',
      data: {
        "id": id
      },
      success: function (res) {
        that.setData({
          cart: res.data
        })
      }
    })
  },


  decreaseProduct: function (e) {
    this.onLoad();
    let that = this;
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://127.0.0.1:3000/decreaseProduct',
      method: 'post',
      data: {
        "id": id
      },
      success: function (res) {
        that.setData({
          cart: res.data
        })
      }
    })
  },




  deleteProduct: function(e){
    this.onLoad();
    let that = this;
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    // var obj=new Object();
    // obj=this.data.cart[id];
    wx.request({
      url: 'http://127.0.0.1:3000/deleteProduct',
      method: 'post',
      data: {
        "id": id
      },
      success: function (res) {
        that.setData({
          cart: res.data
        })
      }
    })
  },


  addCart: function(e) {
    let that = this;
    // if (that.data.cart.length == 0) {
    //   that.setData({
    //     isAdd: false,
    //   })
    // } else {
    //   that.setData({
    //     isAdd: true,
    //   })
    // }
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    var obj=new Object();
    obj.cartPath=this.data.products[id].path;
    obj.cartName = this.data.products[id].name;
    obj.cartPrice = Number(this.data.products[id].price.substring(1,3));
    obj.totalPrice = Number(that.data.price) + Number(this.data.products[id].price.substring(1, 3));
    that.setData({
      price: obj.totalPrice
    })
    console.log(obj.cartPrice);
    obj.cartCount = 1;
    wx.request({
      url: 'http://127.0.0.1:3000/addCart',
      method: 'post',
      data:{
        "obj":obj
      },
      success: function(res) {
        that.setData({
          cart: res.data
        })
      }
    })
    
  },


  chooseImage: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        let filepath = res.tempFilePaths[0];
        wx.uploadFile({
          url: 'http://127.0.0.1:3000/upload',
          filePath: filepath,
          name: 'cover',
          success: function(res) {
            console.log(res.data);
            let data = JSON.parse(res.data);
            that.setData({
              cover: "http://127.0.0.1:3000/" + data.file,
            });
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onshow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Canvas } from '@tarojs/components'
import '@tarojs/async-await'
import taroFetch, { getToken } from '../../../utils/request'
import { handlePrice } from '../../../utils/number'
import './index.scss'
import bgImg from '../../../assets/share/pic/bgImg.png'
import innerBgImg from '../../../assets/share/pic/innerBgImg.png'
import shadowLeft from '../../../assets/share/pic/shadowLeft.png'
import shadowRight from '../../../assets/share/pic/shadowRight.png'
import coin from '../../../assets/share/pic/coin.png'
import logo_text from '../../../assets/share/pic/logo_text.png'

export default class ShopSharePic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowCanvas: true
    }
  }

  componentDidMount () {
    this.drawImage()
  }

  getDownloadedFileTemp (url) {
    return new Promise((resolve, reject) => {
      Taro.downloadFile({
        url,
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          resolve(res)
        }
      })
    })
  }

  async getQrCoode () {
    const pages = Taro.getCurrentPages()
    const page = pages && pages[pages.length - 1]
    // console.log(222, page)
    if (!page) throw new Error('获取小程序码失败')
    const currentUrl = `${page.route}`
    const token = await getToken()
    // console.log(333, currentUrl)
    // taroFetch({
    //   url: '/app/qrCode/createQrCoode',
    //   method: 'POST',
    //   data: {
    //     page: currentUrl
    //   },
    // }).then(res => {
    //   console.log(111, res)
    // }).catch(error => {
    //   // console.log(444, e)
    //   console.log('error', error)
    // })
    Taro.request({
      url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`,
      method: 'POST',
      data: {
        access_token: token,
        scene: 'ccc',
        page: currentUrl
      }
    })
      .then(response => {
        // console.log('error url', url)
        console.log('error* response', response)
        // return data
      })
      .catch(error => {
        console.log('3error* response', error)
      })
  }
  /**
   * drawImage() 定义绘制图片的方法
   */
  async drawImage () {
    const {
      wishList
    } = this.props
    // 创建canvas对象
    let ctx = Taro.createCanvasContext('cardCanvas', this.$scope)

    // 绘制背景
    ctx.drawImage(bgImg, 0, 0, 375, 575)

    // 绘制头像
    ctx.save()
    let avatarRes = await this.getDownloadedFileTemp(wishList.avatar)
    // Taro.downloadFile({
    //   url: wishList.avatar
    // })
    ctx.beginPath()
    ctx.arc(30 + 17, 35 + 17, 17, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatarRes.tempFilePath, 30, 35, 35, 35)
    ctx.restore()

    // 绘制头像区域文案
    ctx.save()
    ctx.setFontSize(12)
    ctx.setFillStyle('#fff')
    ctx.fillText(wishList.nickName, 75, 36 + 12)
    ctx.setFontSize(12)
    ctx.setFillStyle('#fff')
    ctx.fillText('向你推荐了一个清单', 75, 53 + 12)
    ctx.restore()

    // 绘制图片区域背景
    ctx.drawImage(innerBgImg, 17, 175 / 2, 680 / 2, 900 / 2)

    // 绘制清单头图
    let listPicRes = await this.getDownloadedFileTemp(wishList.listPic)
    // Taro.downloadFile({
    //   url: wishList.listPic
    // })
    ctx.drawImage(shadowLeft, 91 / 2, 233 / 2, 50 / 2, 465 / 2)
    ctx.drawImage(shadowRight, 605 / 2, 233 / 2, 50 / 2, 465 / 2)
    ctx.drawImage(listPicRes.tempFilePath, 131 / 2, 225 / 2, 484 / 2, 484 / 2)

    // 绘制优惠
    ctx.save()
    ctx.drawImage(coin, 83 / 2, 725 / 2, 47 / 2, 47 / 2)
    ctx.setFontSize(12)
    ctx.setFillStyle('#000')
    ctx.fillText(`优惠${handlePrice(wishList.discountMoney)}元`, 146 / 2, 732 / 2 + 13)
    ctx.fillText(`${wishList.goodCount}条内容`, 512 / 2, 732 / 2 + 13)
    ctx.restore()

    // 绘制标题
    ctx.save()
    ctx.setFontSize(23)
    ctx.setFillStyle('rgba(48,48,48,1)')
    ctx.fillText(`${wishList.listName}`, 84 / 2, 796 / 2 + 23)
    ctx.restore()

    // 绘制创建人
    ctx.save()
    ctx.setFontSize(12)
    ctx.setFillStyle('rgba(74,74,74,1)')
    ctx.fillText(`由${wishList.nickName}创建`, 84 / 2, 926 / 2 + 12 - 23)
    ctx.restore()

    // 绘制描述
    ctx.save()
    ctx.setFontSize(12)
    ctx.setFillStyle('rgba(98,98,98,1)')
    ctx.fillText(`${wishList.listDesc}`, 84 / 2, 972 / 2 + 12 - 23)
    ctx.restore()

    // 绘制底部信息背景
    ctx.save()
    ctx.rect(0, 575, 375, 184 / 2)
    ctx.setFillStyle('rgba(249,249,249,1)')
    ctx.fill()
    ctx.drawImage(logo_text, 80 / 2, 1188 / 2, 250 / 2, 57 / 2)
    ctx.setFontSize(10.5)
    ctx.setFillStyle('rgba(144,144,144,1)')
    ctx.fillText(`长按识别小程序码查看清单`, 80 / 2, 1252 / 2 + 10.5)
    ctx.restore()

    ctx.save()
    this.getQrCoode()
    ctx.beginPath()
    ctx.arc(550 / 2 + 30, 1174 / 2 + 30, 30, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.clip()
    ctx.setFillStyle('grey')
    ctx.fill()
    ctx.restore()

    // 绘制二维码
    // let qrcode = await Taro.downloadFile({
    //   url: ''
    // })
    // ctx.drawImage(qrcode.tempFilePath, 70, 260, 180, 180)

    // 将以上绘画操作进行渲染
    // ctx.scale(0.8, 0.8)
    ctx.draw()
  }

  render() {
    const { wishList } = this.props
    const { 
      isShowCanvas
     } = this.state
    return (
      <View className="shopSharePic">
        {/* <Image
          style='width:100%;height:250px'
          src={weixinImg}
        /> */}
        <View className='index'>
          {/* <Button onGetUserInfo={this.getUserInfo} openType="getUserInfo" type="primary" size="mini">打卡</Button> */}
          {/* 使用Canvas绘制分享图片 */}
          {
            isShowCanvas && 
              <View className='canvas-wrap'>
                <Canvas 
                  id='card-canvas'
                  className='card-canvas'
                  style='width: 375px; height: 667px;'
                  canvasId='cardCanvas'
                >
                </Canvas>
                {/* <Button onClick={this.saveCard} className="btn-save" type="primary" size="mini">保存到相册</Button> */}
              </View> 
          }
        </View>
      </View>
    )
  }
}

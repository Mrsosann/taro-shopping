import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { getShopImageUrl } from '../../../utils/image'
import weixinImg from '../../../assets/share/weixin.png'
import picImg from '../../../assets/share/pic.png'
import { AtFloatLayout, AtCurtain } from 'taro-ui'
import OpenTypeButton from '../../../components/OpenTypeButton'
import ShopSharePic from '../ShopSharePic'
import './index.scss'

export default class ShopShare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFloatLayout: true, // 是否展示下方浮层
      showCurtain: false, // 是否展示分享图片 Curtain 幕帘
      wishList: {
        administrators: null,
        avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM6siawibnAiaoZHyUqofFqrTZCLIXuNgOPbNPiauD24zRldS5KIuxOPTLbans1LOY8LW01lWiczoB3Yibkg/132",
        colectionCount: 3,
        collected: 0,
        commentCount: "1",
        createChannel: "1",
        createTime: "2020-03-22 15:59:25",
        discountMoney: null,
        editPermission: 0,
        goodCount: 4,
        id: 22,
        likeCount: 3,
        liked: 0,
        listDesc: "和女朋友一起看电影必备内容整理，个人经验，轻拍",
        listName: "和女朋友一起看电影必备",
        listPic: "http://49.235.15.241/app/images/202003221603042396tmp_b5df04f0b469f67e8a9e14689279f67d.jpg",
        listStatus: 0,
        listType: "1",
        memberId: 100000002,
        nickName: "阿白",
        privacyType: 0,
        shareCount: "22",
        sharePermission: 0,
        updateTime: "2020-03-22 17:30:18",
        wishGoods: null,
      }
    }
  }

  // 展示分享图片 Curtain 幕帘
  showPicCurtain () {
    console.log('showPicCurtain')
    this.setState({
      showFloatLayout: false, // 是否展示下方浮层
      showCurtain: true, // 是否展示分享图片 Curtain 幕帘
    })
  }

  // 关闭分享图片 Curtain 幕帘
  closePicCurtain () {
    console.log('showPicCurtain')
    this.setState({
      showFloatLayout: true, // 是否展示下方浮层
      showCurtain: false, // 是否展示分享图片 Curtain 幕帘
    })
  }

  render() {
    const { data } = this.props
    const { 
      showFloatLayout,
      showCurtain,
      wishList,
     } = this.state
    return (
      <View className="shopShare">
        <AtFloatLayout isOpened={showFloatLayout} >
          <View className="shopShare-layout">
          <OpenTypeButton openType="share">
            <View className="shopShare-layout-item">
              <Image className="layout-img" src={weixinImg} />
              <Text className="layout-label">分享到微信</Text>
            </View>
            </OpenTypeButton>
            <View className="shopShare-layout-item" onClick={this.showPicCurtain}>
              <Image className="layout-img" src={picImg} />
              <Text className="layout-label">生成分享海报</Text>
            </View>
          </View>
        </AtFloatLayout>   
        <AtCurtain
          isOpened={showCurtain}
          onClose={this.closePicCurtain.bind(this)}
        >
          <ShopSharePic 
            wishList={wishList}
          />
        </AtCurtain>   
      </View>
    )
  }
}

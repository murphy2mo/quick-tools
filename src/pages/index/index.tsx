import { Component, PropsWithChildren, useCallback, useState } from 'react'
import { View, Button,Form,Input,Switch } from '@tarojs/components'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import Taro,{ useLoad } from '@tarojs/taro'


export default function() {

  const [limit,setLimit]  = useState({
    x: 0,
    y: 0
  })

  const [position,setPosition] = useState({
    x: 0,
    y: 0
  })



  // console.log(1)
  useLoad(() => {
    Taro.getSystemInfoAsync({
      success: (res => {
        setLimit({
          x: res.windowWidth - 320,
          y: res.windowHeight - 160
        })
      })
    })
  })



  const handlerNo = useCallback(e=> {
    // console.log(e,'no')
    const x = Math.random() * limit.x
    const y = Math.random() * limit.y
    setPosition({
      x,
      y
    })
  },[limit])

  return (
    <View className='index'>
          <View className='windows' style={{
                    left: position.x + 'px',
                    top: position.y + 'px'
                  }}
          >
              <View className='title'>
                xx 请和我约会吧
              </View>
              <View className='bottom'>
                  <View className='yes'>
                      <Button>✅同意</Button>
                  </View>
                  <View  className='no'>
                      <View className='button' onClick={handlerNo}>❌不同意</View>
                  </View>
              </View>
          </View>

          <View>
          <Form >
        <View className='example-body'>
          <Switch name='switch' className='form-switch'></Switch>
        </View>
      </Form>
          </View>
      </View>
  )
}




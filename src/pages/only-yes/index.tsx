import { Component, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { View, Button,Form,Input,Switch, Video } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'


import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import Taro,{ useLoad } from '@tarojs/taro'
import useDoubleClick from '../../hooks/useDoubleClick'


export default function() {

  const [limit,setLimit]  = useState({
    x: 0,
    y: 0
  })

  const [position,setPosition] = useState({
    x: 0,
    y: 0
  })
  const [showInput,setShowInput] = useState(false)
  const [formValue,setFromValue] = useState({
    title: '',
    yes: '',
    no: ''
  })

  const [words,setWords] = useState({
    hitokoto: '',
    from:''
  })

  const [success,setSuccess] = useState(false)


  const handleSuccess = useCallback(() => {
    Taro.request({
      url: 'https://v1.hitokoto.cn',
      success: function(res) {
        // console.log(res)
        setWords({
          ...res.data
        })
      }
    })
  },[setWords])

  useEffect(() => {
    handleSuccess()
  },[handleSuccess])

  useLoad((param) => {
    // console.log(param)
    const url = new URL(window.location.href);
    const title = url.searchParams.get('title') || '';
    const yes = url.searchParams.get('yes') || '';
    const no = url.searchParams.get('no') || '';
    setFromValue({
      title,
      yes,
      no
    })
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

  const handleFormChange = useCallback((e,key) => {
    // console.log(key,e)
    setFromValue({
      ...formValue,
      [key]: e
    })

  },[formValue,setFromValue])

  const handleSet = useCallback(() =>{
    const url = new URL(window.location.href);
    url.searchParams.set('title',formValue.title)
    url.searchParams.set('yes',formValue.yes)
    url.searchParams.set('no',formValue.no)
    window.location.replace(url.href)
  },[formValue])

  const doubleClick = useDoubleClick();



  return (
    <View className='index'>
      {
        (!showInput && !success) && <View className='windows' style={{
          left: position.x + 'px',
          top: position.y + 'px'
        }}
        >
    <View className='title'>
      {formValue.title}
    </View>
    <View className='bottom'>
        <View className='yes'>
            <Button onClick={() => {
              setSuccess(true)
            }}
            >✅{formValue.yes || '同意'}</Button>
        </View>
        <View  className='no'>
            <View className='button' onClick={handlerNo}>❌{formValue.no || '不同意'}</View>
        </View>
    </View>
</View>
      }
      {
        showInput &&
        <View>
          <Input value={formValue.title} onInput={(e) => handleFormChange(e.detail.value,'title')} type='text' placeholder='标题 你请求的内容' />
          <Input value={formValue.yes}  onInput={(e) => handleFormChange(e.detail.value,'yes')} type='text' placeholder='同意文案' />
          <Input value={formValue.no}  onInput={(e) => handleFormChange(e.detail.value,'no')} type='text' placeholder='不同意文案' />
          <Button onClick={handleSet}>设定</Button>
        </View>
      }

      <Button onClick={doubleClick(() => setShowInput(!showInput))}  className='tap'>

      </Button>

      <View className='background'>

      </View>
      {
        success && <View onClick={handleSuccess} className='content-wrap'>
        <View className='content'>
          <View className='bracket left'>
          『
          </View>
          <View className='word'>{words.hitokoto}</View>
          <View className='bracket right'>
          』
          </View>
          </View>
          <View className='author'>-- {words.from}</View>
      </View>
      }



      </View>
  )
}




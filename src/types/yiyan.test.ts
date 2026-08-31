import assert from 'node:assert/strict'
import test from 'node:test'
import { parseNetEaseCloudComments } from './yiyan'

test('解析网易云热评接口返回的文案', () => {
  const result = parseNetEaseCloudComments([
    {
      wangyiyunreping: '世界没你想象的那么好。——网易云音乐热评《你喜欢海却不喜欢山》',
    },
  ])

  assert.deepEqual(result, [
    {
      hitokoto: '世界没你想象的那么好。——网易云音乐热评《你喜欢海却不喜欢山》',
      from: '网易云音乐热评',
    },
  ])
})

test('网易云热评接口返回空数组时抛出错误', () => {
  assert.throws(() => parseNetEaseCloudComments([]), /必须是包含 wangyiyunreping 的非空数组/)
})

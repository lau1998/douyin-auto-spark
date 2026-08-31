export interface Yiyan {
  hitokoto: string
  from: string
}

interface NetEaseCloudComment {
  wangyiyunreping: string
}

export const NETEASE_CLOUD_COMMENT_API_URL =
  'https://v.api.aa1.cn/api/api-wenan-wangyiyunreping/index.php?aa1=json'

/**
 * 将网易云热评接口响应转换为脚本内部统一的一言数据结构。
 *
 * @param payload 网易云热评接口返回的未知 JSON 数据。
 * @returns 可用于消息模板与默认消息的一言列表。
 * @throws 响应不是包含有效热评文案的非空数组时抛出错误。
 */
export function parseNetEaseCloudComments(payload: unknown): Yiyan[] {
  if (
    !Array.isArray(payload) ||
    payload.length === 0 ||
    payload.some(
      (comment) =>
        typeof comment !== 'object' ||
        comment === null ||
        typeof (comment as Partial<NetEaseCloudComment>).wangyiyunreping !== 'string' ||
        !(comment as NetEaseCloudComment).wangyiyunreping.trim(),
    )
  ) {
    throw new Error('网易云热评接口返回值必须是包含 wangyiyunreping 的非空数组')
  }

  return payload.map((comment) => ({
    hitokoto: (comment as NetEaseCloudComment).wangyiyunreping.trim(),
    from: '网易云音乐热评',
  }))
}

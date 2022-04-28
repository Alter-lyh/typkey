export const ENV = 'production'

export const APIPATH = {
  // 测试环境
  // 'cc-proxy',
  api: (() => {
    switch (ENV) {
      case 'production': return './api'
      case 'proxy': return '/proxy/api'
      case 'cc-proxy': return '/cc-proxy/api'
    }
  })()
}
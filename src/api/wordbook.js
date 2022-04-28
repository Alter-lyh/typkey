import {APIPATH} from './config.js'
const wordbook={
  // 添加单词章节
  addChapter: APIPATH.api +'/addChapter',
  // 批量添加单词章节
  addWordBook: APIPATH.api +'/addWordBook',
  // 获取单词章节
  getChapter: APIPATH.api +'/getChapter',
  // 删除单词章节
  deleteChapter: APIPATH.api +'/deleteChapter'
}
export default wordbook
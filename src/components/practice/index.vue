<template>
    <div class="main">
        <p class="key-title">{{ wordName }}</p>
        <div class="key-set">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="dialogTableVisible = true"
                >学习</el-button
            >
            <el-button type="text"
                ><router-link to="/addchapter" tag="span"
                    >添加单词</router-link
                ></el-button
            >
            <el-button type="text" @click="toImportWord">导入单词本</el-button>
            <el-button type="text"><a target="_blank" href="https://github.com/Alter-lyh/typkey">开源地址</a></el-button>
        </div>
        <div class="key-score">
            <div class="top">
                <p>
                    Speed: <span>{{ speed }}</span>
                </p>
                <p>
                    Errors: <span>{{ errors }}</span>
                </p>
                <p>
                    Score: <span>{{ score }}</span>
                </p>
            </div>
            <div class="bot">
                <p>{{keyWord}}</p>
                <p>{{paraphrase}}</p>
            </div>
        </div>
        <div class="keytext-view" @click="startTyping">
            <span
                v-for="(item, index) in keyList"
                :key="index"
                :class="[
                    'keytext-item',
                    keyIndex === index ? 'keytext-item-cursor' : '',
                    errKeyIndex.indexOf(index) !== -1
                        ? 'keytext-item-error'
                        : '',
                ]"
                >{{ item }}</span
            >
            <div class="keytext-view-mask" v-show="isTyping">
                <div class="mask"></div>
                <span class="text-tip">点击激活</span>
            </div>
        </div>
        <div class="keyboard-view">
            <div class="keyboard-row">
                <div
                    class="keyboard-key"
                    :class="[codeKey === 192 ? 'key-activity' : '']"
                >
                    `
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 49 ? 'key-activity' : '']"
                >
                    1
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 50 ? 'key-activity' : '']"
                >
                    2
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 51 ? 'key-activity' : '']"
                >
                    3
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 52 ? 'key-activity' : '']"
                >
                    4
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 53 ? 'key-activity' : '']"
                >
                    5
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 54 ? 'key-activity' : '']"
                >
                    6
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 55 ? 'key-activity' : '']"
                >
                    7
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 56 ? 'key-activity' : '']"
                >
                    8
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 57 ? 'key-activity' : '']"
                >
                    9
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 48 ? 'key-activity' : '']"
                >
                    0
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 189 ? 'key-activity' : '']"
                >
                    -
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 187 ? 'key-activity' : '']"
                >
                    =
                </div>
                <div
                    class="keyboard-key key-bac"
                    :class="[codeKey === 8 ? 'key-activity' : '']"
                >
                    Backspace
                </div>
            </div>
            <div class="keyboard-row">
                <div
                    class="keyboard-key key-bac"
                    :class="[codeKey === 9 ? 'key-activity' : '']"
                >
                    Tab
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 81 ? 'key-activity' : '']"
                >
                    Q
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 87 ? 'key-activity' : '']"
                >
                    W
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 69 ? 'key-activity' : '']"
                >
                    E
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 82 ? 'key-activity' : '']"
                >
                    R
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 84 ? 'key-activity' : '']"
                >
                    T
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 89 ? 'key-activity' : '']"
                >
                    Y
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 85 ? 'key-activity' : '']"
                >
                    U
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 73 ? 'key-activity' : '']"
                >
                    I
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 79 ? 'key-activity' : '']"
                >
                    O
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 80 ? 'key-activity' : '']"
                >
                    P
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 219 ? 'key-activity' : '']"
                >
                    [
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 221 ? 'key-activity' : '']"
                >
                    ]
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 220 ? 'key-activity' : '']"
                >
                    \
                </div>
            </div>
            <div class="keyboard-row">
                <div
                    class="keyboard-key key-caps"
                    :class="[codeKey === 20 ? 'key-activity' : '']"
                >
                    Caps
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 65 ? 'key-activity' : '']"
                >
                    A
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 83 ? 'key-activity' : '']"
                >
                    S
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 68 ? 'key-activity' : '']"
                >
                    D
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 70 ? 'key-activity' : '']"
                >
                    F
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 71 ? 'key-activity' : '']"
                >
                    G
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 72 ? 'key-activity' : '']"
                >
                    H
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 74 ? 'key-activity' : '']"
                >
                    J
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 75 ? 'key-activity' : '']"
                >
                    K
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 76 ? 'key-activity' : '']"
                >
                    L
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 186 ? 'key-activity' : '']"
                >
                    ;
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 222 ? 'key-activity' : '']"
                >
                    '
                </div>
                <div
                    class="keyboard-key key-caps"
                    :class="[codeKey === 13 ? 'key-activity' : '']"
                >
                    Enter
                </div>
            </div>
            <div class="keyboard-row">
                <div
                    class="keyboard-key key-shift"
                    :class="[isShift ? 'key-activity' : '']"
                >
                    Shift
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 90 ? 'key-activity' : '']"
                >
                    Z
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 88 ? 'key-activity' : '']"
                >
                    X
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 67 ? 'key-activity' : '']"
                >
                    C
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 86 ? 'key-activity' : '']"
                >
                    V
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 66 ? 'key-activity' : '']"
                >
                    B
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 78 ? 'key-activity' : '']"
                >
                    N
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 77 ? 'key-activity' : '']"
                >
                    M
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 188 ? 'key-activity' : '']"
                >
                    ,
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 190 ? 'key-activity' : '']"
                >
                    .
                </div>
                <div
                    class="keyboard-key"
                    :class="[codeKey === 191 ? 'key-activity' : '']"
                >
                    /
                </div>
                <div
                    class="keyboard-key key-shift"
                    :class="[isShift ? 'key-activity' : '']"
                >
                    Shift
                </div>
            </div>
            <div class="keyboard-row">
                <div
                    class="keyboard-key key-ctrl"
                    :class="[codeKey === 17 ? 'key-activity' : '']"
                >
                    Ctrl
                </div>
                <div
                    class="keyboard-key key-alt"
                    :class="[codeKey === 18 ? 'key-activity' : '']"
                >
                    Alt
                </div>
                <div
                    class="keyboard-key key-space"
                    :class="[codeKey === 32 ? 'key-activity' : '']"
                ></div>
                <div
                    class="keyboard-key key-alt"
                    :class="[codeKey === 18 ? 'key-activity' : '']"
                >
                    Alt
                </div>
                <div
                    class="keyboard-key key-ctrl"
                    :class="[codeKey === 17 ? 'key-activity' : '']"
                >
                    Ctrl
                </div>
            </div>
        </div>
        <div class="key-msg">
            <h4>使用方式</h4>
            <p>
                本站的定位是学习盲打和<strong>辅助记忆单词</strong>。所以我推荐的方式是：<strong>结合扇贝app</strong>，将你每天背的不熟练的单词录入进来，在学习盲打的同时记忆单词！
            </p>
            <h4>数据保存</h4>
            <p>
                因为数据都是保存在浏览器中，所以当你换个浏览器，或者清除浏览器数据时，数据都会丢失。所以建议导出单词本保存到本地！
            </p>
            <h4>官方群</h4>
            <p>
                扫描左侧二维码，即可加入官方QQ群，群号为：1038902721。可获取更多单词本！
            </p>
        </div>
        <div class="key-outside">
            <el-dialog title="单词本" :visible.sync="dialogTableVisible">
                <el-table
                    :data="wordData"
                    stripe
                    max-height="300"
                    size="medium"
                >
                    <el-table-column
                        property="_name"
                        label="单词本名称"
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        property="_wordList"
                        label="内容"
                        min-width="400"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button
                                @click="setClick(scope.row, scope.$index)"
                                type="text"
                                size="small"
                                >学习</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
        <audio controls ref="audio">
            <source :src="musicUrl" type="audio/mpeg" />
            您的浏览器不支持 audio 元素。
        </audio>
    </div>
</template>

<script>
export default {
    name: "practice",
    data() {
        return {
            valueKey: "",
            codeKey: "",
            keyIndex: 0, // 当前光标位置
            errKeyIndex: [], //错误的光标集
            keyWordData: [], // 输入的单词
            musicUrl: "",
            isShift: false,
            isTyping: false,
            wordName: null, // 文章名称
            wordKeys: "", //字符集
            keyList: "", // 展示的字符集
            keyData: [],
            keyI: 0,
            dialogTableVisible: false,
            speed: 0,
            errors: 0,
            score: 0,
            keyWord: '',
            paraphrase: '',
        };
    },
    computed: {
        wordData() {
            return this.$store.getters.getWordChapteList;
        },
    },
    created() {
        let i = window.localStorage.getItem("wordIndex");
        if (i) {
            this.wordName = JSON.parse(
                window.localStorage.getItem("wordChapteList")
            )[i]._name;
            this.wordKeys = JSON.parse(
                window.localStorage.getItem("wordChapteList")
            )[i]._wordList;
        } else {
            this.wordName = JSON.parse(
                window.localStorage.getItem("wordChapteList")
            )[0]._name;
            this.wordKeys = JSON.parse(
                window.localStorage.getItem("wordChapteList")
            )[0]._wordList;
        }
        if (JSON.parse(window.localStorage.getItem("wordChapteList"))[0]) {
        }
        this.setKeyData();
    },
    activated() {
        let startTime, endTime;
        // console.log(this.$http);
        // this.$http.get('https://dict.iciba.com/dictionary/word/suggestion?word=word&nums=1&ck=709a0db45332167b0e2ce1868b84773e&timestamp=1639998569571&client=6&uid=123123&key=1000006&is_need_mean=1&signature=39726f9b7261f3a5bfc1da246b6c2efe')
        document.onkeydown = (e) => {
            e = window.event || e;
            // 组织浏览器默认行为
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            if (this.isTyping) return;
            // 设置开始敲击时间
            if (this.keyIndex === 0) startTime = new Date().getTime();
            let _key = window.event.keyCode;
            if (_key === 16) {
                this.isShift = true;
            } else {
                if (window.event.key == this.keyList.charAt(this.keyIndex)) {
                    this.keyWordData.push(this.keyList[this.keyIndex]);

                    if (this.keyList[this.keyIndex] == " ") {
                        let keyWordDataString = this.keyWordData.join("");
                        keyWordDataString = keyWordDataString.split(" ");
                        this.playAudio(keyWordDataString[keyWordDataString.length - 2])
                    }
                    this.keyIndex++;
                } else {
                    this.errKeyIndex.push(this.keyIndex);
                }
            }
            // 进入下一组
            if (!this.keyList.charCodeAt(this.keyIndex)) {
                // 释放音频
                this.keyWordData.push(this.keyList[this.keyIndex]);
                let keyWordDataString = this.keyWordData.join("");
                keyWordDataString = keyWordDataString.split(" ");
                this.playAudio(keyWordDataString[keyWordDataString.length - 1])
                this.keyWordData = []
                
                // 获取结束时间，计算键入速度
                endTime = new Date().getTime();
                let keyTimes = (endTime - startTime) / 1000;
                this.speed = (
                    (this.keyList.length / 5 / keyTimes) *
                    60
                ).toFixed(0);
                // 获取错误数量
                this.errors = this.errKeyIndex.length;
                // 计算得分
                this.score = this.speed * 102 - this.errors * 143;
                // 将本组数据清空
                this.keyIndex = 0;
                this.keyData[this.keyI + 1].length > 0
                    ? this.keyI++
                    : (this.keyI = 0);
                this.keyList = this.keyData[this.keyI].join(" ");
                this.errKeyIndex = [];
            }
            this.codeKey = _key;
        };
        document.onkeyup = (e) => {
            this.isShift = false;
            this.codeKey = "";
            this.keyClock = null;
        };
    },
    deactivated() {
        document.onkeydown = null;
        document.onkeyup = null;
    },
    methods: {
        // 开始敲击键盘
        startTyping() {
            this.isTyping = !this.isTyping;
            this.isTyping ? (this.keyIndex = "") : (this.keyIndex = 0);
            this.errKeyIndex = [];
        },
        // 设置学习章节
        setClick(data, i) {
            this.wordName = data._name;
            this.wordKeys = data._wordList;
            window.localStorage.setItem("wordIndex", i);
            this.setKeyData();
            this.dialogTableVisible = false;
        },
        setKeyData() {
            let j = 0;
            let s = 10;
            this.keyData = [];
            this.wordKeys = this.wordKeys.split(" ");
            // 单词拆分递归
            let wordKeysSlice = () => {
                this.keyData.push(this.wordKeys.slice(j, s));
                j = s;
                s = s + 10;
                if (j > this.wordKeys.length) return;
                wordKeysSlice();
            };
            wordKeysSlice();
            this.keyList = this.keyData[0].join(" ");
        },
        toImportWord() {
            this.$router.push("/importWord");
        },
        // 播放音频和释义
        async playAudio(keyWord) {
            let audio = this.$refs.audio;
            this.musicUrl = `https://dict.youdao.com/dictvoice?audio=${keyWord}`;
            //更改src后需要重新加载音乐
            audio.load();
            audio.play();
            this.keyWord = keyWord
            const params = {
                word: keyWord,
                nums: 1,
                ck: '709a0db45332167b0e2ce1868b84773e',
                timestamp: '1639998569571',
                client: '6',
                uid: '123123',
                key: '1000006',
                is_need_mean: 1,
                signature: '39726f9b7261f3a5bfc1da246b6c2efe'
            }
            const res = await this.$http.get('https://dict.iciba.com/dictionary/word/suggestion', {params})
            let json = res.data
            if (json.status != 1) return
            this.paraphrase = res.data.message[0].paraphrase
        }
    },
};
</script>

<style scoped lang='less'>
.main {
    width: 100%;
    height: auto;
}
.key-title {
    text-align: center;
    margin-top: 15px;
    margin-bottom: -10px;
    font-size: 24px;
    font-weight: 700;
    color: #ea6f5a;
    font-family: -apple-system, SF UI Display, Arial, PingFang SC,
        Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
}
.key-set {
    width: 85%;
    padding: 0 3em;
    margin: 0 auto;
    a{
        color: #409EFF;
    }
}
.key-score {
    width: 80%;
    padding: 1rem 3em;
    border-top: 1px solid rgba(0, 10, 20, 0.1);
    margin: 0 auto;
    .top{
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            width: 8%;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 18px;
            color: #555;
            margin: 0 5px;
            span {
                font-size: 32px;
                color: #000;
            }
        }
    }
    .bot{
        text-align: center;
        height: 40px;
        max-height: 40px;
        p{
            font-size: 20px;
            color: #000;
            font-weight: bold;
            font-family: -apple-system, SF UI Display, Arial, PingFang SC,
        Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
            margin-bottom: 10px;
        }
        p:nth-child(2){
            font-size: 12px;
            font-weight: 500px;
            color: #ea6f5a;
        }
    }
}
.keytext-view {
    width: 80%;
    height: auto;
    padding: 2rem 3em;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 40px;
    border-top: 1px dashed rgba(0, 10, 20, 0.1);
    border-bottom: 1px dashed rgba(0, 10, 20, 0.1);
    color: #27253e;
    font-size: 18px;
    position: relative;
    user-select: none;
    .keytext-item {
        font-family: Ubuntu Mono, Lucida Console, monospace;
        font-weight: 400;
        letter-spacing: normal;
        word-spacing: normal;
        line-height: 1.5;
        white-space: pre-wrap;
        padding: 4px 1px 0 1px;
    }
    .keytext-item-cursor {
        animation: ani-cursor 0.5s infinite;
    }
    @keyframes ani-cursor {
        from {
        }
        to {
            background: #000;
            color: white;
        }
    }
    .keytext-item-error {
        color: red;
    }
    .keytext-view-mask {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        padding-top: 5px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        color: #000;
        font-size: 18px;
        font-weight: 600;
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background: #fff;
            opacity: 0.3;
        }
    }
}
.keyboard-view {
    width: 80%;
    height: auto;
    padding: 10px;
    border-radius: 10px;
    background: #dfd9d9;
    margin: 0 auto;
    margin-top: 20px;
    font-size: 16px;
    user-select: none;
    font-weight: 600;
    .keyboard-row {
        height: auto;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        .keyboard-key {
            width: 6.2%;
            height: 50px;
            background: white;
            border-radius: 5px;
            text-align: center;
            line-height: 50px;
            margin-right: 10px;
        }
        .keyboard-key:nth-last-child(1) {
            margin-right: 0;
        }
        .key-activity {
            background: #555;
            color: white;
        }
        .key-bac {
            width: 10%;
            font-size: 14px;
        }
        .key-caps {
            width: 11.4%;
        }
        .key-shift {
            width: 14.8%;
        }
        .key-ctrl,
        .key-alt {
            width: 15%;
        }
        .key-space {
            width: 65%;
        }
    }
    .keyboard-row:nth-last-child(1) {
        margin-bottom: 0;
    }
}
.key-msg {
    width: 85%;
    height: auto;
    margin: 0 auto;
    margin-top: 50px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, SimSun, sans-serif;
    padding-bottom: 20px;
    h4 {
        font-size: 28px;
        margin-bottom: 10px;
        color: #a0522d;
    }
    p {
        font-size: 18px;
        color: #444;
        text-indent: 2em;
        strong {
            color: #000;
            font-size: 24px;
            font-weight: 700;
        }
    }
}
.key-outside {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, SimSun, sans-serif;
    font-weight: 400;
}
</style>

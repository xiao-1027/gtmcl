<template>
    <div>
<!--        <div>{{huifangtime}}</div>-->
        <div id="playWnd" class="playWnd" :style="{width:swfWidth+'px',height:swfHeight+'px'}"></div>
    </div>
</template>
<script type="text/javascript" src="../../../public/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="../../../public/jsencrypt.min.js"></script>
<script type="text/javascript" src="../../../public/jsWebControl-1.0.0.min.js"></script>
<script>
    export default {
        props: ['playbacktime'],
        name: "videocomponent",
        data() {
            return {
                swfHeight: 700,
                swfWidth: 1200,
                //初始化参数
                initparam: {
                    appKey: "24236263",
                    secret: "yEr2BeJTNY5xwEpT5eUm",
                    apiIp: "115.29.227.78",
                    apiPort: 443,
                    layout: "1x1"//这里是来控制你一开始初始化之后的分屏的
                },
                //监控点编号
                pointCode: "a24e18204cfc4a36ad94613d0d821bdc",
                pubKey: "",
                oWebControl: null,
                WebControl: null,
                huifangtime: this.playbacktime,
                starttime: "",
                endtime: '',
                yulan: '0',
                playMode: 0,
            }
        },
        methods: {
            //回放
            backVideo() {
                console.log(this.huifangtime)
                this.starttime = new Date(this.huifangtime);
                let h = this.starttime.getHours()
                h = h < 10 ? ('0' + h) : h
                let d = this.starttime.getMinutes()
                d = d < 10 ? ('0' + d) : d
                let s = this.starttime.getSeconds()
                s = s < 10 ? ('0' + s) : s
                this.starttime = this.starttime.getFullYear() + '-' + (this.starttime.getMonth() + 1) + '-' + this.starttime.getDate() + ' ' + h
                    + ':' + d + ':' + s;

                // this.endtime = new Date(this.huifangtime[1]);
                // let h1 = this.endtime.getHours()
                // h1 = h1 < 10 ? ('0' + h1) : h1
                // let d1 = this.endtime.getMinutes()
                // d1 = d1 < 10 ? ('0' + d1) : d1
                // let s1 = this.endtime.getSeconds()
                // s1= s1 < 10 ? ('0' + s1) : s1
                // this.endtime=this.endtime.getFullYear() + '-' + (this.endtime.getMonth() + 1) + '-' + this.endtime.getDate() + ' ' + h1
                //     + ':' + d1 + ':' + s1;
                console.log(this.starttime)
                console.log(this.endtime)
                console.log(typeof (this.starttime))
                console.log(typeof (this.endtime))
                var cameraIndexCode = this.pointCode;         //获取输入的监控点编号值，必填
                var startTimeStamp = new Date(this.starttime.replace('-', '/').replace('-', '/')).getTime();    //回放开始时间戳，必填
                // var endTimeStamp = new Date(this.endtime.replace('-', '/').replace('-', '/')).getTime();        //回放结束时间戳，必填
                var recordLocation = 1;                                     //录像存储位置：0-中心存储，1-设备存储
                var transMode = 1;                                          //传输协议：0-UDP，1-TCP
                var gpuMode = 0;                                            //是否启用GPU硬解，0-不启用，1-启用
                var wndId = -1;                                             //播放窗口序号（在2x2以上布局下可指定播放窗口）
                console.log(startTimeStamp)
                console.log(startTimeStamp / 1000)
                console.log(Math.floor(startTimeStamp / 1000).toString())
                console.log(Math.floor(startTimeStamp / 1000 + 86400).toString())
                // console.log(endTimeStamp)
                // console.log(endTimeStamp / 1000)
                this.oWebControl.JS_RequestInterface({
                    funcName: "startPlayback",
                    argument: JSON.stringify({
                        cameraIndexCode: this.pointCode,                   //监控点编号
                        startTimeStamp: Math.floor(startTimeStamp / 1000).toString(),  //录像查询开始时间戳，单位：秒
                        // startTimeStamp: '1619211000',  //录像查询开始时间戳，单位：秒
                        endTimeStamp: Math.floor(startTimeStamp / 1000 + 86400).toString(),      //录像结束开始时间戳，单位：秒
                        // endTimeStamp: Math.floor(endTimeStamp / 1000).toString(),      //录像结束开始时间戳，单位：秒
                        // endTimeStamp: '1619213600',      //录像结束开始时间戳，单位：秒
                        recordLocation: recordLocation,                     //录像存储类型：0-中心存储，1-设备存储
                        transMode: transMode,                               //传输协议：0-UDP，1-TCP
                        gpuMode: gpuMode,                                   //是否启用GPU硬解，0-不启用，1-启用
                        wndId: wndId                                         //可指定播放窗口
                    })
                }).then(res => {
                    console.log(res)
                })
            },
            onSearch() {
                this.oWebControl.JS_ShowWnd();
                this.videoList = [];
                videoList(
                    接口参数
                ).then(res => {
                    if (res.statusCode == 200) {
                        this.videoList = res.result.rows;
                    } else {
                        this.$message({
                            message: res.message,
                            type: "warning"
                        });
                    }
                });

            },
            //获取海康密钥
            getInitParam(callback) {
                // getInitParam('xxx').then(res => {
                //     this.initparam = res;
                //
                // });
                this.init(callback)
            },
            //执行每监控点预览的操作 //获取监控点编号
            videoPreview(val, index) {
                this.position = index;
                this.oWebControl.JS_ShowWnd();
                this.pointCode = val.pointCode;
                this.startpreview();
            },
            // 创建播放实例
            initPlugin(callback) {
                // console.log('2')
                console.log('111')
                this.oWebControl = new WebControl({
                    szPluginContainer: "playWnd", // 指定容器id
                    iServicePortStart: 15900, // 指定起止端口号，建议使用该值
                    iServicePortEnd: 15909,
                    szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11", // 用于IE10使用ActiveX的clsid
                    // 创建WebControl实例成功
                    cbConnectSuccess: () => {
                        this.oWebControl
                            .JS_StartService("window", {
                                // WebControl实例创建成功后需要启动服务
                                dllPath: "./VideoPluginConnect.dll" // 值"./VideoPluginConnect.dll"写死
                            })
                            .then(
                                () => {
                                    console.log('成功')
                                    // 启动插件服务成功
                                    this.oWebControl.JS_SetWindowControlCallback({
                                        // 设置消息回调
                                        cbIntegrationCallBack: this.cbIntegrationCallBack
                                    });

                                    this.oWebControl
                                        .JS_CreateWnd("playWnd", this.swfWidth, this.swfHeight)
                                        .then(() => {
                                            console.log('1')
                                            //JS_CreateWnd创建视频播放窗口，宽高可设定
                                            this.getInitParam(callback); // 创建播放实例成功后初始化
                                        });
                                },
                                () => {
                                    // 启动插件服务失败
                                    console.log('启动插件服务失败')
                                }
                            );
                    },
                    // 创建WebControl实例失败
                    cbConnectError: () => {
                        this.oWebControl = null;
                        $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
                        this.WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
                        this.initCount++;
                        if (this.initCount < 3) {
                            setTimeout(() => {
                                this.initPlugin();
                            }, 3000);
                        } else {
                            console.log("插件启动失败，请检查插件是否安装!");
                        }
                    },
                    // 异常断开：bNormalClose = false
                    cbConnectClose: bNormalClose => {
                        // JS_Disconnect正常断开：bNormalClose = true
                        console.log("cbConnectClose");
                        this.oWebControl = null;
                    }
                });
            },
            // 设置窗口控制回调
            setCallbacks() {
                this.oWebControl.JS_SetWindowControlCallback({
                    cbIntegrationCallBack: this.cbIntegrationCallBack
                });
            },
            // 推送消息
            cbIntegrationCallBack(oData) {
                console.log(oData.responseMsg);
                /* showCBInfo(JSON.stringify(oData.responseMsg)); */
            },
            //初始化
            init(callback) {
                this.getPubKey(() => {
                    // console.log('b')
                    // 请自行修改以下变量值
                    let appkey = this.initparam.appKey; //综合安防管理平台提供的appkey，必填
                    let secret = this.setEncrypt(this.initparam.secret); //综合安防管理平台提供的secret，必填
                    let ip = this.initparam.apiIp; //综合安防管理平台IP地址，必填
                    let port = this.initparam.apiPort; //综合安防管理平台端口，若启用HTTPS协议，默认443
                    port = parseInt(port);
                    let layout = this.initparam.layout;
                    let playMode = this.playMode; //初始播放模式：0-预览，1-回放
                    let snapDir = "D:\\SnapDir"; //抓图存储路径
                    let videoDir = "D:\\VideoDir"; //紧急录像或录像剪辑存储路径
                    let enableHTTPS = 1; //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
                    let encryptedFields = "secret"; //加密字段，默认加密领域为secret
                    let showToolbar = 1; //是否显示工具栏，0-不显示，非0-显示
                    let showSmart = 1; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
                    let buttonIDs =
                        "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769"; //自定义工具条按钮
                    // 请自行修改以上变量值
                    this.oWebControl
                        .JS_RequestInterface({
                            funcName: "init",
                            argument: JSON.stringify({
                                appkey: appkey, //API网关提供的appkey
                                secret: secret, //API网关提供的secret
                                ip: ip, //API网关IP地址
                                playMode: playMode, //播放模式（决定显示预览还是回放界面）
                                port: port, //端口
                                snapDir: snapDir, //抓图存储路径
                                videoDir: videoDir, //紧急录像或录像剪辑存储路径
                                layout: layout, //布局
                                enableHTTPS: enableHTTPS, //是否启用HTTPS协议
                                encryptedFields: encryptedFields, //加密字段
                                showToolbar: showToolbar, //是否显示工具栏
                                showSmart: showSmart, //是否显示智能信息
                                buttonIDs: buttonIDs //自定义工具条按钮
                            })
                        })
                        .then(oData => {
                            this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
                            if (callback) {
                                callback();
                            }
                            this.startpreview();  //初始化之后开启预览
                        });
                    console.log('a')
                });
            },
            //获取公钥
            getPubKey(callback) {
                console.log('c')
                this.oWebControl
                    .JS_RequestInterface({
                        funcName: "getRSAPubKey",
                        argument: JSON.stringify({
                            keyLength: 1024
                        })

                    })
                    .then(oData => {
                        console.log(oData);
                        if (oData.responseMsg.data) {
                            this.pubKey = oData.responseMsg.data;
                            callback();
                        }
                    });
                console.log('k')
            },
            //RSA加密
            setEncrypt(value) {
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.pubKey);
                return encrypt.encrypt(value);
            },
            // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
            setWndCover() {
                let iWidth = $(window).width();
                let iHeight = $(window).height();
                let oDivRect = $("#playWnd")
                    .get(0)
                    .getBoundingClientRect();
                let iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0;
                let iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0;
                let iCoverRight =
                    oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0;
                let iCoverBottom =
                    oDivRect.bottom - iHeight > 0
                        ? Math.round(oDivRect.bottom - iHeight)
                        : 0;

                iCoverLeft = iCoverLeft > this.swfWidth ? this.swfWidth : iCoverLeft;
                iCoverTop = iCoverTop > this.swfHeight ? this.swfHeight : iCoverTop;
                iCoverRight = iCoverRight > this.swfWidth ? this.swfWidth : iCoverRight;
                iCoverBottom =
                    iCoverBottom > this.swfHeight ? this.swfHeight : iCoverBottom;
                this.oWebControl.JS_RepairPartWindow(0, 0, this.swfWidth + 1, this.swfHeight); // 多1个像素点防止还原后边界缺失一个像素条
                if (iCoverLeft != 0) {
                    this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this.swfHeight);
                }
                if (iCoverTop != 0) {
                    this.oWebControl.JS_CuttingPartWindow(0, 0, this.swfWidth + 1, iCoverTop); // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
                }
                if (iCoverRight != 0) {
                    this.oWebControl.JS_CuttingPartWindow(
                        this.swfWidth - iCoverRight,
                        0,
                        iCoverRight,
                        this.swfHeight
                    );
                }
                if (iCoverBottom != 0) {
                    this.oWebControl.JS_CuttingPartWindow(
                        0,
                        this.swfHeight - iCoverBottom,
                        this.swfWidth,
                        iCoverBottom
                    );
                }
            },
            //视频“预览”功能
            startpreview() {
                console.log('i')
                let pointCode = this.pointCode;
                let cameraIndexCode = pointCode; //获取输入的监控点编号值，必填
                let streamMode = 0; //主子码流标识：0-主码流，1-子码流
                let transMode = 1; //传输协议：0-UDP，1-TCP
                let gpuMode = 0; //是否启用GPU硬解，0-不启用，1-启用
                let wndId = -1; //播放窗口序号（在2x2以上布局下可指定播放窗口）
                cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
                cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
                this.oWebControl.JS_RequestInterface({
                    funcName: "startPreview",
                    argument: JSON.stringify({
                        cameraIndexCode: cameraIndexCode, //监控点编号
                        streamMode: streamMode, //主子码流标识
                        transMode: transMode, //传输协议
                        gpuMode: gpuMode, //是否开启GPU硬解
                        wndId: wndId //可指定播放窗口
                    })
                }).then(res => {
                    console.log(res)
                });
                console.log('u')
            },

            //停止全部预览功能
            stopAllPreview() {
                this.oWebControl.JS_RequestInterface({
                    funcName: "stopAllPreview"
                });
            },
            //关闭视频窗口
            closeWindow() {
                if (this.oWebControl != null) {
                    this.oWebControl.JS_HideWnd(); // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
                    this.oWebControl.JS_Disconnect().then(
                        () => {
                            // 断开与插件服务连接成功
                        },
                        () => {
                            // 断开与插件服务连接失败
                        }
                    );
                }
            }
        },
        created() {


        },

        beforeMount() {
            this.WebControl = WebControl;
        },//调用电脑中的插件
        mounted() {
            this.swfHeight = `${document.documentElement.clientHeight * 0.8}`;
            this.swfWidth = `${document.documentElement.clientWidth * 0.65}`;
            //页面加载时创建播放实例初始化
            this.initPlugin();
            console.log(this.WebControl)
            // this.getInitParam();//获取初始话所需的参数
            // 监听resize事件，使插件窗口尺寸跟随DIV窗口变化
            $(window).resize(() => {
                if (this.oWebControl != null) {
                    this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight);
                    this.setWndCover();
                }
            });
            // 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
            $(window).scroll(() => {
                if (this.oWebControl != null) {
                    this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight);
                    this.setWndCover();
                }
            });
        },
        beforeDestroy() {
            this.closeWindow();//关闭插件
        },
        // watch: {
        //     playbacktime: {
        //         immediate: true,
        //         handler(value) {
        //             console.log(value)
        //             this.huifangtime = value
        //         }
        //     }
        // },
        watch: {
            playbacktime(newVal) {
                if (newVal) {
                    this.huifangtime = newVal;
                    if (!this.oWebControl) {
                        return;
                    }
                    // 如果是预览
                    if (this.playMode === 0) {
                        console.log('kaishi')
                        this.playMode = 1;
                        this.oWebControl.JS_HideWnd();
                        this.initPlugin(() => {
                            this.backVideo();
                        });

                    } else if (this.playMode === 1) {
                        this.backVideo();
                    }
                } else {
                    // 如果是回放，重新初始化
                    if (this.playMode === 1) {
                        this.playMode = 0;
                        this.oWebControl.JS_HideWnd();
                        this.initPlugin(() => {
                            this.startpreview();
                        });

                    } else if (this.playMode === 0) {
                        this.startpreview();
                    }

                }
            }
// ————————————————
// 版权声明：本文为CSDN博主「lijinglianging」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/jinglianglove/article/details/102599229
        }
    }
</script>

<style scoped>

</style>
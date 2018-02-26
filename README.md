# Spadger_Chau


# 项目运行
egret startserver -a

# 项目目录

+ resource ``资源文件，包括组件模板、资源加载配置、图片资源``
  - eui_main ``主场景资源``
  - eui_game ``游戏场景资源``
  - eui_skins ``egret默认组件资源、忽略``
  - default.res.json ``资源配置文件，可在wing中配置``
+ src ``代码目录，核心！！！``
  - Logic ``逻辑模块``
    + ESocket.ts ``ws相关逻辑``
    + MainLogic.ts ``页面逻辑``
  - MC ``消息中心，写了部分事件类型，可忽略``
  - UI ``页面逻辑``
    + Game ``游戏页面相关的组件ts文件``
    + Main ``主界面项目组件ts文件``
    + HomeUI.ts ``项目最底层的ui组件``
  - GameEvent.ts ``游戏相关事件类型``
  - GameMode.ts ``游戏配置项和一些全局变量``
  - GamePages.ts ``路由相关事件类型``
  - LoadingUI.ts ``首次加载loading，忽略``
  - Main.ts ``首次进入逻辑``
  - Platform.ts ``预留登录处理逻辑部分``
  - TrueLoadingUI.ts ``真实loading，路由转跳，资源异步加载的处理``
  
# 项目说明
1、组件的加载经量放到Mainlogic里面，这点很重要，抽出这个类就是为了解决组件间的相互调用问题。

2、所有的逻辑必须经过logic，然后在logic里面操作组件，值得一提的是，异步加载的组件无法直接操作，需要在logic里面写方法间接调用。

3、一般页面组件每个exml文件对应一个ts，需要循环渲染的组件如``列表``，可直接在组件内写渲染的子ts类

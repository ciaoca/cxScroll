# jQuery cxScroll

一款基于jQuery的无缝滚动插件，可自定义外观及调用参数，兼容主流浏览器。

**版本：**

* jQuery v1.7+
* jQuery cxScroll v1.2.2

**注意事项：**

1. 内部会自动创建 prev 及 next 切换按钮，也可以在外部直接创建，若外部已创建或设置 prevBtn:false 及 nextBtn:false ，内部将跳过此步骤；
2. 若（滚动的列表宽度 ≤ 父元素的宽度），则不会自动创建 prev 及 next 切换按钮，也不会自动滚动。

文档：http://code.ciaoca.com/jquery/cxscroll/

示例：http://code.ciaoca.com/jquery/cxscroll/demo/

## 使用方法

### CSS 样式结构

除必要属性设置外，其他样式均可自行设置。

```css
/* 横向滚动基本样式 */
.cxscroll{}
.cxscroll .box{overflow:hidden;width:600px;}
.cxscroll .list{overflow:hidden;width:9999px;}
.cxscroll .list li{float:left;width:200px;height:100px;}
.cxscroll .prev{}
.cxscroll .next{}

/* 纵向滚动基本样式 */
.cxscroll{}
.cxscroll .box{overflow:hidden;height:300px;}
.cxscroll .list{}
.cxscroll .list li{height:100px;}
.cxscroll .prev{}
.cxscroll .next{}
```

### DOM 结构

```html
<div id="element_id" class="cxscroll">
    <div class="box">
        <ul class="list">
            <li></li>
            <li></li>
            ...
            <li></li>
        </ul>
    </div>
    <!-- 控制按钮会自动创建，可省略 -->
    <a class="prev"></a>
    <a class="next"></a>
</div>
```

### 调用 cxScroll
```javascript
$("#element_id").cxScroll();
```

## options 参数说明

名称|默认值|说明
---|---|---
direction|'right'|滚动方向。可设置为："left", "right", "top", "bottom"
easing|'swing'|缓动方式
step|1|滚动步长
accel|200|手动滚动速度 (ms)，点击控制按钮滚动的速度。
speed|800|自动滚动速度 (ms)
time|4000|自动滚动间隔时间 (ms)
auto|true|是否自动滚动
hoverLock|true|鼠标移入移出锁定。鼠标进入区域内时停止自动轮播，离开后恢复自动轮播（仅在 auto 为 true 时有效）
prevBtn|true|是否使用 prev 按钮
nextBtn|true|是否使用 next 按钮


## API接口

```javascript
var Api;
$('#element_id').cxScroll(function(api){
  Api = api;
});
// 或者作为第二个参数传入
$('#element_id').cxScroll({
  minus: true,
  plus: true
}, function(api){
  Api = api;
});
```

名称|说明
---|---
play()|开始自动播放
stop()|停止自动播放
prev(speed)|向前滚动。speed 为滚动速度(ms)
next(speed)|向后滚动。speed 为滚动速度(ms)

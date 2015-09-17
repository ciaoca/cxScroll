#jQuery cxScroll

一款基于jQuery的无缝滚动插件，可自定义外观及调用参数，兼容主流浏览器。

**版本：**

* jQuery v1.7+
* jQuery cxScroll v1.2.2

**注意事项：**

1. 内部会自动创建 prev 及 next 切换按钮，也可以在外部直接创建，若外部已创建或设置 prevBtn:false 及 nextBtn:false ，内部将跳过此步骤；
2. 若（滚动的列表宽度 ≤ 父元素的宽度），则不会自动创建 prev 及 next 切换按钮，也不会自动滚动。

文档：http://code.ciaoca.com/jquery/cxscroll/

示例：http://code.ciaoca.com/jquery/cxscroll/demo/

##使用方法

###CSS 样式结构
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

###DOM 结构
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

###调用 cxScroll
```javascript
$("#element_id").cxScroll();
```

##options 参数说明
<table>
  <tr>
    <th width="80">名称</th>
    <th width="80">默认值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>direction</td>
    <td>'right'</td>
    <td>滚动方向。可设置为："left", "right", "top", "bottom"</td>
  </tr>
  <tr>
    <td>easing</td>
    <td>'swing'</td>
    <td>缓动方式</td>
  </tr>
  <tr>
    <td>step</td>
    <td>1</td>
    <td>滚动步长</td>
  </tr>
  <tr>
    <td>accel</td>
    <td>200</td>
    <td>手动滚动速度 (ms)，点击控制按钮滚动的速度。</td>
  </tr>
  <tr>
    <td>speed</td>
    <td>800</td>
    <td>自动滚动速度 (ms)</td>
  </tr>
  <tr>
    <td>time</td>
    <td>4000</td>
    <td>自动滚动间隔时间 (ms)</td>
  </tr>
  <tr>
    <td>auto</td>
    <td>true</td>
    <td>是否自动滚动</td>
  </tr>
  <tr>
    <td>hoverLock</td>
    <td>true</td>
    <td>鼠标移入移出锁定。鼠标进入区域内时停止自动轮播，离开后恢复自动轮播（仅在 auto 为 true 时有效）</td>
  </tr>
  <tr>
    <td>prevBtn</td>
    <td>true</td>
    <td>是否使用 prev 按钮</td>
  </tr>
  <tr>
    <td>nextBtn</td>
    <td>true</td>
    <td>是否使用 next 按钮</td>
  </tr>
</table>

##API接口
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
<table>
  <thead>
    <tr>
      <th width="200">名称</th>
      <th>说明</th>
    </tr>
  </thead>
  <tr>
    <td>play()</td>
    <td>开始自动播放</td>
  </tr>
  <tr>
    <td>stop()</td>
    <td>停止自动播放</td>
  </tr>
  <tr>
    <td>prev(speed)</td>
    <td>向前滚动。speed 为滚动速度(ms)</td>
  </tr>
  <tr>
    <td>next(speed)</td>
    <td>向后滚动。speed 为滚动速度(ms)</td>
  </tr>
</table>

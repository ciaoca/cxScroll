#jQuery cxScroll

一款基于jQuery的无缝滚动插件，可自定义外观及调用参数，兼容主流浏览器。

**版本：**

* jQuery v1.4.4+
* jQuery cxScroll v1.0

**注意事项：**

1. 内部会自动创建 plus 及 minus 元素，也可以在外部直接创建，若外部已创建或设置 plus:false 及 minus:false ，内部将跳过此步骤；
2. 若（滚动的列表宽度 ≤ 父元素的宽度），则不会自动创建 plus 及 minus 元素，也不会自动滚动，也无法滚动；
3. 鼠标放在滚动元素上，会暂停自动滚动，移出后会恢复自动滚动（若设置 auto:false 则不会恢复）。

文档：http://code.ciaoca.com/jquery/cxscroll/

示例：http://code.ciaoca.com/jquery/cxscroll/demo/

##【options 参数说明】

<table>
    <tr>
        <th width="80">名称</th>
        <th width="80">默认值</th>
        <th>说明</th>
    </tr>
    <tr>
        <td>direction</td>
        <td>"right"</td>
        <td>滚动方向。可设置为："left"|"right"|"top"|"bottom"</td>
    </tr>
    <tr>
        <td>step</td>
        <td>1</td>
        <td>滚动步长</td>
    </tr>
    <tr>
        <td>accel</td>
        <td>160</td>
        <td>手动滚动速度(ms)</td>
    </tr>
    <tr>
        <td>speed</td>
        <td>800</td>
        <td>自动滚动速度(ms)</td>
    </tr>
    <tr>
        <td>time</td>
        <td>4000</td>
        <td>自动滚动间隔时间(ms)</td>
    </tr>
    <tr>
        <td>auto</td>
        <td>true</td>
        <td>是否自动滚动</td>
    </tr>
    <tr>
        <td>prev</td>
        <td>true</td>
        <td>是否使用 prev 按钮</td>
    </tr>
    <tr>
        <td>next</td>
        <td>true</td>
        <td>是否使用 next 按钮</td>
    </tr>
    <tr>
        <td>safeLock</td>
        <td>true</td>
        <td>滚动时是否锁定控制按钮</td>
    </tr>
</table>


##【使用方法】

###CSS 样式结构
```css
/* 横向滚动参考样式 */
.cxscroll{position:relative;width:660px;height:120px;padding:10px;background-color:#eee;}
.cxscroll .box{overflow:hidden;position:relative;width:580px;height:120px;margin:0 auto;}
.cxscroll .list{overflow:hidden;width:9999px;}
.cxscroll .list li{float:left;width:200px;}
.cxscroll .prev,
.cxscroll .next{position:absolute;top:50%;margin-top:-25px;width:40px;height:50px;background-image:url(img/control.png);background-repeat:no-repeat;font:0/0 Arial;cursor:pointer;}
.cxscroll .prev{left:5px;background-position:0 0;}
.cxscroll .next{right:5px;background-position:-40px 0;}
.cxscroll .prev:hover{background-position:0 -50px;}
.cxscroll .next:hover{background-position:-40px -50px;}

/* 纵向滚动参考样式 */
.cxscroll{position:relative;width:180px;height:340px;padding:10px;background:#eee;}
.cxscroll .box{overflow:hidden;position:relative;top:40px;height:260px;}
.cxscroll .list{position:absolute;top:0;left:0;}
.cxscroll .list li{height:140px;text-align:center;}
.cxscroll .prev,
.cxscroll .next{position:absolute;left:50%;width:120px;height:30px;margin-left:-25px;width:50px;height:40px;background-image:url(img/control.png);background-repeat:no-repeat;font:0/0 Arial;cursor:pointer;}
.cxscroll .prev{top:5px;background-position:-80px 0;}
.cxscroll .next{bottom:5px;background-position:-130px 0;}
.cxscroll .prev:hover{background-position:-80px -40px;}
.cxscroll .next:hover{background-position:-130px -40px;}
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
    <!-- 控制按钮内部会自动创建，可省略 -->
    <a class="prev"></a>
    <a class="next"></a>
</div>
```

###调用 cxScroll
```javascript
// 直接调用
$("#element_id").cxScroll();

// 自定义参数调用
$("#element_id").cxScroll({
    direction:"right",
    step:1,
    accel:160,
    speed:800,
    time:4000,
    auto:true,
    prev:true,
    next:true,
    safeLock:true
});
```
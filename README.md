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
        <td>speed</td>
        <td>800</td>
        <td>滚动速度(ms)</td>
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
        <td>plus</td>
        <td>true</td>
        <td>是否使用 plus 按钮</td>
    </tr>
    <tr>
        <td>minus</td>
        <td>true</td>
        <td>是否使用 minus 按钮</td>
    </tr>
</table>


##【使用方法】

###CSS 样式结构
```css
/* 无缝滚动样式 */ 
.cxscroll{}
.cxscroll .box{}
.cxscroll .list{}
.cxscroll .list li{}
.cxscroll .plus{}
.cxscroll .minus{}
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
    <!-- 左右控制按钮，内部会自动创建，可省略 -->
    <a class="plus"></a>
    <a class="minus"></a>
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
    speed:800,
    time:4000,
    auto:true,
    plus:true,
    minus:true
});
```
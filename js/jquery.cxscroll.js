/*!
 * jQuery cxScroll 1.2.1
 * http://code.ciaoca.com/
 * https://github.com/ciaoca/cxScroll
 * E-mail: ciaoca@gmail.com
 * Released under the MIT license
 * Date: 2014-03-10
 */
(function($){
	$.fn.cxScroll=function(settings){
		if(!this.length){return};
		settings=$.extend({},$.cxScroll.defaults,settings);

		var obj=this;
		var scroller={
			lock:false,
			dom:{}
		};

		scroller.init=function(){
			scroller.dom.box=obj.find(".box");
			scroller.dom.list=scroller.dom.box.find(".list");
			scroller.dom.items=scroller.dom.list.find("li");
			scroller.itemSum=scroller.dom.items.length;

			// 没有元素或只有1个元素时，不进行滚动
			if(scroller.itemSum<=1){return};

			scroller.dom.prevBtn=obj.find(".prev");
			scroller.dom.nextBtn=obj.find(".next");
			scroller.itemWidth=scroller.dom.items.outerWidth();
			scroller.itemHeight=scroller.dom.items.outerHeight();

			if(settings.direction=="left"||settings.direction=="right"){
				// 容器宽度不足时，不进行滚动
				if(scroller.itemWidth*scroller.itemSum<=scroller.dom.box.outerWidth()){return};

				scroller.prevVal="left";
				scroller.nextVal="right";
				scroller.moveVal=scroller.itemWidth;
			}else{
				// 容器高度不足时，不进行滚动
				if(scroller.itemHeight*scroller.itemSum<=scroller.dom.box.outerHeight()){return};

				scroller.prevVal="top";
				scroller.nextVal="bottom";
				scroller.moveVal=scroller.itemHeight;
			};

			// 元素：后补
			scroller.dom.list.append(scroller.dom.list.html());

			// 添加元素：手动操作按钮
			if(settings.prevBtn&&!scroller.dom.prevBtn.length){
				scroller.dom.prevBtn=$("<a></a>",{"class":"prev"}).prependTo(obj);
			};
			if(settings.nextBtn&&!scroller.dom.nextBtn.length){
				scroller.dom.nextBtn=$("<a></a>",{"class":"next"}).prependTo(obj);
			};

			// 事件：鼠标移入停止，移出开始
			if(settings.auto){
				obj.hover(function(){
					settings.auto=false;
					scroller.lock=false;
					scroller.off();
				},function(){
					settings.auto=true;
					scroller.lock=false;
					scroller.on();
				});
			};

			scroller.bindEvents();
			scroller.on();
		};
		
		scroller.bindEvents=function(){
			if(settings.nextBtn&&scroller.dom.prevBtn.length){
				scroller.dom.nextBtn.bind("click",function(){
					if(!scroller.lock){
						scroller.goto(scroller.nextVal,settings.accel);
					};
				});
			};
			if(settings.prevBtn&&scroller.dom.prevBtn.length){
				scroller.dom.prevBtn.bind("click",function(){
					if(!scroller.lock){
						scroller.goto(scroller.prevVal,settings.accel);
					};
				});
			};
		};

		// 方法：开始
		scroller.on=function(){
			if(!settings.auto){return};
			if(typeof(scroller.run)!=="undefined"){
				clearTimeout(scroller.run);
			};

			scroller.run=setTimeout(function(){
				scroller.goto(settings.direction);
			},settings.time);
		};

		// 方法：停止
		scroller.off=function(){
			scroller.dom.box.stop(true);
			if(typeof(scroller.run)!=="undefined"){
				clearTimeout(scroller.run);
			};
		};

		// 方法：滚动
		scroller.goto=function(d,t){
			scroller.off();
			if(settings.controlLock){
				scroller.lock=true;
			};

			var _max;	// _max	滚动的最大限度
			var _dis;	// _dis	滚动的距离
			var _speed=t||settings.speed;

			switch(d){
				case "left":
				case "top":
					_max=0;
					if(d=="left"){
						if(parseInt(scroller.dom.box.scrollLeft(),10)==0){
							scroller.dom.box.scrollLeft(scroller.itemSum*scroller.moveVal);
						};
						_dis=scroller.dom.box.scrollLeft()-(scroller.moveVal*settings.step);
						if(_dis%scroller.itemWidth>0){
							_dis-=(_dis%scroller.itemWidth)-scroller.itemWidth;
						};
						if(_dis<_max){_dis=_max};
						scroller.dom.box.animate({"scrollLeft":_dis},_speed,settings.easing,function(){
							if(parseInt(scroller.dom.box.scrollLeft(),10)<=_max){
								scroller.dom.box.scrollLeft(0);
							};
						});
					}else{
						if(parseInt(scroller.dom.box.scrollTop(),10)==0){
							scroller.dom.box.scrollTop(scroller.itemSum*scroller.moveVal);
						};
						_dis=scroller.dom.box.scrollTop()-(scroller.moveVal*settings.step);
						if(_dis%scroller.itemHeight>0){
							_dis-=(_dis%scroller.itemHeight)-scroller.itemHeight;
						};
						if(_dis<_max){_dis=_max};
						scroller.dom.box.animate({"scrollTop":_dis},_speed,settings.easing,function(){
							if(parseInt(scroller.dom.box.scrollTop(),10)<=_max){
								scroller.dom.box.scrollTop(0);
							};
						});
					};
					break;
	
				case "right":
				case "bottom":
					_max=scroller.itemSum*scroller.moveVal;
					if(d=="right"){
						_dis=scroller.dom.box.scrollLeft()+(scroller.moveVal*settings.step);
						if(_dis%scroller.itemWidth>0){
							_dis-=(_dis%scroller.itemWidth);
						};
						if(_dis>_max){_dis=_max};
						scroller.dom.box.animate({"scrollLeft":_dis},_speed,settings.easing,function(){
							if(parseInt(scroller.dom.box.scrollLeft(),10)>=_max){
								scroller.dom.box.scrollLeft(0);
							};
						});
					}else{
						_dis=scroller.dom.box.scrollTop()+(scroller.moveVal*settings.step);
						if(_dis%scroller.itemHeight>0){
							_dis-=(_dis%scroller.itemHeight);
						};
						if(_dis>_max){_dis=_max};
						scroller.dom.box.animate({"scrollTop":_dis},_speed,settings.easing,function(){
							if(parseInt(scroller.dom.box.scrollTop(),10)>=_max){
								scroller.dom.box.scrollTop(0);
							};
						});
					};
					break;
				
				// not default
			};
			
			scroller.dom.box.queue(function(){
				if(settings.controlLock){
					scroller.lock=false;
				};
				scroller.on();
				$(this).dequeue();
			});
		};

		scroller.init();
	};

	// 默认值
	$.cxScroll={defaults:{
		direction:"right",	// 滚动方向
		easing:"swing",		// 缓动方式
		step:1,				// 滚动步长
		accel:160,			// 手动滚动速度
		speed:800,			// 自动滚动速度
		time:4000,			// 自动滚动间隔时间
		auto:true,			// 是否自动滚动
		prevBtn:true,		// 是否使用 prev 按钮
		nextBtn:true,		// 是否使用 next 按钮
		safeLock:true		// 滚动时是否锁定控制按钮
	}};
})(jQuery);
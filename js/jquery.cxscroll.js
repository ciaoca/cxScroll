/*!
 * jQuery cxScroll 1.2.2
 * http://code.ciaoca.com/
 * https://github.com/ciaoca/cxScroll
 * E-mail: ciaoca@gmail.com
 * Released under the MIT license
 * Date: 2015-09-17
 */
(function(factory){
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  };
}(function($){
  $.cxScroll = function(){
    var obj;
    var settings;
    var callback;
    var scroller = {
      dom: {},
      api: {},
      lockState: false
    };

    // 检测是否为 DOM 元素
    var isElement = function(o){
      if(o && (typeof HTMLElement === 'function' || typeof HTMLElement === 'object') && o instanceof HTMLElement) {
        return true;
      } else {
        return (o && o.nodeType && o.nodeType === 1) ? true : false;
      };
    };

    // 检测是否为 jQuery 对象
    var isJquery = function(o){
      return (o && o.length && (typeof jQuery === 'function' || typeof jQuery === 'object') && o instanceof jQuery) ? true : false;
    };

    // 分配参数
    for (var i = 0, l = arguments.length; i < l; i++) {
      if (isJquery(arguments[i])) {
        obj = arguments[i];
      } else if (isElement(arguments[i])) {
        obj = $(arguments[i]);
      } else if (typeof arguments[i] === 'function') {
        callback = arguments[i];
      } else if (typeof arguments[i] === 'object') {
        settings = arguments[i];
      };
    };

    if (!obj.length) {return};

    scroller.init = function(){
      var self = this;

      self.dom.el = obj;
      self.settings = $.extend({}, $.cxScroll.defaults, settings);

      self.build();

      self.api = {
        play: function(){
          self.settings.auto = true;
          self.play();
        },
        stop: function(){
          self.settings.auto = false;
          self.stop();
        },
        prev: function(speed){
          speed = parseInt(speed, 10);
          if (typeof speed !== 'number' || speed < 0) {
            speed = self.settings.speed;
          };
          self.goto(self.prevVal, speed);
        },
        next: function(speed){
          speed = parseInt(speed, 10);
          if (typeof speed !== 'number' || speed < 0) {
            speed = self.settings.speed;
          };
          self.goto(self.nextVal, speed);
        }
      };

      if (typeof callback === 'function') {
        callback(self.api);
      };
    };

    scroller.build = function(){
      var self = this;

      self.dom.box = self.dom.el.find('.box');
      self.dom.list = self.dom.box.find('.list');
      self.dom.items = self.dom.list.find('li');
      self.itemSum = self.dom.items.length;

      // 没有元素或只有1个元素时，不进行滚动
      if (self.itemSum <= 1){return};

      self.dom.prevBtn = self.dom.el.find('.prev');
      self.dom.nextBtn = self.dom.el.find('.next');
      self.itemWidth = self.dom.items.outerWidth();
      self.itemHeight = self.dom.items.outerHeight();

      if (self.settings.direction === 'left' || self.settings.direction === 'right') {
        // 容器宽度不足时，不进行滚动
        if (self.itemWidth * self.itemSum <= self.dom.box.outerWidth()) {return};

        self.prevVal = 'left';
        self.nextVal = 'right';
        self.moveVal = self.itemWidth;

      } else {
        // 容器高度不足时，不进行滚动
        if (self.itemHeight * self.itemSum <= self.dom.box.outerHeight()){return};

        self.prevVal = 'top';
        self.nextVal = 'bottom';
        self.moveVal = self.itemHeight;
      };

      // 元素：后补
      self.dom.list.append(self.dom.list.html());

      // 添加元素：手动操作按钮
      if (self.settings.prevBtn && !self.dom.prevBtn.length) {
        self.dom.prevBtn = $('<a></a>', {'class':'prev'}).prependTo(self.dom.el);
      };
      if (self.settings.nextBtn && !self.dom.nextBtn.length) {
        self.dom.nextBtn = $('<a></a>', {'class':'next'}).prependTo(self.dom.el);
      };

      // 事件：手动操作
      if (self.settings.nextBtn && self.dom.prevBtn.length) {
        self.dom.nextBtn.bind('click', function(){
          if (!self.lockState) {
            self.goto(self.nextVal, self.settings.accel);
          };
        });
      };
      if (self.settings.prevBtn && self.dom.prevBtn.length) {
        self.dom.prevBtn.bind('click', function(){
          if (!self.lockState) {
            self.goto(self.prevVal, self.settings.accel);
          };
        });
      };

      // 事件：鼠标移入停止，移出开始
      if (self.settings.hoverLock) {
        self.dom.box.on('mouseenter', function(){
          self.stop();
        });
        self.dom.box.on('mouseleave', function(){
          self.play();
        });
      };

      self.play();
    };

    // 方法：开始
    scroller.play = function(){
      var self = this;

      if (!self.settings.auto) {return};
      self.stop();

      self.run = setTimeout(function(){
        self.goto();
      }, self.settings.time);
    };

    // 方法：停止
    scroller.stop = function(){
      // 立即停止（效果不是很好）
      // this.dom.box.stop(true);
      if (typeof(this.run) !== 'undefined') {
        clearTimeout(this.run);
      };
    };

    // 方法：滚动
    scroller.goto = function(d, t){
      var self = this;
      var _max;  // 滚动的最大限度
      var _dis;  // 滚动的距离
      var _speed = t || self.settings.speed;

      if (typeof d !== 'string') {
        d = self.settings.direction;
      };

      self.stop();
      self.lockState = true;

      switch(d) {
        case 'left':
        case 'top':
          _max = 0;

          if (d === 'left') {
            if (parseInt(self.dom.box.scrollLeft(), 10) === 0) {
              self.dom.box.scrollLeft(self.itemSum * self.moveVal);
            };

            _dis = self.dom.box.scrollLeft() - (self.moveVal * self.settings.step);

            if (_dis % self.itemWidth > 0) {
              _dis -= (_dis % self.itemWidth) - self.itemWidth;
            };

            if (_dis < _max) {
              _dis = _max;
            };

            self.dom.box.animate({
              'scrollLeft': _dis
            }, _speed, self.settings.easing, function(){
              if (parseInt(self.dom.box.scrollLeft(), 10) <= _max) {
                self.dom.box.scrollLeft(0);
              };
            });

          } else {
            if (parseInt(self.dom.box.scrollTop(), 10) === 0) {
              self.dom.box.scrollTop(self.itemSum * self.moveVal);
            };

            _dis = self.dom.box.scrollTop() - (self.moveVal * self.settings.step);

            if (_dis % self.itemHeight > 0) {
              _dis-=(_dis%self.itemHeight)-self.itemHeight;
            };

            if (_dis < _max){
              _dis = _max;
            };

            self.dom.box.animate({
              'scrollTop': _dis
            }, _speed, self.settings.easing, function(){
              if (parseInt(self.dom.box.scrollTop(), 10) <= _max) {
                self.dom.box.scrollTop(0);
              };
            });
          };
          break;
  
        case 'right':
        case 'bottom':
          _max = self.itemSum * self.moveVal;

          if (d === 'right'){
            _dis = self.dom.box.scrollLeft() + (self.moveVal * self.settings.step);

            if (_dis % self.itemWidth > 0) {
              _dis -= (_dis % self.itemWidth);
            };

            if (_dis > _max){
              _dis = _max;
            };

            self.dom.box.animate({
              'scrollLeft': _dis
            }, _speed, self.settings.easing, function(){
              if (parseInt(self.dom.box.scrollLeft(), 10) >= _max) {
                self.dom.box.scrollLeft(0);
              };
            });

          } else {
            _dis = self.dom.box.scrollTop() + (self.moveVal * self.settings.step);

            if (_dis % self.itemHeight > 0){
              _dis -= (_dis % self.itemHeight);
            };

            if (_dis > _max){
              _dis = _max;
            };

            self.dom.box.animate({
              'scrollTop': _dis
            }, _speed, self.settings.easing, function(){
              if (parseInt(self.dom.box.scrollTop(), 10) >= _max) {
                self.dom.box.scrollTop(0);
              };
            });
          };
          break;
        
        default:
          return;
      };
      
      self.dom.box.queue(function(){
        self.lockState = false;
        self.play();
        $(this).dequeue();
      });
    };

    scroller.init();
  };

  // 默认值
  $.cxScroll.defaults = {
    direction: 'right',   // 滚动方向
    easing: 'swing',      // 缓动方式
    step: 1,              // 滚动步长
    accel: 200,           // 手动滚动速度
    speed: 800,           // 自动滚动速度
    time: 4000,           // 自动滚动间隔时间
    auto: true,           // 是否自动滚动
    hoverLock: true,      // 鼠标移入移出锁定
    prevBtn: true,        // 是否使用 prev 按钮
    nextBtn: true         // 是否使用 next 按钮
  };

  $.fn.cxScroll = function(settings, callback){
    this.each(function(i){
      $.cxScroll(this, settings, callback);
    });
    return this;
  };
}));

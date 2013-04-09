pmc_in_script_time_1910=new Date()*1;(function(){var D=function(){this.constructor=arguments.callee;this._offsetX=0;this._offsetY=0;this._previousMouseX=0;this._previousMouseY=0;this._startX=0;this._startY=0;this._locked=false;this._element=null;this._handler={};this._delayTimer=0;this._delayHandler=function(){};this.delayTime=0;this.document=document;this.window=window;this.events={mousedown:"mousedown",mousemove:"mousemove",mouseup:"mouseup"};this._initialize.apply(this,arguments);};D.prototype=function(){var H=BB.Dom,G=BB.ObjectH,F=BB.CustEvent;return{_initialize:function(J){var E=[];for(var I in this.events){E.push(this.events[I]);}F.createEvents(this,E);G.mix(this,J||{},true);},_dispatch:function(I,E){var J=new F(this._element,I);J.position=E;return this.fire(J);},_clearSelection:function(){try{this.document.selection&&this.document.selection.empty&&(this.document.selection.empty(),1)||this.window.getSelection&&this.window.getSelection().removeAllRanges();}catch(E){}},_bind:function(I){var E=this;this._element=I;this._locked=true;this._handler.move=function(J){E._move(J);};this._handler.up=function(J){setTimeout(function(){E._up(J);},0);E._dispose();};H.on(this.document,"mousemove",this._handler.move);H.on(this.document,"mouseup",this._handler.up);if(this.document.documentElement.setCapture){H.on(this.document.documentElement,"losecapture",this._handler.up);this.document.documentElement.setCapture();}},_dispose:function(){H.un(this.document,"mousemove",this._handler.move);H.un(this.document,"mouseup",this._handler.up);if(this.document.documentElement.setCapture){H.un(this.document.documentElement,"losecapture",this._handler.up);this.document.documentElement.releaseCapture();}this._element=null;this._locked=false;this._handler={};},_down:function(J){this._clearSelection();var E=this._element,I=H.getXY(E);this._previousMouseX=J.pageX;this._previousMouseY=J.pageY;this._startX=I[0];this._startY=I[1];this._offsetX=J.pageX-I[0];this._offsetY=J.pageY-I[1];this._dispatch(this.events.mousedown,{startX:this._startX,startY:this._startY,offsetX:this._offsetX,offsetY:this._offsetY,pageX:J.pageX-this._offsetX,pageY:J.pageY-this._offsetY,mouseX:J.pageX,mouseY:J.pageY,deltaX:J.pageX-this._previousMouseX,deltaY:J.pageY-this._previousMouseY});},_move:function(I){var E=this;this._clearSelection();this._delayHandler=function(){E._delayTimer=0;E._delayHandler=function(){};E._dispatch(E.events.mousemove,{startX:E._startX,startY:E._startY,offsetX:E._offsetX,offsetY:E._offsetY,pageX:I.pageX-E._offsetX,pageY:I.pageY-E._offsetY,mouseX:I.pageX,mouseY:I.pageY,deltaX:I.pageX-E._previousMouseX,deltaY:I.pageY-E._previousMouseY});E._previousMouseX=I.pageX;E._previousMouseY=I.pageY;};if(!this._delayTimer){this._delayTimer=setTimeout(function(){E._delayHandler();},this.delayTime);}},_up:function(E){if(this._delayTimer){this._delayHandler();}this._dispatch(this.events.mouseup,{startX:this._startX,startY:this._startY,offsetX:this._offsetX,offsetY:this._offsetY,pageX:E.pageX-this._offsetX,pageY:E.pageY-this._offsetY,mouseX:E.pageX,mouseY:E.pageY,deltaX:E.pageX-this._previousMouseX,deltaY:E.pageY-this._previousMouseY});},start:function(I,E){if(this._locked){return ;}this._bind(E);this._down(I);}};}();var B=function(){this.constructor=arguments.callee;this.source=null;this.proxy=null;this.handle=null;this.locked=false;this._handler=null;this._initialize.apply(this,arguments);};B.parse=function(E){if(E.source){return new this(E);}};B.prototype=function(){return{_initialize:function(E){this.source=E.source;this.proxy=E.proxy||E.source;this.handle=E.handle||E.source;this.locked=E.locked||false;this._handler=null;}};}();var A=function(){this.constructor=arguments.callee;this._drag=null;this._context={};this._activeEntity=null;this._locked=false;this._activeTimer=0;this._dragging=false;this._entered=false;this.document=document;this.window=window;this.entities=[];this.target=null;this.activeDelay=1000;this.activePixel=3;this.delayTime=1;this.CLASS_SOURCE_DRAGGING="source-dragging";this.CLASS_PROXY_DRAGGING="proxy-dragging";this.CLASS_SOURCE_DRAGOVER="source-dragover";this.CLASS_PROXY_DRAGOVER="proxy-dragover";this.events={dragstart:"dragstart",drag:"drag",dragend:"dragend",dragenter:"dragenter",dragover:"dragover",dragleave:"dragleave",invaliddrop:"invaliddrop",dragdrop:"dragdrop"};this._initialize.apply(this,arguments);};A.prototype=function(){var H=BB.Dom,G=BB.ObjectH,F=BB.CustEvent;return{_initialize:function(J,K){var E=[];for(var I in this.events){E.push(this.events[I]);}F.createEvents(this,E);G.mix(this,J||{},true);this._drag=new D;this._drag.window=this.window;this._drag.document=this.document;this._drag.delayTime=this.delayTime||1;if(K){K=this._convertEntitys(K);for(var I=0;I<K.length;++I){this.register(K[I]);}}this._bind();},_restore:function(){if(this._activeTimer){clearTimeout(this._activeTimer);this._activeTimer=0;}this._activeEntity=null;this._context={};this._entered=false;this._dragging=false;},_convertEntitys:function(E){return E instanceof this.window.Array?E:[E];},convertPosition:function(E){},_bind:function(){var E=this;this._drag.onmousedown=function(I){E._down(I);};this._drag.onmousemove=function(I){E._move(I);};this._drag.onmouseup=function(I){E._up(I);E._restore();};},_register:function(I){var E=this;H.on(I.handle,"mousedown",I._handler=function(J){if(E._locked||I.locked){return ;}E._activeEntity=I;E._drag.start(J,I.source);});},_dispose:function(E){H.un(E.handle,"mousedown",E._handler);E._handler=null;},register:function(E){E=B.parse(E);this.entities.push(E);this._register(E);},dispose:function(E){for(var I=0;I<this.entities.length;++I){if(this.entities[I].source==E){this._dispose(this.entities[I]);this.entities.splice(I,1);break;}}},_dispatch:function(I,E){var J=new F(this._activeEntity,I);J.position=E;J.context=this._context;return this.fire(J);},_operateMoveTargetEvent:function(E){if(this.target){var I=this.target({target:this._activeEntity,position:E,context:this._context});if(I){if(this._entered){return this._dispatch(this.events.dragover,E);}else{this._entered=true;H.addClass(this._activeEntity.source,this.CLASS_SOURCE_DRAGOVER);H.addClass(this._activeEntity.proxy,this.CLASS_PROXY_DRAGOVER);return this._dispatch(this.events.dragenter,E);}}else{if(this._entered){this._entered=false;H.removeClass(this._activeEntity.source,this.CLASS_SOURCE_DRAGOVER);H.removeClass(this._activeEntity.proxy,this.CLASS_PROXY_DRAGOVER);return this._dispatch(this.events.dragleave,E);}}}return true;},_operateUpTargetEvent:function(E){if(this.target){H.removeClass(this._activeEntity.source,this.CLASS_SOURCE_DRAGOVER);H.removeClass(this._activeEntity.proxy,this.CLASS_PROXY_DRAGOVER);if(this._entered){return this._dispatch(this.events.dragdrop,E);}else{return this._dispatch(this.events.invaliddrop,E);}}return true;},_down:function(I){var E=this;if(this._activeTimer){clearTimeout(this._activeTimer);}this._activeTimer=setTimeout(function(){E._activeTimer=0;E._dragging=true;H.addClass(E._activeEntity.source,E.CLASS_SOURCE_DRAGGING);H.addClass(E._activeEntity.proxy,E.CLASS_PROXY_DRAGGING);if(!E._dispatch(E.events.dragstart,I.position)){return ;}if(!E._operateMoveTargetEvent(I.position)){return ;}},this.activeDelay);},_move:function(E){if(this._dragging){this.convertPosition(E.position);if(!this._operateMoveTargetEvent(E.position)){return ;}if(!this._dispatch(this.events.drag,E.position)){return ;}}else{if(Math.sqrt(Math.pow(E.position.pageX-E.position.startX,2)+Math.pow(E.position.pageY-E.position.startY,2))>this.activePixel){if(this._activeTimer){clearTimeout(this._activeTimer);this._activeTimer=0;}this._dragging=true;H.addClass(this._activeEntity.source,this.CLASS_SOURCE_DRAGGING);H.addClass(this._activeEntity.proxy,this.CLASS_PROXY_DRAGGING);if(!this._dispatch(this.events.dragstart,E.position)){return ;}if(!this._operateMoveTargetEvent(E.position)){return ;}}}},_up:function(E){if(this._dragging){this.convertPosition(E.position);H.removeClass(this._activeEntity.source,this.CLASS_SOURCE_DRAGGING);H.removeClass(this._activeEntity.proxy,this.CLASS_PROXY_DRAGGING);if(!this._operateUpTargetEvent(E.position)){return ;}if(!this._dispatch(this.events.dragend,E.position)){return ;}}},lock:function(){this._locked=true;},unlock:function(){this._locked=false;}};}();var C=BB.ClassH.extend(function(){this.container=null;this.withProxy=true;this.constraintX=false;this.constraintY=false;this.CLASS_PROXY="drag-proxy";arguments.callee.$super.apply(this,arguments);this.target=this._convertTarget(this.target);},A,false);BB.ObjectH.mix(C.prototype,function(){var F=BB.Dom,E=BB.ObjectH;return{_convertTarget:function(G){if(!G){return null;}if(G instanceof this.window.Function){return G;}if(!(G instanceof this.window.Array)){G=[G];}return function(L){var H=G,I=H.length,J=0,K=null;for(;J<I;++J){K=F.getRect(H[J]);if(L.position.mouseX>K.left&&L.position.mouseX<K.right&&L.position.mouseY>K.top&&L.position.mouseY<K.bottom){L.context.target=H[J];return true;}}return false;};},convertPosition:function(G){if(this.container){var I=(this.container instanceof this.window.Function)?this.container():F.getRect(this.container),H=this._activeEntity.proxy;G.pageX=Math.max(Math.min(G.pageX,I.right-H.offsetWidth),I.left);G.pageY=Math.max(Math.min(G.pageY,I.bottom-H.offsetHeight),I.top);}},ondragstart:function(H){if(this.withProxy){var G=F.getRect(H.target.source);F.setInnerSize(H.target.proxy,G.width,G.height);F.setXY(H.target.proxy,H.position.startX,H.position.startY);}F.setXY(H.target.proxy,this.constraintY?null:H.position.pageX,this.constraintX?null:H.position.pageY);},ondrag:function(G){F.setXY(G.target.proxy,this.constraintY?null:G.position.pageX,this.constraintX?null:G.position.pageY);},ondragend:function(H){var G=this.constraintY?null:H.position.pageX,I=this.constraintX?null:H.position.pageY;F.setXY(H.target.proxy,G,I);F.setXY(H.target.source,G,I);},_getProxy:function(){var G=F.create('<div class="'+this.CLASS_PROXY+'"></div>',false,this.document);this.document.body.insertBefore(G,this.document.body.firstChild);return G;},register:function(G){if(!G.proxy&&this.withProxy){G.proxy=this._getProxy();}G=B.parse(G);this.entities.push(G);this._register(G);}};}(),true);BB.provide("DragBase",D);BB.provide("DragEntity",B);BB.provide("Drag",A);BB.provide("SimpleDrag",C);})();pmc_exec_time_1910=new Date()*1-pmc_in_script_time_1910;
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(){var root=this;var previousUnderscore=root._;var breaker={};var ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype;var push=ArrayProto.push,slice=ArrayProto.slice,concat=ArrayProto.concat,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty;var nativeForEach=ArrayProto.forEach,nativeMap=ArrayProto.map,nativeReduce=ArrayProto.reduce,nativeReduceRight=ArrayProto.reduceRight,nativeFilter=ArrayProto.filter,nativeEvery=ArrayProto.every,nativeSome=ArrayProto.some,nativeIndexOf=ArrayProto.indexOf,nativeLastIndexOf=ArrayProto.lastIndexOf,nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeBind=FuncProto.bind;var _=function(obj){if(obj instanceof _)return obj;if(!(this instanceof _))return new _(obj);this._wrapped=obj};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=_}exports._=_}else{root._=_}_.VERSION="1.5.2";var each=_.each=_.forEach=function(obj,iterator,context){if(obj==null)return;if(nativeForEach&&obj.forEach===nativeForEach){obj.forEach(iterator,context)}else if(obj.length===+obj.length){for(var i=0,length=obj.length;i<length;i++){if(iterator.call(context,obj[i],i,obj)===breaker)return}}else{var keys=_.keys(obj);for(var i=0,length=keys.length;i<length;i++){if(iterator.call(context,obj[keys[i]],keys[i],obj)===breaker)return}}};_.map=_.collect=function(obj,iterator,context){var results=[];if(obj==null)return results;if(nativeMap&&obj.map===nativeMap)return obj.map(iterator,context);each(obj,function(value,index,list){results.push(iterator.call(context,value,index,list))});return results};var reduceError="Reduce of empty array with no initial value";_.reduce=_.foldl=_.inject=function(obj,iterator,memo,context){var initial=arguments.length>2;if(obj==null)obj=[];if(nativeReduce&&obj.reduce===nativeReduce){if(context)iterator=_.bind(iterator,context);return initial?obj.reduce(iterator,memo):obj.reduce(iterator)}each(obj,function(value,index,list){if(!initial){memo=value;initial=true}else{memo=iterator.call(context,memo,value,index,list)}});if(!initial)throw new TypeError(reduceError);return memo};_.reduceRight=_.foldr=function(obj,iterator,memo,context){var initial=arguments.length>2;if(obj==null)obj=[];if(nativeReduceRight&&obj.reduceRight===nativeReduceRight){if(context)iterator=_.bind(iterator,context);return initial?obj.reduceRight(iterator,memo):obj.reduceRight(iterator)}var length=obj.length;if(length!==+length){var keys=_.keys(obj);length=keys.length}each(obj,function(value,index,list){index=keys?keys[--length]:--length;if(!initial){memo=obj[index];initial=true}else{memo=iterator.call(context,memo,obj[index],index,list)}});if(!initial)throw new TypeError(reduceError);return memo};_.find=_.detect=function(obj,iterator,context){var result;any(obj,function(value,index,list){if(iterator.call(context,value,index,list)){result=value;return true}});return result};_.filter=_.select=function(obj,iterator,context){var results=[];if(obj==null)return results;if(nativeFilter&&obj.filter===nativeFilter)return obj.filter(iterator,context);each(obj,function(value,index,list){if(iterator.call(context,value,index,list))results.push(value)});return results};_.reject=function(obj,iterator,context){return _.filter(obj,function(value,index,list){return!iterator.call(context,value,index,list)},context)};_.every=_.all=function(obj,iterator,context){iterator||(iterator=_.identity);var result=true;if(obj==null)return result;if(nativeEvery&&obj.every===nativeEvery)return obj.every(iterator,context);each(obj,function(value,index,list){if(!(result=result&&iterator.call(context,value,index,list)))return breaker});return!!result};var any=_.some=_.any=function(obj,iterator,context){iterator||(iterator=_.identity);var result=false;if(obj==null)return result;if(nativeSome&&obj.some===nativeSome)return obj.some(iterator,context);each(obj,function(value,index,list){if(result||(result=iterator.call(context,value,index,list)))return breaker});return!!result};_.contains=_.include=function(obj,target){if(obj==null)return false;if(nativeIndexOf&&obj.indexOf===nativeIndexOf)return obj.indexOf(target)!=-1;return any(obj,function(value){return value===target})};_.invoke=function(obj,method){var args=slice.call(arguments,2);var isFunc=_.isFunction(method);return _.map(obj,function(value){return(isFunc?method:value[method]).apply(value,args)})};_.pluck=function(obj,key){return _.map(obj,function(value){return value[key]})};_.where=function(obj,attrs,first){if(_.isEmpty(attrs))return first?void 0:[];return _[first?"find":"filter"](obj,function(value){for(var key in attrs){if(attrs[key]!==value[key])return false}return true})};_.findWhere=function(obj,attrs){return _.where(obj,attrs,true)};_.max=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535){return Math.max.apply(Math,obj)}if(!iterator&&_.isEmpty(obj))return-Infinity;var result={computed:-Infinity,value:-Infinity};each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed>result.computed&&(result={value:value,computed:computed})});return result.value};_.min=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535){return Math.min.apply(Math,obj)}if(!iterator&&_.isEmpty(obj))return Infinity;var result={computed:Infinity,value:Infinity};each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed<result.computed&&(result={value:value,computed:computed})});return result.value};_.shuffle=function(obj){var rand;var index=0;var shuffled=[];each(obj,function(value){rand=_.random(index++);shuffled[index-1]=shuffled[rand];shuffled[rand]=value});return shuffled};_.sample=function(obj,n,guard){if(arguments.length<2||guard){return obj[_.random(obj.length-1)]}return _.shuffle(obj).slice(0,Math.max(0,n))};var lookupIterator=function(value){return _.isFunction(value)?value:function(obj){return obj[value]}};_.sortBy=function(obj,value,context){var iterator=lookupIterator(value);return _.pluck(_.map(obj,function(value,index,list){return{value:value,index:index,criteria:iterator.call(context,value,index,list)}}).sort(function(left,right){var a=left.criteria;var b=right.criteria;if(a!==b){if(a>b||a===void 0)return 1;if(a<b||b===void 0)return-1}return left.index-right.index}),"value")};var group=function(behavior){return function(obj,value,context){var result={};var iterator=value==null?_.identity:lookupIterator(value);each(obj,function(value,index){var key=iterator.call(context,value,index,obj);behavior(result,key,value)});return result}};_.groupBy=group(function(result,key,value){(_.has(result,key)?result[key]:result[key]=[]).push(value)});_.indexBy=group(function(result,key,value){result[key]=value});_.countBy=group(function(result,key){_.has(result,key)?result[key]++:result[key]=1});_.sortedIndex=function(array,obj,iterator,context){iterator=iterator==null?_.identity:lookupIterator(iterator);var value=iterator.call(context,obj);var low=0,high=array.length;while(low<high){var mid=low+high>>>1;iterator.call(context,array[mid])<value?low=mid+1:high=mid}return low};_.toArray=function(obj){if(!obj)return[];if(_.isArray(obj))return slice.call(obj);if(obj.length===+obj.length)return _.map(obj,_.identity);return _.values(obj)};_.size=function(obj){if(obj==null)return 0;return obj.length===+obj.length?obj.length:_.keys(obj).length};_.first=_.head=_.take=function(array,n,guard){if(array==null)return void 0;return n==null||guard?array[0]:slice.call(array,0,n)};_.initial=function(array,n,guard){return slice.call(array,0,array.length-(n==null||guard?1:n))};_.last=function(array,n,guard){if(array==null)return void 0;if(n==null||guard){return array[array.length-1]}else{return slice.call(array,Math.max(array.length-n,0))}};_.rest=_.tail=_.drop=function(array,n,guard){return slice.call(array,n==null||guard?1:n)};_.compact=function(array){return _.filter(array,_.identity)};var flatten=function(input,shallow,output){if(shallow&&_.every(input,_.isArray)){return concat.apply(output,input)}each(input,function(value){if(_.isArray(value)||_.isArguments(value)){shallow?push.apply(output,value):flatten(value,shallow,output)}else{output.push(value)}});return output};_.flatten=function(array,shallow){return flatten(array,shallow,[])};_.without=function(array){return _.difference(array,slice.call(arguments,1))};_.uniq=_.unique=function(array,isSorted,iterator,context){if(_.isFunction(isSorted)){context=iterator;iterator=isSorted;isSorted=false}var initial=iterator?_.map(array,iterator,context):array;var results=[];var seen=[];each(initial,function(value,index){if(isSorted?!index||seen[seen.length-1]!==value:!_.contains(seen,value)){seen.push(value);results.push(array[index])}});return results};_.union=function(){return _.uniq(_.flatten(arguments,true))};_.intersection=function(array){var rest=slice.call(arguments,1);return _.filter(_.uniq(array),function(item){return _.every(rest,function(other){return _.indexOf(other,item)>=0})})};_.difference=function(array){var rest=concat.apply(ArrayProto,slice.call(arguments,1));return _.filter(array,function(value){return!_.contains(rest,value)})};_.zip=function(){var length=_.max(_.pluck(arguments,"length").concat(0));var results=new Array(length);for(var i=0;i<length;i++){results[i]=_.pluck(arguments,""+i)}return results};_.object=function(list,values){if(list==null)return{};var result={};for(var i=0,length=list.length;i<length;i++){if(values){result[list[i]]=values[i]}else{result[list[i][0]]=list[i][1]}}return result};_.indexOf=function(array,item,isSorted){if(array==null)return-1;var i=0,length=array.length;if(isSorted){if(typeof isSorted=="number"){i=isSorted<0?Math.max(0,length+isSorted):isSorted}else{i=_.sortedIndex(array,item);return array[i]===item?i:-1}}if(nativeIndexOf&&array.indexOf===nativeIndexOf)return array.indexOf(item,isSorted);for(;i<length;i++)if(array[i]===item)return i;return-1};_.lastIndexOf=function(array,item,from){if(array==null)return-1;var hasIndex=from!=null;if(nativeLastIndexOf&&array.lastIndexOf===nativeLastIndexOf){return hasIndex?array.lastIndexOf(item,from):array.lastIndexOf(item)}var i=hasIndex?from:array.length;while(i--)if(array[i]===item)return i;return-1};_.range=function(start,stop,step){if(arguments.length<=1){stop=start||0;start=0}step=arguments[2]||1;var length=Math.max(Math.ceil((stop-start)/step),0);var idx=0;var range=new Array(length);while(idx<length){range[idx++]=start;start+=step}return range};var ctor=function(){};_.bind=function(func,context){var args,bound;if(nativeBind&&func.bind===nativeBind)return nativeBind.apply(func,slice.call(arguments,1));if(!_.isFunction(func))throw new TypeError;args=slice.call(arguments,2);return bound=function(){if(!(this instanceof bound))return func.apply(context,args.concat(slice.call(arguments)));ctor.prototype=func.prototype;var self=new ctor;ctor.prototype=null;var result=func.apply(self,args.concat(slice.call(arguments)));if(Object(result)===result)return result;return self}};_.partial=function(func){var args=slice.call(arguments,1);return function(){return func.apply(this,args.concat(slice.call(arguments)))}};_.bindAll=function(obj){var funcs=slice.call(arguments,1);if(funcs.length===0)throw new Error("bindAll must be passed function names");each(funcs,function(f){obj[f]=_.bind(obj[f],obj)});return obj};_.memoize=function(func,hasher){var memo={};hasher||(hasher=_.identity);return function(){var key=hasher.apply(this,arguments);return _.has(memo,key)?memo[key]:memo[key]=func.apply(this,arguments)}};_.delay=function(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){return func.apply(null,args)},wait)};_.defer=function(func){return _.delay.apply(_,[func,1].concat(slice.call(arguments,1)))};_.throttle=function(func,wait,options){var context,args,result;var timeout=null;var previous=0;options||(options={});var later=function(){previous=options.leading===false?0:new Date;timeout=null;result=func.apply(context,args)};return function(){var now=new Date;if(!previous&&options.leading===false)previous=now;var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0){clearTimeout(timeout);timeout=null;previous=now;result=func.apply(context,args)}else if(!timeout&&options.trailing!==false){timeout=setTimeout(later,remaining)}return result}};_.debounce=function(func,wait,immediate){var timeout,args,context,timestamp,result;return function(){context=this;args=arguments;timestamp=new Date;var later=function(){var last=new Date-timestamp;if(last<wait){timeout=setTimeout(later,wait-last)}else{timeout=null;if(!immediate)result=func.apply(context,args)}};var callNow=immediate&&!timeout;if(!timeout){timeout=setTimeout(later,wait)}if(callNow)result=func.apply(context,args);return result}};_.once=function(func){var ran=false,memo;return function(){if(ran)return memo;ran=true;memo=func.apply(this,arguments);func=null;return memo}};_.wrap=function(func,wrapper){return function(){var args=[func];push.apply(args,arguments);return wrapper.apply(this,args)}};_.compose=function(){var funcs=arguments;return function(){var args=arguments;for(var i=funcs.length-1;i>=0;i--){args=[funcs[i].apply(this,args)]}return args[0]}};_.after=function(times,func){return function(){if(--times<1){return func.apply(this,arguments)}}};_.keys=nativeKeys||function(obj){if(obj!==Object(obj))throw new TypeError("Invalid object");var keys=[];for(var key in obj)if(_.has(obj,key))keys.push(key);return keys};_.values=function(obj){var keys=_.keys(obj);var length=keys.length;var values=new Array(length);for(var i=0;i<length;i++){values[i]=obj[keys[i]]}return values};_.pairs=function(obj){var keys=_.keys(obj);var length=keys.length;var pairs=new Array(length);for(var i=0;i<length;i++){pairs[i]=[keys[i],obj[keys[i]]]}return pairs};_.invert=function(obj){var result={};var keys=_.keys(obj);for(var i=0,length=keys.length;i<length;i++){result[obj[keys[i]]]=keys[i]}return result};_.functions=_.methods=function(obj){var names=[];for(var key in obj){if(_.isFunction(obj[key]))names.push(key)}return names.sort()};_.extend=function(obj){each(slice.call(arguments,1),function(source){if(source){for(var prop in source){obj[prop]=source[prop]}}});return obj};_.pick=function(obj){var copy={};var keys=concat.apply(ArrayProto,slice.call(arguments,1));each(keys,function(key){if(key in obj)copy[key]=obj[key]});return copy};_.omit=function(obj){var copy={};var keys=concat.apply(ArrayProto,slice.call(arguments,1));for(var key in obj){if(!_.contains(keys,key))copy[key]=obj[key]}return copy};_.defaults=function(obj){each(slice.call(arguments,1),function(source){if(source){for(var prop in source){if(obj[prop]===void 0)obj[prop]=source[prop]}}});return obj};_.clone=function(obj){if(!_.isObject(obj))return obj;return _.isArray(obj)?obj.slice():_.extend({},obj)};_.tap=function(obj,interceptor){interceptor(obj);return obj};var eq=function(a,b,aStack,bStack){if(a===b)return a!==0||1/a==1/b;if(a==null||b==null)return a===b;if(a instanceof _)a=a._wrapped;if(b instanceof _)b=b._wrapped;var className=toString.call(a);if(className!=toString.call(b))return false;switch(className){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:a==0?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if(typeof a!="object"||typeof b!="object")return false;var length=aStack.length;while(length--){if(aStack[length]==a)return bStack[length]==b}var aCtor=a.constructor,bCtor=b.constructor;if(aCtor!==bCtor&&!(_.isFunction(aCtor)&&aCtor instanceof aCtor&&_.isFunction(bCtor)&&bCtor instanceof bCtor)){return false}aStack.push(a);bStack.push(b);var size=0,result=true;if(className=="[object Array]"){size=a.length;result=size==b.length;if(result){while(size--){if(!(result=eq(a[size],b[size],aStack,bStack)))break}}}else{for(var key in a){if(_.has(a,key)){size++;if(!(result=_.has(b,key)&&eq(a[key],b[key],aStack,bStack)))break}}if(result){for(key in b){if(_.has(b,key)&&!size--)break}result=!size}}aStack.pop();bStack.pop();return result};_.isEqual=function(a,b){return eq(a,b,[],[])};_.isEmpty=function(obj){if(obj==null)return true;if(_.isArray(obj)||_.isString(obj))return obj.length===0;for(var key in obj)if(_.has(obj,key))return false;return true};_.isElement=function(obj){return!!(obj&&obj.nodeType===1)};_.isArray=nativeIsArray||function(obj){return toString.call(obj)=="[object Array]"};_.isObject=function(obj){return obj===Object(obj)};each(["Arguments","Function","String","Number","Date","RegExp"],function(name){_["is"+name]=function(obj){return toString.call(obj)=="[object "+name+"]"}});if(!_.isArguments(arguments)){_.isArguments=function(obj){return!!(obj&&_.has(obj,"callee"))}}if(typeof/./!=="function"){_.isFunction=function(obj){return typeof obj==="function"}}_.isFinite=function(obj){return isFinite(obj)&&!isNaN(parseFloat(obj))};_.isNaN=function(obj){return _.isNumber(obj)&&obj!=+obj};_.isBoolean=function(obj){return obj===true||obj===false||toString.call(obj)=="[object Boolean]"};_.isNull=function(obj){return obj===null};_.isUndefined=function(obj){return obj===void 0};_.has=function(obj,key){return hasOwnProperty.call(obj,key)};_.noConflict=function(){root._=previousUnderscore;return this};_.identity=function(value){return value};_.times=function(n,iterator,context){var accum=Array(Math.max(0,n));for(var i=0;i<n;i++)accum[i]=iterator.call(context,i);return accum};_.random=function(min,max){if(max==null){max=min;min=0}return min+Math.floor(Math.random()*(max-min+1))};var entityMap={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};entityMap.unescape=_.invert(entityMap.escape);var entityRegexes={escape:new RegExp("["+_.keys(entityMap.escape).join("")+"]","g"),unescape:new RegExp("("+_.keys(entityMap.unescape).join("|")+")","g")};_.each(["escape","unescape"],function(method){_[method]=function(string){if(string==null)return"";return(""+string).replace(entityRegexes[method],function(match){return entityMap[method][match]})}});_.result=function(object,property){if(object==null)return void 0;var value=object[property];return _.isFunction(value)?value.call(object):value};_.mixin=function(obj){each(_.functions(obj),function(name){var func=_[name]=obj[name];_.prototype[name]=function(){var args=[this._wrapped];push.apply(args,arguments);return result.call(this,func.apply(_,args))}})};var idCounter=0;_.uniqueId=function(prefix){var id=++idCounter+"";return prefix?prefix+id:id};_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var noMatch=/(.)^/;var escapes={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"};var escaper=/\\|'|\r|\n|\t|\u2028|\u2029/g;_.template=function(text,data,settings){var render;settings=_.defaults({},settings,_.templateSettings);var matcher=new RegExp([(settings.escape||noMatch).source,(settings.interpolate||noMatch).source,(settings.evaluate||noMatch).source].join("|")+"|$","g");var index=0;var source="__p+='";text.replace(matcher,function(match,escape,interpolate,evaluate,offset){source+=text.slice(index,offset).replace(escaper,function(match){return"\\"+escapes[match]});if(escape){source+="'+\n((__t=("+escape+"))==null?'':_.escape(__t))+\n'"}if(interpolate){source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'"}if(evaluate){source+="';\n"+evaluate+"\n__p+='"}index=offset+match.length;return match});source+="';\n";if(!settings.variable)source="with(obj||{}){\n"+source+"}\n";source="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+source+"return __p;\n";try{render=new Function(settings.variable||"obj","_",source)}catch(e){e.source=source;throw e}if(data)return render(data,_);var template=function(data){return render.call(this,data,_)};template.source="function("+(settings.variable||"obj")+"){\n"+source+"}";return template};_.chain=function(obj){return _(obj).chain()};var result=function(obj){return this._chain?_(obj).chain():obj};_.mixin(_);each(["pop","push","reverse","shift","sort","splice","unshift"],function(name){var method=ArrayProto[name];_.prototype[name]=function(){var obj=this._wrapped;method.apply(obj,arguments);if((name=="shift"||name=="splice")&&obj.length===0)delete obj[0];return result.call(this,obj)}});each(["concat","join","slice"],function(name){var method=ArrayProto[name];_.prototype[name]=function(){return result.call(this,method.apply(this._wrapped,arguments))}});_.extend(_.prototype,{chain:function(){this._chain=true;return this},value:function(){return this._wrapped}})}).call(this)},{}],2:[function(require,module,exports){var AnimatedSprite,CreatedAt,PlayerControlled,Positioned,StaticSprite,StopsAfter,Turnable,Velocity;Positioned=function(){function Positioned(pos){this.pos=pos!=null?pos:[0,0]}return Positioned}();StaticSprite=function(){function StaticSprite(url,pos,size){this.url=url!=null?url:"resources/sun.gif";this.pos=pos!=null?pos:[0,0];this.size=size!=null?size:[128,128]}return StaticSprite}();AnimatedSprite=function(){function AnimatedSprite(url,pos,size,speed,dir,once,frameIndices){this.url=url!=null?url:"resources/sun.gif";this.pos=pos!=null?pos:[0,0];this.size=size!=null?size:[128,128];this.speed=speed!=null?speed:1;this.dir=dir!=null?dir:"vertical";this.once=once!=null?once:false;this.frameIndices=frameIndices!=null?frameIndices:[0];this.index=0}return AnimatedSprite}();Velocity=function(){function Velocity(vector){this.vector=vector!=null?vector:[0,0]}return Velocity}();PlayerControlled=function(){function PlayerControlled(playerSpeed){this.playerSpeed=playerSpeed!=null?playerSpeed:100}return PlayerControlled}();Turnable=function(){function Turnable(sprites){this.sprites=sprites}return Turnable}();CreatedAt=function(){function CreatedAt(){this.createdAt=Date.now()}return CreatedAt}();StopsAfter=function(){function StopsAfter(time){this.time=time!=null?time:1e3}return StopsAfter}();exports.Positioned=Positioned;exports.StaticSprite=StaticSprite;exports.AnimatedSprite=AnimatedSprite;exports.Velocity=Velocity;exports.PlayerControlled=PlayerControlled;exports.Turnable=Turnable;exports.CreatedAt=CreatedAt;exports.StopsAfter=StopsAfter},{}],3:[function(require,module,exports){var Engine,Entity,util,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};util=require("./util.coffee");Entity=require("./entity.coffee");Engine=function(){function Engine(){this.gameLoop=__bind(this.gameLoop,this);this.entities={};this.systems=[];this.lastEntityId=0;this.running=false;this.lastFrameTime=null}Engine.prototype.createEntity=function(components){var c,componentsObject,id,system,_i,_j,_len,_len1,_ref;componentsObject={};for(_i=0,_len=components.length;_i<_len;_i++){c=components[_i];componentsObject[util.keyForComponent(c)]=c}id=this.lastEntityId;this.entities[id]=componentsObject;_ref=this.systems;for(_j=0,_len1=_ref.length;_j<_len1;_j++){system=_ref[_j];system.updateCache(id,componentsObject)}this.lastEntityId+=1;return new Entity(id,componentsObject,this)};Engine.prototype.updateEntity=function(id){var components,system,_i,_len,_ref,_results;components=this.entities[id];_ref=this.systems;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){system=_ref[_i];_results.push(system.updateCache(id,components))}return _results};Engine.prototype.addSystem=function(system){this.systems.push(system);return system.buildCache(this.entities)};Engine.prototype.tick=function(dt){var id,idsToUpdate,system,_i,_len,_ref,_results;_ref=this.systems;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){system=_ref[_i];idsToUpdate=system.run(this.entities,dt);_results.push(function(){var _j,_len1,_results1;_results1=[];for(_j=0,_len1=idsToUpdate.length;_j<_len1;_j++){id=idsToUpdate[_j];_results1.push(this.updateEntity(id))}return _results1}.call(this))}return _results};Engine.prototype.removeDeadEntities=function(){var components,id,system,_ref,_results;_ref=this.entities;_results=[];for(id in _ref){components=_ref[id];if(components.destroy!=null){delete this.entities[id];_results.push(function(){var _i,_len,_ref1,_results1;_ref1=this.systems;_results1=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){system=_ref1[_i];_results1.push(system.updateCache(id,null))}return _results1}.call(this))}else{_results.push(void 0)}}return _results};Engine.prototype.start=function(){this.running=true;this.lastFrameTime=null;return requestAnimationFrame(this.gameLoop)};Engine.prototype.gameLoop=function(paintTime){var dt;if(this.lastFrameTime===null){this.lastFrameTime=paintTime;return requestAnimationFrame(this.gameLoop)}else{dt=(paintTime-this.lastFrameTime)/1e3;this.lastFrameTime=paintTime;if(typeof this.beforeTick==="function"){this.beforeTick(dt)}this.tick(dt);this.removeDeadEntities();if(typeof this.afterTick==="function"){this.afterTick(dt)}if(this.running){return requestAnimationFrame(this.gameLoop)}}};return Engine}();module.exports=Engine},{"./entity.coffee":4,"./util.coffee":10}],4:[function(require,module,exports){var Entity,util,_;_=require("underscore");util=require("./util.coffee");Entity=function(){function Entity(id,components,engine){this.id=id;this.components=components;this.engine=engine}Entity.prototype.addComponent=function(component){var componentObject;componentObject={};componentObject[util.keyForComponent(component)]=component;_.extend(this.components,componentObject);return this.engine.updateEntity(this.id)};Entity.prototype.removeComponent=function(componentName){if(_.has(this.components,componentName)){delete this.components[componentName];return this.engine.updateEntity(this.id)}};Entity.prototype.destroy=function(){return this.components.destroy=true};return Entity}();module.exports=Entity},{"./util.coffee":10,underscore:1}],5:[function(require,module,exports){var Input;Input=function(){var keys,setKey;keys={};setKey=function(event,status){var code,key;code=event.keyCode;key=function(){switch(code){case 32:return"SPACE";case 37:return"LEFT";case 38:return"UP";case 39:return"RIGHT";case 40:return"DOWN";case 187:return"+";case 189:return"-";default:return String.fromCharCode(code)}}();return keys[key]=status};document.addEventListener("keydown",function(e){return setKey(e,true)});document.addEventListener("keyup",function(e){return setKey(e,false)});document.addEventListener("blur",function(){return keys={}});return{isDown:function(key){return keys[key.toUpperCase()]}}}();module.exports=Input},{}],6:[function(require,module,exports){var BasicSystem,Engine,Input,Renderer,Resources,System,attachPhysics,attachPlayerController,attachStopsAfter,attachTurner,components,createAndTestEngine,_,_ref;_=require("underscore");Engine=require("./engine.coffee");Input=require("./input.coffee");Renderer=require("./renderer.coffee");Resources=require("./resources.coffee");_ref=require("./system.coffee"),BasicSystem=_ref["BasicSystem"],System=_ref["System"];components=require("./components.coffee");attachPlayerController=function(engine){var playerController;playerController=new BasicSystem(["playercontrolled","velocity"],function(components,dt){var playerSpeed;playerSpeed=components.playercontrolled.playerSpeed;if(Input.isDown("LEFT")){components.velocity.vector[0]=-playerSpeed}else if(Input.isDown("RIGHT")){components.velocity.vector[0]=playerSpeed}else{components.velocity.vector[0]=0}if(Input.isDown("UP")){return components.velocity.vector[1]=-playerSpeed}else if(Input.isDown("DOWN")){return components.velocity.vector[1]=playerSpeed}else{return components.velocity.vector[1]=0}});return engine.addSystem(playerController)};attachPhysics=function(engine){var physics;physics=new BasicSystem(["positioned","velocity"],function(components,dt){components.positioned.pos[0]+=components.velocity.vector[0]*dt;return components.positioned.pos[1]+=components.velocity.vector[1]*dt});return engine.addSystem(physics)};attachTurner=function(engine){var turner;turner=new System(function(components){return _.has(components,"turnable")&&_.has(components,"velocity")&&(_.has(components,"staticsprite")||_.has(components,"animatedsprite"))},function(components,dt){var sprite;sprite=null;if(components.velocity.vector[0]===0){if(components.velocity.vector[1]<0){sprite=components.turnable.sprites[0]}else if(components.velocity.vector[1]>0){sprite=components.turnable.sprites[4]}}else if(components.velocity.vector[0]>0){if(components.velocity.vector[1]<0){sprite=components.turnable.sprites[1]}else if(components.velocity.vector[1]>0){sprite=components.turnable.sprites[3]}}else if(components.velocity.vector[0]<0){if(components.velocity.vector[1]<0){sprite=components.turnable.sprites[7]}else if(components.velocity.vector[1]>0){sprite=components.turnable.sprites[5]}}if(components.velocity.vector[1]===0){if(components.velocity.vector[0]>0){sprite=components.turnable.sprites[2]}if(components.velocity.vector[0]<0){sprite=components.turnable.sprites[6]}}if(sprite!=null){if(_.has(components,"staticsprite")){components.staticsprite=sprite}if(_.has(components,"animatedsprite")){return components.animatedsprite=sprite}}});return engine.addSystem(turner)};attachStopsAfter=function(engine){var stopsAfter;stopsAfter=new BasicSystem(["velocity","createdat","stopsafter"],function(components,dt){if(Date.now()-components.createdat.createdAt>components.stopsafter.time){delete components.stopsafter;components.velocity.vector[0]=0;components.velocity.vector[1]=0;return true}});return engine.addSystem(stopsAfter)};createAndTestEngine=function(canvas){Resources.onReady(function(){var e1,e2,e3,engine,renderer;engine=new Engine;renderer=new Renderer(canvas);engine.addSystem(renderer.system);engine.beforeTick=renderer.clearCanvas;engine.afterTick=renderer.drawFramerate;attachPhysics(engine);attachPlayerController(engine);attachTurner(engine);attachStopsAfter(engine);e1=engine.createEntity([new components.StaticSprite,new components.Positioned,new components.CreatedAt,new components.StopsAfter(10*1e3)]);e2=engine.createEntity([new components.StaticSprite,new components.Positioned([200,200]),new components.Velocity([10,10])]);e3=engine.createEntity([new components.AnimatedSprite("resources/dragonsprites.gif",[0,0],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.Turnable([new components.AnimatedSprite("resources/dragonsprites.gif",[0,6*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.AnimatedSprite("resources/dragonsprites.gif",[0,7*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.AnimatedSprite("resources/dragonsprites.gif",[0,0*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.AnimatedSprite("resources/dragonsprites.gif",[0,1*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.AnimatedSprite("resources/dragonsprites.gif",[0,2*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.AnimatedSprite("resources/dragonsprites.gif",[0,3*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.AnimatedSprite("resources/dragonsprites.gif",[0,4*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8]),new components.AnimatedSprite("resources/dragonsprites.gif",[0,5*70],[75,70],10,"horiz",false,[0,1,2,3,4,5,6,7,8])]),new components.PlayerControlled,new components.Velocity]);engine.start();_.delay(function(){return e1.addComponent(new components.Velocity([10,10]))},2e3);_.delay(function(){_.extend(e3.components,{positioned:new components.Positioned});return engine.updateEntity(e3.id)
},4e3);_.delay(function(){return e1.removeComponent("moving")},1e4);return _.delay(function(){return e2.destroy()},6e3)});return Resources.load(["resources/sun.gif","resources/dragonsprites.gif"])};window.createAndTestEngine=createAndTestEngine},{"./components.coffee":2,"./engine.coffee":3,"./input.coffee":5,"./renderer.coffee":7,"./resources.coffee":8,"./system.coffee":9,underscore:1}],7:[function(require,module,exports){var BasicSystem,CompsiteSystem,Renderer,Resources,System,util,_,_ref;_=require("underscore");Resources=require("./resources.coffee");_ref=require("./system.coffee"),BasicSystem=_ref["BasicSystem"],System=_ref["System"],CompsiteSystem=_ref["CompsiteSystem"];util=require("./util.coffee");Renderer=function(){function Renderer(canvas){var animatedRenderingSystem,staticRenderingSystem,_this=this;this.canvas=canvas;this.ctx=canvas.getContext("2d");staticRenderingSystem=new BasicSystem(["positioned","staticsprite"],function(components,dt){var positioned,staticSprite;positioned=components.positioned;staticSprite=components.staticsprite;return _this.ctx.drawImage(Resources.get(staticSprite.url),staticSprite.pos[0],staticSprite.pos[1],staticSprite.size[0],staticSprite.size[1],positioned.pos[0],positioned.pos[1],staticSprite.size[0],staticSprite.size[1])});animatedRenderingSystem=new BasicSystem(["positioned","animatedsprite"],function(components,dt){var animatedSprite,frameIndex,idx,max,positioned,spritePosition,xySwitch;positioned=components.positioned;animatedSprite=components.animatedsprite;if(animatedSprite.speed>0){idx=Math.floor(animatedSprite.index+=animatedSprite.speed*dt);max=animatedSprite.frameIndices.length;frameIndex=animatedSprite.frameIndices[idx%max];if(animatedSprite.once&&idx>max){animatedSprite.done=true;return}}else{frameIndex=0}spritePosition=animatedSprite.pos.slice();xySwitch=animatedSprite.dir==="vertical"?1:0;spritePosition[xySwitch]+=frameIndex*animatedSprite.size[xySwitch];return _this.ctx.drawImage(Resources.get(animatedSprite.url),spritePosition[0],spritePosition[1],animatedSprite.size[0],animatedSprite.size[1],positioned.pos[0],positioned.pos[1],animatedSprite.size[0],animatedSprite.size[1])});this.system=new CompsiteSystem(staticRenderingSystem,animatedRenderingSystem);this.clearCanvas=function(dt){_this.ctx.fillStyle="lightgrey";return _this.ctx.fillRect(0,0,_this.canvas.width,_this.canvas.height)};this.drawFramerate=function(dt){if(_this.showFramerate){return _this.updateAndDrawFramerate(dt)}};this.framerates=[];this.showFramerate=true}Renderer.prototype.toggleFramerate=function(){return this.showFramerate=!this.showFramerate};Renderer.prototype.updateAndDrawFramerate=function(dt){var drawFramerate,_this=this;drawFramerate=function(){_this.ctx.save();_this.ctx.fillStyle="black";_this.ctx.font="30px sans-serif";_this.ctx.fillText(util.average(_this.framerates).toFixed(1),50,50);return _this.ctx.restore()};this.framerates.push(1/dt);while(this.framerates.length>10){this.framerates.shift()}return drawFramerate()};return Renderer}();module.exports=Renderer},{"./resources.coffee":8,"./system.coffee":9,"./util.coffee":10,underscore:1}],8:[function(require,module,exports){var Resources,_;_=require("underscore");window.imgs=[];Resources=function(){var callbacks,get,load,onReady,ready,resources,_load;resources={};callbacks=[];ready=function(){return _.all(_.values(resources))};_load=function(url){var img;if(resources[url]){return resources[url]}else{img=new Image;window.imgs.push(img);img.onload=function(){var cb,_i,_len,_results;resources[url]=img;if(ready()){_results=[];for(_i=0,_len=callbacks.length;_i<_len;_i++){cb=callbacks[_i];_results.push(cb())}return _results}};resources[url]=false;return _.defer(function(){return img.src=url})}};load=function(urlOrArray){var url,_i,_len,_results;if(urlOrArray instanceof Array){_results=[];for(_i=0,_len=urlOrArray.length;_i<_len;_i++){url=urlOrArray[_i];_results.push(_load(url))}return _results}else{return _load(urlOrArray)}};get=function(url){return resources[url]};onReady=function(callback){callbacks.push(callback);if(ready()&&!_.isEmpty(resources)){return callback()}};return{load:load,get:get,onReady:onReady}}();module.exports=Resources},{underscore:1}],9:[function(require,module,exports){var BasicSystem,CompsiteSystem,System,_,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child},__slice=[].slice;_=require("underscore");BasicSystem=function(){function BasicSystem(requiredComponents,fn){this.requiredComponents=requiredComponents;this.fn=fn;this.cache={};this.satisfies=function(components){return _.every(this.requiredComponents,function(required){return _.has(components,required)})}}BasicSystem.prototype.buildCache=function(entities){var components,id,_results;_results=[];for(id in entities){components=entities[id];if(this.satisfies(components)){_results.push(this.cache[id]=true)}else{_results.push(void 0)}}return _results};BasicSystem.prototype.updateCache=function(id,components){if(components===null||!this.satisfies(components)){if(_.has(this.cache,id)){return delete this.cache[id]}}else{return this.cache[id]=true}};BasicSystem.prototype.run=function(entities,dt){var id,idsToUpdate,needsUpdate,_i,_len,_ref;idsToUpdate=[];_ref=_.keys(this.cache);for(_i=0,_len=_ref.length;_i<_len;_i++){id=_ref[_i];if(_.has(entities,id)){needsUpdate=this.fn(entities[id],dt);if(needsUpdate){idsToUpdate.push(id)}}}return idsToUpdate};return BasicSystem}();System=function(_super){__extends(System,_super);function System(satisfies,fn){this.satisfies=satisfies;this.fn=fn;this.cache={}}return System}(BasicSystem);CompsiteSystem=function(_super){__extends(CompsiteSystem,_super);function CompsiteSystem(){var systems;systems=1<=arguments.length?__slice.call(arguments,0):[];this.systems=systems;this.fn=function(components,dt){var system,_i,_len,_ref,_results;_ref=this.systems;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){system=_ref[_i];_results.push(system.fn(components,dt))}return _results}}CompsiteSystem.prototype.buildCache=function(entities){var system,_i,_len,_ref,_results;_ref=this.systems;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){system=_ref[_i];_results.push(system.buildCache(entities))}return _results};CompsiteSystem.prototype.updateCache=function(id,components){var system,_i,_len,_ref,_results;_ref=this.systems;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){system=_ref[_i];_results.push(system.updateCache(id,components))}return _results};CompsiteSystem.prototype.run=function(entities,dt){var id,idsToUpdate,newIdsToUpdate,system,_i,_j,_len,_len1,_ref;idsToUpdate=[];_ref=this.systems;for(_i=0,_len=_ref.length;_i<_len;_i++){system=_ref[_i];for(_j=0,_len1=idsToUpdate.length;_j<_len1;_j++){id=idsToUpdate[_j];system.updateCache(id,entities[id])}newIdsToUpdate=system.run(entities,dt);idsToUpdate=idsToUpdate.concat(newIdsToUpdate)}return idsToUpdate};return CompsiteSystem}(BasicSystem);exports.BasicSystem=BasicSystem;exports.System=System;exports.CompsiteSystem=CompsiteSystem},{underscore:1}],10:[function(require,module,exports){var average,keyForComponent,sum,_;_=require("underscore");sum=function(list){return _.foldl(list,function(s,x){return s+x},0)};average=function(list){return sum(list)/list.length};keyForComponent=function(component){return component.constructor.name.toLowerCase()};exports.sum=sum;exports.average=average;exports.keyForComponent=keyForComponent},{underscore:1}]},{},[6]);
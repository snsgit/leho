pmc_in_script_time_2678=new Date()*1;var PreferInfo=function(){var M={},B=null,P=null,K=true;var R={LIMIT:'<div class="count-txt">还可以输入<span class="txt">{0}</span>字</div>',OVER:'<div class="count-txt error">超出<span class="txt">{0}</span>字</div>',TOPIC:'<a data-type="insert" class="consume-hot-topic hot" data-text="#{0}#" href="javascript:;">{0}</a>'};var J={count:50,tag:"@"};var S=false;var C=W("#favor_txt_con");var E=W("#favor_btn");var A=W("#fav_loadding");var U=function(V){C.html(R.LIMIT.format(V));if(V<=J.count){C.show("block");}else{C.hide();}};var L=function(V){C.show("block").html(R.OVER.format(V));};var G=function(Y){var V=Y.date,X=Y.type;G_dialog.hide();Timeline.publishFeedToTimeline(V.split("-")[0]+"-"+parseInt(V.split("-")[1],10),function(){MessageBox.tips({caption:X=="edit"?"编辑成功":"发布成功"});});};var H=function(Y){var V=Y.post_id;var X=Y.feed||"";HomePublish.postSuccess(V,X);PublishIndex.miniArea.parentNode(".container").show("block");PublishIndex.switchContent.hide();};var T=function(){E.replaceClass("btn-t1","btn-default-32");E.query("span").html("发布中...");};var O=function(){if(S){return false;}var X=W("#fav_url_txt").first().val().trim();var V="";if(B.getGuard()){if(Valid.checkAll($("favorite_form"))){if(X!=""){V=N(W("#fav_url_txt"));if(V==null){return false;}}S=true;T();$("send_url").value=V;Ajax.post($("favorite_form"),function(b){S=false;var Z=Ajax.opResults(b,false);if(Z.err=="mcphp.ok"){var a=Z.data;var Y=a.type&&a.type=="edit";M.reset();switch(PREFIX){case"profile":G(a);break;case"home":H(a);break;default:G_dialog.hide();MessageBox.tips({caption:"发布成功"});Y&&PostDetail.editSuccess();break;}}else{if(Z.err=="jt.u_arg.url_not_exist"){W("#fav_url_txt").shine4Error();}else{if(Z.err=="mcphp.u_antispam"){W("#favor_textarea").shine4Error();E.replaceClass("btn-default-32","btn-t1");E.query("span").html("发布");}}}});}}else{W("#favor_textarea").shine4Error();}};var N=function(X){var Y=/((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;var V=X.first().val().trim();if(V==""){return null;}if(V.match(/^(http|https):/)==null){V="http://"+V;}if(V.match(Y)==null){X.shine4Error();return null;}return V;};var D=function(){var X=W("#fav_url_txt");var V=N(X);if(V==null){return false;}A.show("block");Ajax.get("/sns/publish/fetchUrlInfo",{_of:"json",url:V,t:new Date().getTime()},function(b){var Y=Ajax.opResults(b,false);var Z="";if(Y.err=="mcphp.ok"){var a=Y.data.tuanInfo;if(a.image){Z='<img src="'+a.image+'" alt=""/>';}Z+="<h2>{0}</h2><p>{1}</p>".format(a.title,a.loc);$("fav_info_con").innerHTML=Z;W("#fav_con_box").show("block");}A.hide();});};var F=function(){var X=$("favor_textarea");var V=J.tag.length;textAreaUtilsFacade.insertText(X,J.tag);};var I=function(){B=new PublishEditor("favor_textarea",{limitCount:2000});P=new PublishTopic();P.blankTopic=DomU.query(".favor-blank-topic");var V=new AtFriends();B.addWidgets(P);B.addWidgets(V);B.on("unovercount",function(X){U(X.count);});B.on("overcount",function(X){L(X.count);});B.on("cancelpublish",function(){E.replaceClass("btn-t1","btn-default-32");});B.on("canpublish",function(){E.replaceClass("btn-default-32","btn-t1");});B.render();E.click(function(){O();});W("#fav_url_txt").on("keyup",function(X){if(X.keyCode==13){D();$("favor_textarea").focus();}}).on("blur",function(){D();});$("favor_at_btn").onclick=function(){F();};W("i.favor_showin_timeline").click(function(){Q(W(this));});W("span.favor_showin_timeline").click(function(){Q(W("i.favor_showin_timeline"));});};var Q=function(V){K=!K;V.toggleClass("checked","checkbox");if(K){W("#favor_showTimeline").val("1");}else{W("#favor_showTimeline").val("0");}};M.reset=function(){$("favor_textarea").value="";$("fav_url_txt").value="";$("fav_info_con").innerHTML="";$("fav_con_box").style.display="none";E.query("span").html("发布");B.setGuard(false);E.replaceClass("btn-t1","btn-default-32");};M.setSameShowInTimeline=function(){W("i.favor_showin_timeline").replaceClass("checkbox","checked");W("#favor_showTimeline").val("1");M.setSameShowInTimelineSate(true);};M.hasContent=function(){var X=$("fav_url_txt").value!="";var V=$("favor_textarea").value!="";return(X||V);};M.setSameShowInTimelineSate=function(V){K=V;};M.init=function(){I();};return M;}();PreferInfo.init();pmc_exec_time_2678=new Date()*1-pmc_in_script_time_2678;
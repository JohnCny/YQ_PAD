/* ********************* maoya 开始  ********************* */
function HistoryIma(id,type){
	var url="/ipad/Customer/selectSqCustomerImage.json";
	var td="";
	var td1="";
	var td2="";
	var td3="";
	$.ajax({
		url:wsHost+url,
		type: "GET",
		dataType:'json',
		data:{
			id:id,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			if(obj.Image1size==0){
				td=  "<span class='more' id='sfz'><p class='imgTitle'>身份证("+obj.Image1size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}else{
				td=  "<span class='more' id='sfz'><p class='imgTitle'>身份证("+obj.Image1size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>";
			}
			if(obj.Image2size==0){
				td1=  "<span class='more' id='yhls'><p class='imgTitle'>银行流水("+obj.Image2size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}else{
				td1=   "<span class='more' id='yhls'><p class='imgTitle'>银行流水("+obj.Image2size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image2[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>";
			}
			if(obj.Image3size==0){
				td2=   "<span class='more'  id='sbjn'><p class='imgTitle'>社保缴纳证明("+obj.Image3size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}else{
				td2=   "<span class='more'  id='sbjn'><p class='imgTitle'>社保缴纳证明("+obj.Image3size+")<p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image3[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>";
			}
			if(obj.Image4size==0){
				td3=  "<span class='more' id='jszm'><p class='imgTitle'>纳税证明("+obj.Image4size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}else{
				td3= "<span class='more' id='jszm'><p class='imgTitle'>纳税证明("+obj.Image4size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image4[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>";
				
			}
		/*	if(obj.Image1size==0 && obj.Image2size==0 && obj.Image3size==0 && obj.Image4size==0){
				td=  "<span class='more' id='sfz'><p class='imgTitle'>身份证("+obj.Image1size+")</p><p><img src='images/addImg.png' style=''/></p></span>"+
                "<span class='more' id='yhls'><p class='imgTitle'>银行流水("+obj.Image2size+")</p><p><img src='images/addImg.png' style=''/></p></span>"+
                "<span class='more' id='sbjn'><p class='imgTitle'>社保缴纳证明("+obj.Image3size+")</p><p><img src='images/addImg.png' style=''/></p></span>"+
                "<span class='more' id='jszm'><p class='imgTitle'>纳税证明("+obj.Image4size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}
			else if(obj.Image1size>0 && obj.Image2size==0 && obj.Image3size==0 && obj.Image4size==0){
				td=  "<span class='more' id='sfz'><p class='imgTitle'>身份证("+obj.Image1size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more' id='yhls'><p class='imgTitle'>银行流水("+obj.Image2size+")</p><p><img src='images/addImg.png' style=''/></p></span>"+
                "<span class='more'  id='sbjn'><p class='imgTitle'>社保缴纳证明("+obj.Image3size+")</p><p><img src='images/addImg.png' style=''/></p></span>"+
                "<span class='more' id='jszm'><p class='imgTitle'>纳税证明("+obj.Image4size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}else if(obj.Image1size>0 && obj.Image2size>0 && obj.Image3size==0 && obj.Image4size==0){
				td=  "<span class='more' id='sfz'><p class='imgTitle'>身份证("+obj.Image1size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more' id='yhls'><p class='imgTitle'>银行流水("+obj.Image2size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image2[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more'  id='sbjn'><p class='imgTitle'>社保缴纳证明("+obj.Image3size+")</p><p><img src='images/addImg.png' style=''/></p></span>"+
                "<span class='more' id='jszm'><p class='imgTitle'>纳税证明("+obj.Image4size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}else if(obj.Image1size>0 && obj.Image2size>0 && obj.Image3size>0 && obj.Image4size==0){
				td=  "<span class='more' id='sfz'><p class='imgTitle'>身份证("+obj.Image1size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more' id='yhls'><p class='imgTitle'>银行流水("+obj.Image2size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image2[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more'  id='sbjn'><p class='imgTitle'>社保缴纳证明("+obj.Image3size+")<p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image3[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more' id='jszm'><p class='imgTitle'>纳税证明("+obj.Image4size+")</p><p><img src='images/addImg.png' style=''/></p></span>";
			}else if(obj.Image1size>0 && obj.Image2size>0 && obj.Image3size>0 && obj.Image4size>0){
				td=  "<span class='more' id='sfz'><p class='imgTitle'>身份证("+obj.Image1size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more' id='yhls'><p class='imgTitle'>银行流水("+obj.Image2size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image2[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more'  id='sbjn'><p class='imgTitle'>社保缴纳证明("+obj.Image3size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image3[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>"+
                "<span class='more' id='jszm'><p class='imgTitle'>纳税证明("+obj.Image4size+")</p><p><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image4[0].ID+"' style='width:160px;height:115px;margin:0;'/></p></span>";
				
			}*/
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>快审通-查看上传文件</div>"+  
	                    "<div class='content'>" +
	                        "<div class='imgBox' style='margin-left:250px;width:auto;margin-top:20px;'>"+    
	                        td+
	                        td1+
	                        td2+
	                        td3+
	                        "</div>"+
	                    "</div>");
	    $(".right").hide();
	    $("#mainPage").show();  
		$("#jszm").click(function(){
			if(obj.Image4size>0){
				sczl3(id,obj,"纳税证明",type);
			}else{
				window.wxc.xcConfirm("此类无照片!!", "error");
			}
		});
	$("#sfz").click(function(){
		if(obj.Image1size>0){
			sczl3(id,obj,"身份证",type);
		}else{
			window.wxc.xcConfirm("此类无照片!!", "error");
		}
		});
	$("#yhls").click(function(){
		if(obj.Image2size>0){
			sczl3(id,obj,"银行流水",type);
		}else{
			window.wxc.xcConfirm("此类无照片!!", "error");
		}
	});
	$("#sbjn").click(function(){
		if(obj.Image3size>0){
			sczl3(id,obj,"社保缴纳证明",type);
		}else{
			window.wxc.xcConfirm("此类无照片!!", "error");
		}
	});
	$("#back").click(function(){
	  if(type == "1"){
		sHistory(id);
	  }else{
		kssp();
	  }
	});
		}
	});

}



function sczl3(id,obj,name,type){
	var td="";
	if(name=="身份证"){
		if(obj.Image1size>0){
			Ima=obj.Image1;
			for(var i=0;i<obj.Image1size;i++){
				td=td+"<div class='images' id='Ima"+i+"'  style='margin:0;'><div class='Bigzz zz'><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[i].ID+"'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[i].ID+"'/></div>";
			}
			}
	}else if(name=="银行流水"){
		Ima=obj.Image2;
		if(obj.Image2size>0){
			for(var i=0;i<obj.Image2size;i++){
				td=td+"<div class='images' id='Ima"+i+"'' style='margin:0;'><div class='Bigzz zz'><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image2[i].ID+"'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image2[i].ID+"'/></div>";
			}
			}
	}else if(name=="社保缴纳证明"){
		Ima=obj.Image3;
		if(obj.Image3size>0){
			for(var i=0;i<obj.Image3size;i++){
				td=td+"<div class='images' id='Ima"+i+"' style='margin:0;'><div class='Bigzz zz'><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image3[i].ID+"'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image3[i].ID+"'/></div>";
			}
			}
	}else if(name=="纳税证明"){
		Ima=obj.Image4;
		if(obj.Image4size>0){
			for(var i=0;i<obj.Image4size;i++){
				td=td+"<div class='images'  id='Ima"+i+"' style='margin:0;'><div class='Bigzz zz'><img src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image4[i].ID+"'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image4[i].ID+"'/></div>";
			}
			}
	}
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>快审通-资料查阅-"+name+"</div>"+  
	                    "<div class='content'>" +
	                        "<div class='imgBox'>"+    
	                            td+
	                        "</div>"+
	                    "</div>");
	    $(".right").hide();
	    $("#mainPage").show();  
		$("#back").click(function(){
			HistoryIma(id,type);
		});
	    $(".images").on({        
	        touchstart: function(e){
	            timeOutEvent = setTimeout("longPress('"+$(this).attr("id")+"')",500);
	            e.preventDefault();
	        },
	        touchmove: function(){
	                    clearTimeout(timeOutEvent); 
	                timeOutEvent = 0; 
	        },
	        touchend: function(){
	        	var imageurl;
	            clearTimeout(timeOutEvent);
	            if(timeOutEvent!=0){ 
	            var chart=$(this).attr("id");
	            imageurl=Ima[chart[3]].ID;
	            	var lltpurl=wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+imageurl;
	           	 $("#text").html("<div class='display-div sdhtz' style='width:80%;height:100%;margin-top:0px;left:10%;'>"+
	                        "<div class='dialog-head'>"+
	                           "<h4>查看大图</h4>"+
	                        "</div>"+
	                        "<img src='"+lltpurl+"' style='width:80%;height:80%; margin-left:10%'/>"+
	                        "<div class='dialog-bottom'>"+
	                           "<button type='button' class='btn btn-default' onclick='hide_dcts()'>确定</button>"+
	                        "</div>"+
	                    "</div>");
	           $("#text").animate({top:"0px"},"500");
	            } 
	            return false; 
	        }
	    }) 
}


/* ********************* maoya 结束********************* */
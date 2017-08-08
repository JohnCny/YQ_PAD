/* ********************* maoya 开始  ********************* */
var cid="";
function ksczp(res){
	cid=res.id;
	var url="/ipad/Customer/selectSqCustomerImage.json";
	var td="";
	$.ajax({
		url:wsHost+url,
		type: "GET",
		dataType:'json',
		data:{
			id:res.id,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			if(obj.Image1size==0 && obj.Image2size==0 && obj.Image3size==0 && obj.Image4size==0){
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
				
			}
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='cusbc()'/>快审通-补充调查-资料上传</div>"+  
	                    "<div class='content'>" +
	                        "<div class='imgBox' style='margin-left:250px;width:auto;margin-top:20px;'>"+    
	                        td+
	                        "</div>"+
	                    "</div>");
	    $(".right").hide();
	    $("#mainPage").show();  
		$("#jszm").click(function(){
			sczl2(res.name,obj,"纳税证明");
		});
	$("#sfz").click(function(){
		sczl2(res.name,obj,"身份证");
		});
	$("#yhls").click(function(){
		sczl2(res.name,obj,"银行流水");
	});
	$("#sbjn").click(function(){
		sczl2(res.name,obj,"社保缴纳证明");
	});
		}
	});
}










var ImaeList=[];
var bjms=0;
var Pname="";
var Cname="";
var Ima="";
//上传界面
function sczl2(cname,obj,name){
	Pname=name;
	Cname=cname;
	var th="";
	var td="";
	if(name=="身份证"){
		if(obj.Image1size>0){
			Ima=obj.Image1;
			for(var i=0;i<obj.Image1size;i++){
				td=td+"<div class='images' id='Ima"+i+"'  style='margin:0;'><div class='Bigzz zz'><img src='images/select.png'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image1[i].ID+"'/></div>";
			}
			}
	}else if(name=="银行流水"){
		Ima=obj.Image2;
		if(obj.Image2size>0){
			for(var i=0;i<obj.Image2size;i++){
				td=td+"<div class='images' id='Ima"+i+"'' style='margin:0;'><div class='Bigzz zz'><img src='images/select.png'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image2[i].ID+"'/></div>";
			}
			}
	}else if(name=="社保缴纳证明"){
		Ima=obj.Image3;
		if(obj.Image3size>0){
			for(var i=0;i<obj.Image3size;i++){
				td=td+"<div class='images' id='Ima"+i+"' style='margin:0;'><div class='Bigzz zz'><img src='images/select.png'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image3[i].ID+"'/></div>";
			}
			}
	}else if(name=="纳税证明"){
		Ima=obj.Image4;
		if(obj.Image4size>0){
			for(var i=0;i<obj.Image4size;i++){
				td=td+"<div class='images'  id='Ima"+i+"' style='margin:0;'><div class='Bigzz zz'><img src='images/select.png'/></div><img class='mainimg' src='"+wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+obj.Image4[i].ID+"'/></div>";
			}
			}
	}
	if(bjms=="1"){
		 th="<input type='button' id='deleteima' class='btn btn-large btn-success' value='删除'/>"+  
		 "<input type='button'  id='tcbjms' class=btn btn-large btn-primary' value='退出编辑模式' />" +
         "<input type='button' style='display:none' class='btn btn-large btn-success' value='确定' id='addImasre'/>" ;
	}else{
		 th=
			 "<input type='button'  class=btn btn-large btn-primary' value='编辑模式' id='bjms'/>" +
	         "<input type='button' style='display:none' class='btn btn-large btn-success' value='确定' id='addImasre'/>" ;
	}
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>快审通-上传资料-"+name+"</div>"+  
	                    "<div class='content'>" +
	                    "<input type='hidden' id='qtyxzl_sheet1' name='imageuri' uri='' class='readonly' readonly='readonly'/>"+
	                        "<div class='imgBox'>"+    
	                            "<span class='more' onclick='getMedia(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\");'><p class='imgTitle'>从图库添加</p><p><img src='images/addImg.png'/></p><input type='hidden' id='fcz_sheet1' /></span>"+
	                            "<span class='more' onclick='capture(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\",\""+cname+ "\");'><p class='imgTitle'>实地拍摄</p><p><img src='images/ugc_icon_type_photo.png'/></p><input type='hidden' id='fcz_sheet1' /></span>"+
	                            td+
	                        "</div>"+
	                       "<p>" +
	                           th+
	                        "</p>" + 
	                    "</div>");
	    $(".right").hide();
	    $("#mainPage").show();  
		$("#back").click(function(){
			var res={};
			res.id=cid;
			ksczp(res);
		});
		$("#bjms").click(function(){
			bjms=1;
			sczl2(cname,obj,name);
		});
		$("#tcbjms").click(function(){
			bjms=0;
			sczl2(cname,obj,name);
		});
		$("#deleteima").click(function(){
			var ID="";
			for(var i=0;i<ImaeList.length;i++){
				var chart=ImaeList[i];
				if(i<ImaeList.length-1){
					ID=ID+Ima[chart[3]].ID+",";
				}else{
					ID=ID+Ima[chart[3]].ID;
				}

			}
			for(var i=ImaeList.length;i>=0;i--){
				ImaeList.splice(i,1)
			}
			deleteIma(ID);
		});
		$("#addImasre").click(function(){
			window.wxc.xcConfirm("是否开始上传影像资料","confirm",{onOk:scks});
			function scks(){
				var applicationId = null;
				show_upload(0);
					var fileName = $("#qtyxzl_sheet1").val();
					var fileURI = document.getElementsByName("imageuri")[0].getAttribute("uri");
					if(fileName!=""&&fileURI!=""){
						var options = new FileUploadOptions();  
						options.fileKey = "file";  
						options.fileName = fileName; 
						options.mimeType = "multipart/form-data";  
						options.chunkedMode = false;  
						ft = new FileTransfer(); 
						var uploadUrl=encodeURI(wsHost+"/ipad/sqcustomer/imagesImport.json?id="+cid+"&name="+name+"&fileName="+options.fileName+"&applicationId="+applicationId);  
						$("#uploadInfo").html("正在上传，请稍后...");
						ft.upload(fileURI,uploadUrl,Imagesuccess, uploadFailed, options); 
						uploadlock=false;
						
						
						
						
					}
			}
		})
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
	            if(timeOutEvent>0 ){
	            	if(bjms==0){
	            		var chart=$(this).attr("id");
	    	            imageurl=Ima[chart[3]].ID;
	    	            	var lltpurl=wsHost+"/ipad/TypadImageBrowse/downLoadYxzlJn.json?id="+imageurl;
	    	           	 $("#text").html("<div class='display-div sdhtz' style='width:80%;margin-top:20px;left:10%;'>"+
	    	                        "<div class='dialog-head'>"+
	    	                           "<h4>查看大图</h4>"+
	    	                        "</div>"+
	    	                        "<img src='"+lltpurl+"' style='width:80% ;height:65%; margin-left:10%'/>"+
	    	                        "<div class='dialog-bottom'>"+
	    	                           "<button type='button' class='btn btn-default' onclick='hide_dcts()'>确定</button>"+
	    	                        "</div>"+
	    	                    "</div>");
	    	           $("#text").animate({top:"0px"},"500");
	            	}else{
	            		var id=$(this).attr("id");
		            	  if($("#"+id).find(".zz").css("display")=="none"){
		            		  ImaeList[ImaeList.length]=id;
		            	        $("#"+id).find(".zz").css("display","block");
		            	    }
		            	    else{     
		            	        $("#"+id).find(".zz").css("display","none");
		            	        for(var i=0;i<ImaeList.length;i++){
		            	        	if(ImaeList[i]==id){
		            	        		ImaeList.splice(i,1)
		            	        	}
		            	        }
		            	    }
		            	  
	            	}}
	            return false; 
	        }
	    }) 
	}


function Imagesuccess(r) {
	var obj = $.evalJSON(r.response);
	if(obj.success==false){
		if(obj.message=="001"){
			$("#uploadInfo").html("调查模板不一致！导入失败！");
			$("#diss").attr('disabled',false);
		}else{
			$("#uploadInfo").html("导入失败！");
			$("#diss").attr('disabled',false);
		}
	}else{
		$("#uploadInfo").html("导入成功！");
		$("#diss").attr('disabled',false);
		var url="/ipad/Customer/selectAllIma.json";
		$.ajax({
			url:wsHost+url,
			type: "GET",
			dataType:'json',
			data:{
				id:cid,
				name:Pname
			},
			success: function (json){
				var obj = $.evalJSON(json);
			if(Pname=="身份证"){
				obj.Image1size=obj.size;
				obj.Image1=obj.result;
				sczl2(Cname,obj,Pname);
			}else 	if(Pname=="银行流水"){
				obj.Image2size=obj.size;
				obj.Image2=obj.result;
				sczl2(Cname,obj,Pname);
			}else 	if(Pname=="社保缴纳证明"){
				obj.Image3size=obj.size;
				obj.Image3=obj.result;
				sczl2(Cname,obj,Pname);
			}
			else 	if(Pname=="纳税证明"){
				obj.Image4size=obj.size;
				obj.Image4=obj.result;
				sczl2(Cname,obj,Pname);
			}}});
	}
	clearProcess();
}


function deleteIma(ID){
	window.wxc.xcConfirm("确定删除选中照片？", "confirm",{onOk:function(){
		var url="/ipad/Customer/deleteIma.json";
		$.ajax({
			url:wsHost+url,
			type: "GET",
			dataType:'json',
			data:{
				id:ID,
			},
			success: function (json){
		var url="/ipad/Customer/selectAllIma.json";
		$.ajax({
			url:wsHost+url,
			type: "GET",
			dataType:'json',
			data:{
				id:cid,
				name:Pname
			},
			success: function (json){
				var obj = $.evalJSON(json);
			if(Pname=="身份证"){
				obj.Image1size=obj.size;
				obj.Image1=obj.result;
				sczl2(Cname,obj,Pname);
			}else 	if(Pname=="银行流水"){
				obj.Image2size=obj.size;
				obj.Image2=obj.result;
				sczl2(Cname,obj,Pname);
			}else 	if(Pname=="社保缴纳证明"){
				obj.Image3size=obj.size;
				obj.Image3=obj.result;
				sczl2(Cname,obj,Pname);
			}
			else 	if(Pname=="纳税证明"){
				obj.Image4size=obj.size;
				obj.Image4=obj.result;
				sczl2(Cname,obj,Pname);
			}}})}});	
	}});
}
/* ********************* maoya 结束********************* */
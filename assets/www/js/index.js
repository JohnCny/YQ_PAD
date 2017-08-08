function  checkRadio(obj){   //单选样式 
    $(obj).parent().find('.radio').attr("class","radio");
    $(obj).parent().find('input[type=radio]').removeAttr('checked');
    $(obj).attr("class","radio radio_checked");
    $(obj).find('input[type=radio]').attr('checked',"checked");
}
function  checkBox(obj,id){   //单选样式 
    $(obj).parent().find('.checkbox').attr("class","checkbox");
    $(obj).parent().find('input[type=radio]').removeAttr('checked');
    $(obj).attr("class","checkbox checkbox_checked");
    $(obj).find('input[type=radio]').attr('checked',"checked");//单选样式
    
    var str=$("input[name="+id+"]:checked").val();//获取radio的value
    $(obj).parent().parent().find('.dj').html(str.substr(0,1));//获取字符串第一个字符赋值
    $(obj).parent().parent().find('.score').html(parseInt(str.substr(1)));//获取数字
    
    var num=0;
    $(".score").each(function(){
        if($(this).html()=="")
            num=num;
        else
            num=num+parseInt($(this).html());//求和       
    });
    $("#zf").html(num);//总分
    
    if(num<60){//评分等级
        $("#pfdj").html("B"); 
        $("#ed1").html("20000"); 
    }
    if(num>60&&num<80||num==60){//评分等级
        $("#pfdj").html("BB"); 
        $("#ed1").html("20000"); 
    }
    if(num>80&&num<100||num==80){//评分等级
        $("#pfdj").html("BBB"); 
        $("#ed1").html("30000"); 
    }
    if(num>100&&num<120||num==100){//评分等级
        $("#pfdj").html("A"); 
        $("#ed1").html("100000"); 
    }
    if(num>120&&num<150||num==120){//评分等级
        $("#pfdj").html("AA"); 
        $("#ed1").html("500000"); 
    }
    if(num>150||num==150){//评分等级
        $("#pfdj").html("AAA");
        $("#ed1").html("1000000");  
    }
	
	jyed();
}

function  checkBox2(obj,id){   //多选样式 
    if($(obj).find('input[type=checkbox]').attr("checked")=="checked"){
        $(obj).find('input[type=checkbox]').removeAttr('checked');
        $(obj).attr("class","checkbox");
    }
    else{
        $(obj).find('input[type=checkbox]').attr('checked','checked');
        $(obj).attr("class","checkbox checkbox_checked");
    }    
}
function  checkBox3(obj,id){   //多选样式 
	if($(obj).find('input[type=checkbox]').attr("checked")=="checked"){
		$(obj).find('input[type=checkbox]').removeAttr('checked');
		$(obj).attr("class","checkbox");
		$("input.selectmanager").prop('checked',false);
		$(".checkbox&.checkbox_checked").removeClass("checkbox_checked");
	}else{
		$(obj).find('input[type=checkbox]').attr('checked','checked');
		$(obj).attr("class","checkbox checkbox_checked");
		$("input.selectmanager").prop('checked','checked');
		$(".checkbox").removeClass("checkbox").addClass("checkbox checkbox_checked");
	}    
}
function setSdhcy(){
    var chk_value =[]; 
    var select_id =[]; 
    $("#checkbox:checked").each(function(){
        chk_value.push($(this).parent().text());
        select_id.push($(this).val());
    });
    if(chk_value[0]=="全选"){
    	chk_value.splice(0,1);
    	select_id.splice(0,1);
    }
    $("#sdhcy").val(chk_value);
    $("#sdhcy").attr("select_id",select_id);
}
function qh(obj){//求和
    $(obj).parent().find(".score").html($(obj).val())
    var num=0;
    $(".score").each(function(){
        if($(this).html()=="")
            num=num;
        else
            num=num+parseInt($(this).html());//求和        
    });
    $("#zf").html(num);//总分
     if(num<60){//评分等级
        $("#pfdj").html("B"); 
        $("#ed1").html("20000"); 
    }
    if(num>60&&num<80||num==60){//评分等级
        $("#pfdj").html("BB"); 
        $("#ed1").html("20000"); 
    }
    if(num>80&&num<100||num==80){//评分等级
        $("#pfdj").html("BBB"); 
        $("#ed1").html("30000"); 
    }
    if(num>100&&num<120||num==100){//评分等级
        $("#pfdj").html("A"); 
        $("#ed1").html("100000"); 
    }
    if(num>120&&num<150||num==120){//评分等级
        $("#pfdj").html("AA"); 
        $("#ed1").html("500000"); 
    }
    if(num>150||num==150){//评分等级
        $("#pfdj").html("AAA");
        $("#ed1").html("1000000");  
    }
	
	jyed();
}
function jyed1(obj){//建议额度
    if($(obj).val()=="")
        $("#ed2").html("1000000");
    else
        $("#ed2").html(parseInt($(obj).val())*10);
	
	jyed();
}
function jyed2(obj){//建议额度	
    if($(obj).val()=="")
        $("#ed3").html("500000");
    if($(obj).val()=="1")
		$("#ed3").html("1000000");
	if($(obj).val()=="0")
		$("#ed3").html("500000");
	jyed();
}
function jyed(){	
	var ed="0"
	var a=parseInt($("#ed1").html())
	var b=parseInt($("#ed2").html())	
	var c=parseInt($("#ed3").html())
	if(a<b)
		if(a<c)
			ed=a;
		else
			ed=c;
	else
		if(b<c)
			ed=b;
		
		else
			ed=c;
	$("#jyed").html(ed)
}
function zs(obj){//只能输入整数
    $(obj).val( $(obj).val().replace(/[^\d]/g,''))
 }
function checkimg(obj){//选择图片
    if($(obj).find(".zz").css("display")=="none"){
        $(obj).find(".zz").css("display","block")
    }
    else{     
        $(obj).find(".zz").css("display","none")
    }
}
//左侧导航
function changeNav(obj,num){
    var images=$(".nav img");
    $(".left .nav .li").css("background","#e7e7eb");
    $(obj).css("background","#fff");//背景
    $(".left .nav .li span").css("color","#858fa6");
    $(obj).find("span").css("color","#298dd7");//文字
    for(i=1;i<3;i++){
        images[i].src="images/"+i+".png";
    }
    images[num].src="images/"+num+"_b.png";
    $(".left").animate({left:"-13.1em"},"500");
    $(".right").animate({left:"0"},"500");
    //setTimeout("$('.left').hide()",500);
}
function showNav(){
    if($(".left").css("left")!="0px"){
       // $(".left").show();
        $(".left").animate({left:"0"},"500");
        //$(".right").animate({left:"13.1em"},"500"); 
    }
    else{
        $(".left").animate({left:"-13.1em"},"500");
       // $(".right").animate({left:"0"},"500"); 
       // setTimeout("$('.left').hide()",500);
    }
        
}
function changeTab(obj,id){
    $('.tab li').attr('class','');
    $(obj).attr('class','active');
    $('.tabDIV').hide();
    $('#'+id).show();
}
//选择行
function check(obj){
    $("input[type=radio]").removeAttr("checked");
    $(".radio").attr("class","radio");
    $(obj).parent().find("tr").css("background","#fff");
    $(obj).find("input[type=radio]").attr('checked','checked');
    $(obj).find(".radio").attr("class","radio radio_checked");
    $(obj).css("background","#dceafc");
}

//搜索DIV
function search(obj){
    var value=$(obj).val();
    if(value==""){
        $(".khjl").show();
    }
    else{
        $(".khjl").each(function(){
            if(this.innerHTML.indexOf(value)>=0){
                $(this).show();
            }                       
            else{
                $(this).hide();
            }
                
        })
    }    
}
function searchTR(obj){
    var value=$(obj).val();
    if(value==""){
        $("tr.search").show();
    }
    else{
        $("tr.search").each(function(){
            if(this.innerHTML.indexOf(value)>=0){
                $(this).show();
            }                       
            else{
                $(this).hide();
            }
                
        })
    }    
}
//表格添加行
function addTd(table){ 
    if(table=="lxrxx"){//联系人信息
        var num= $('#lxrxx tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' value=''/></td>"+
                                "<td><input type='text' value=''/></td>"+
                                "<td><input type='text' value=''/></td>"+
                            "</tr>");      
    }
    if(table=="csqy"){//初始权益
        $("#"+table).append("<tr>"+    
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                            "</tr>");      
    }
    if(table=="dxzc"){//大项支出
        $("#"+table).append("<tr>"+    
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                            "</tr>");      
    }
    if(table=="szzj"){//升值/折旧
        $("#"+table).append("<tr>"+    
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                            "</tr>");      
    }
    if(table=="yyfy"){//营业费用
        var num= $('#yyfy tr').length-1;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' value=''/></td>" +
                                "<td><input type='text' value=''/></td>" +
                            "</tr>");      
    }
    if(table=="khxx"){//企业开户信息
        var num= $('#khxx tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text'/></td>"+  
                                "<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
    if(table=="dhd"){//点货单
        var num= $('#dhd tr').length;
        $("#"+table).append("<tr>"+    
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
    if(table=="gdzcqd"){//固定资产清单
        var num= $('#gdzcqd tr').length-1;
        $("#"+table).append("<tr>"+   
                                "<td>"+num+"</td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
    if(table=="ysyfqd"){//应收预付清单
        var num= $('#ysyfqd tr').length-1;
        $("#"+table).append("<tr>"+   
                                "<td>"+num+"</td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
    if(table=="yfysqd"){//应付预收清单
        var num= $('#yfysqd tr').length-1;
        $("#"+table).append("<tr>"+   
                                "<td>"+num+"</td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
    if(table=="fzxmmxqd"){//负债项目明细清单
        var num= $('#fzxmmxqd tr').length-1;
        $("#"+table).append("<tr>"+   
                                "<td>"+num+"</td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='date' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                                "<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
	if(table=="fcxx"){//房产信息
        var num= $('#fcxx tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' class='addinput'/></td>"+
								"<td><input type='text' class='addinput'/></td>"+
								"<td><input type='date' class='addinput'/></td>"+
								"<td><input type='text' class='addinput'/></td>"+
								"<td><input type='text' class='addinput'/></td>"+
								"<td>" +
                                    "<select>" +
                                        "<option>现金</option>" +
                                    "</select>" +
                                "</td>"+
								"<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
	if(table=="ccxx"){//车产信息
        var num= $('#ccxx tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' class='addinput'/></td>"+
								"<td><input type='text' class='addinput'/></td>"+
								"<td><input type='date' class='addinput'/></td>"+
								"<td><input type='text' class='addinput'/></td>"+
								"<td><input type='text' class='addinput'/></td>"+
								"<td>" +
                                    "<select>" +
                                        "<option>现金</option>" +
                                    "</select>" +
                                "</td>"+
								"<td><input type='text' class='addinput'/></td>"+
                            "</tr>");      
    }
    if(table=="fcz"){//房产证
        var num= $('#fcz tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' id='fcz_sheet"+num+"' class='readonly' readonly='readonly'/><input type='button' class='btn' value='选择文件' onclick='getMedia(\"fcz_sheet"+num+"\",\"img\");'/></td>"+
                                "<td><img src='images/ugc_icon_type_photo.png' onclick='capture(\"fcz_sheet"+num+"\",\"img\");'/></td>"+
                            "</tr>");      
    }
    if(table=="jhz"){//结婚证
        var num= $('#jhz tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' id='jhz_sheet"+num+"' class='readonly' readonly='readonly'/><input type='button' class='btn' value='选择文件' onclick='getMedia(\"jhz_sheet"+num+"\",\"img\");'/></td>"+
                                "<td><img src='images/ugc_icon_type_photo.png' onclick='capture(\"jhz_sheet"+num+"\",\"img\");'/></td>"+
                            "</tr>");      
    }
    if(table=="zxbg"){//征信报告
        var num= $('#zxbg tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' id='zxbg_sheet"+num+"' class='readonly' readonly='readonly'/><input type='button' class='btn' value='选择文件' onclick='getMedia(\"zxbg_sheet"+num+"\",\"img\");'/></td>"+
                                "<td><img src='images/ugc_icon_type_photo.png' onclick='capture(\"zxbg_sheet"+num+"\",\"img\");'/></td>"+
                            "</tr>");      
    }
    if(table=="yhls"){//银行流水
        var num= $('#yhls tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' id='yhls_sheet"+num+"' class='readonly' readonly='readonly'/><input type='button' class='btn' value='选择文件' onclick='getMedia(\"yhls_sheet"+num+"\",\"img\",\"imageuri\","+num-1+");'/></td>"+
                                "<td><img src='images/ugc_icon_type_photo.png' onclick='capture(\"yhls_sheet"+num+"\",\"img\");'/></td>"+
                            "</tr>");      
    }
    if(table=="qtyxzl"){//其他影像资料
        var num= $('#qtyxzl tr').length;
        $("#"+table).append("<tr>"+    
                                "<td>"+num+"</td>"+
                                "<td><input type='text' id='qtyxzl_sheet"+num+"' name='imageuri' uri='' class='readonly' readonly='readonly'/><input type='button' class='btn' value='选择文件' onclick='getMedia(\"qtyxzl_sheet"+num+"\",\"img\",\"imageuri\","+num+");'/></td>"+
                                "<td><img src='images/ugc_icon_type_photo.png' onclick='capture(\"qtyxzl_sheet"+num+"\",\"img\",\"imageuri\","+num+");'/></td>"+
                            "</tr>");      
    }
  if(table=="gzjh"){//工作计划
      var num= $('#gzjh tr').length;
      $("#"+table).append("<tr>"+    
                              "<td>"+num+"</td>"+
                              "<td><input type='text' class='addinput'/></td>"+
                              "<td><input type='text' class='addinput'/></td>"+
                              "<td><input type='date' class='addinput'/></td>"+
                              "<td><input type='text' class='addinput'/></td>"+
                              "<td><input type='text' class='addinput'/></td>"+
                          "</tr>");      
  }
}
//表格删除行
function removeTd(table){   
    var tr= document.getElementById(table).getElementsByTagName("tr");
    if(table=="yyfy"||table=="dxzc"||table=="szzj"){
        if(tr.length>1)//至少要保留一行
            document.getElementById(table).deleteRow(tr.length-1);//删除最后一行
    }
    else{
        if(tr.length>2)//至少要保留一行
            document.getElementById(table).deleteRow(tr.length-1);//删除最后一行
    }
        
       
}
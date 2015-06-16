//http://192.168.2.2:6969/sendmsj
 $(document).ready(function(){
		//var nickname=prompt("Ingrese nickname:");
		var socket='http://192.168.2.2:6969/sendmsj';//'http://10.144.84.45:6969/sendmsj';

		//función para actualizar chat
		var	update=function (msjs){
					var chat="";
					for(var i in msjs)						
						chat+=msjs[i].EMISOR+", dice:<br/>"+msjs[i].MSJ+"<br/>";

					$(".chat").html(chat);
					$(".chat").scrollTop();

				};		


		//enviar mensaje		
		$("#enviar").click( function(){	
							var data={"emisor":$.trim($("#emisor").val()),"msj":$("#msj").val(),"request":"emisor"};

							//si se ha ingresado el nickname
							if(data.emisor.length>0){		
								//---AJAX-----
								$.ajax({
									type: 'POST',
									data: JSON.stringify(data),
							        contentType: 'application/json',
			                        url: socket,
			                        success: function(data) {		                            	                           
			                            console.log(data);
			                        }
			                    });
								$("#msj").val("");


							}
							else{
								$("#emisor").val("");
							}


						}
					);
		//actualizar los mensaje
		
		setInterval(function(){
					$.ajax({type:'POST',
							data:JSON.stringify({"request":"receptor"}),
							contentType: 'application/json',
		                    url: socket,
		                    success: function(data) {		                    		
		                           //console.log(JSON.stringify(data));
		                           update(data);
		                        }
		                  });							
					},100);


	//Otros
		$("#frm").submit(function (e) {
      				e.preventDefault();
  		});

}); 


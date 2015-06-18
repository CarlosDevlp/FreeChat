//http://192.168.2.2:6969/sendmsj
 $(document).ready(function(){
		//var nickname=prompt("Ingrese nickname:");
		var socket=io();
		var socketUrl='http://10.144.84.10:8080/sendmsj';//'http://192.168.2.2:8080/sendmsj';//'http://10.144.84.45:6969/sendmsj';

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
					
								socket.emit('emision',data);
								$("#msj").val("");


							}
							else{
								$("#emisor").val("");
							}

						}
					);


	//actualizar los mensaje
	//socket cliente
		socket.on('recepcion',function(resp){ 				
				
				console.log(JSON.stringify(resp));
				update(resp);				
		 });


	//Otros
		$("#frm").submit(function (e) {
      				e.preventDefault();
  		});

}); 


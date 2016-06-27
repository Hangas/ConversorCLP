
	function validaChecks()
	{
		var sum = 0;
		if($('#check_euro').prop('checked'))
		{
			sum++;
		}
		if($('#check_libra').prop('checked'))
		{
			sum++;
		}
		if($('#check_dolar').prop('checked'))
		{
			sum++;
		}
		return sum;
	}

	function cargaValores()
	{
		$.ajax({
			url: 'https://www.google.com/finance/converter?a=1&from=EUR&to=CLP',
			success: function(data) 
			{
				var htmlCode = data;
				var valorEURCLP = $(htmlCode).find('.bld').html();
				var n = valorEURCLP.indexOf('.');
				var valorEUR = valorEURCLP.substring(0, n)
				$('#precio_euro').html(puntoMiles(valorEUR));
		 	}
		});
		$.ajax({
			url: 'https://www.google.com/finance/converter?a=1&from=GBP&to=CLP',
			success: function(data) 
			{
				var htmlCode = data;
				var valorGBPCLP = $(htmlCode).find('.bld').html();
				var n = valorGBPCLP.indexOf('.');
				var valorGBP = valorGBPCLP.substring(0, n)
				$('#precio_libra').html(puntoMiles(valorGBP));
		 	}
		});
		$.ajax({
			url: 'https://www.google.com/finance/converter?a=1&from=USD&to=CLP',
			success: function(data) 
			{
				var htmlCode = data;
				var valorUSDCLP = $(htmlCode).find('.bld').html();
				var n = valorUSDCLP.indexOf('.');
				var valorUSD = valorUSDCLP.substring(0, n)
				$('#precio_dolar').html(puntoMiles(valorUSD));
		 	}
		});
	}

	function puntoMiles(x) 
	{
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}
	
	var valoresAux = cargaValores();

	$(document).ready(function ()
	{
        $('#cantidad').keyup(function ()
        {
            this.value = (this.value + '').replace(/[^0-9]/g, '');
        });

        $('#calcular').click( function() 
        {
        	var cantidad = $("#cantidad").val();
        	var sum = validaChecks();

        	if(sum > 0)
        	{
        		if(cantidad > 0)
        		{
        			if($('#check_euro').prop('checked'))
					{
						var valor = $('#precio_euro').html();
					}
					if($('#check_libra').prop('checked'))
					{
						var valor = $('#precio_libra').html();
					}
					if($('#check_dolar').prop('checked'))
					{
						var valor = $('#precio_dolar').html();
					}
					var peso ='$';
    				var s = valor + '';
    				s =s.replace('.', '');
    				s = parseInt(s);

					$('#resultado').html(peso.concat(puntoMiles(s * cantidad)));
        		}
        		else
        		{
        			alert("Debe ingresar Cantidad!");
        		}
        	}
        	else
        	{
        		alert("Debe especificar Moneda!");
        	}
    	});

    	$('input.radio').on('change', function() 
    	{
            $('input.radio').not(this).prop('checked', false);
        });

        $('#actualizar').click( function() 
        {
        	cargaValores();
        	alert('Actualizado!');
        });

        $('#ModoCLP').click( function() 
        {
        	navigator.notification.alert('Modo CLP', alertCallback, 'Modo', 'Cerrar');
        });

        $('#ModoEXT').click( function() 
        {
        	alert('Modo € £ $!');
        });
    });
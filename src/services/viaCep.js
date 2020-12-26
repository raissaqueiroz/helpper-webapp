const viaCep = (valor, setField, field) =>{
	const {value} = valor.target

	const cep = value.replace(/[^0-9]/g, '')

	if(cep.length < 8){
		return
	}else{
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then(res => res.json())
			.then(data =>{
				//console.log(data)
				if (data.erro === true) {
					console.log("Erro");
				}else{
					setField({
						...field,
						address: {
							...field.address,
							neighborhood: data.bairro,
							street: data.logradouro,
							city: data.localidade,
							state: data.uf,
						}
					})
				}
			})
	}
}
export default viaCep

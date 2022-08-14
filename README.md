# Consulta CEP

## Descrição do problema
Precisamos criar um outro endPoint que receba um cep e que o mesmo faça uma consulta deste CEP na viaCEP (https://viacep.com.br/)

O Serviço que precisa ser chamado no ViaCEP é o seguinte: https://viacep.com.br/ws/XXXXXXXX/json

Onde o XXXXXXXX é um Cep válido.

Este endereço tem que ser retornado para o chamador, caso o Bairro não seja encontrado na ViaCEP, além do resto das informações, uma mensagem tem que ser retornada para o cliente informando que não foi possível encontrar o Bairro deste CEP. Exemplo de CEP sem Bairro :18150000

Comite seu código.

Divida em camadas de responsabilidade única, com classes e métodos coesos. Vá pela simplicidade do código.

Implemente testes automatizados.

## Instruções para execução

1. Clonar o repositório
2. Subir o container
```
docker-compose up -d
```
3. Acessar o endpoint, onde {cep} é um número com 8 dígitos (um CEP válido)
```
GET http://localhost:3000/cep/{cep}
```
Exemplo, CEPs (sem bairro e com bairro):
```
GET http://localhost:3000/cep/18150000
GET http://localhost:3000/cep/19802122
```

4. Verificar o resultado

CEP sem bairro (status 400)
```
{
	"error": "CEP without neighborhood",
	"address": {
		"cep": "18150-000",
		"logradouro": "",
		"complemento": "",
		"bairro": "",
		"localidade": "Ibiúna",
		"uf": "SP",
		"ibge": "3519709",
		"gia": "3451",
		"ddd": "15",
		"siafi": "6495"
	}
}
```

CEP com bairro (status 200)
```
{
	"address": {
		"cep": "19802-122",
		"logradouro": "Rua Vicente de Carvalho",
		"complemento": "de 778/779 ao fim",
		"bairro": "Vila Ribeiro",
		"localidade": "Assis",
		"uf": "SP",
		"ibge": "3504008",
		"gia": "1892",
		"ddd": "18",
		"siafi": "6179"
	}
}
```
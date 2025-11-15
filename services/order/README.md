# Serviço que processa um pedido

Este projeto corresponde a uma aplicaçao em node.js, que processa um pedido da loja de disco de vinil, as solicitações dos pedidos da loja tem este formato: 

```json
{
    "name": "Amanda Gusmão",
    "email": "amanda@gmail.com",
    "cpf": "000.000.000-00",
    "creditCard": {
        "number": "0000 0000 0000 0000",
        "securityNumber": "999"
    },
    "products": [
        {
            "name": "Notebook",
            "value": "10,00"
        }
    ],
    "address": {
        "zipCode": "00000-000",
        "street": "Sem Nome",
        "number": "13",
        "neighborhood": "Bairro Tal",
        "city": "Maceió",
        "state": "Alagoas"
    }
}
```

Antes de executar a aplicação é necessário atualizar as informações do arquivo de configuração `.env` com as seguintes variaveis:

````js
RABBITMQ_LOGIN          = guest 
RABBITMQ_PASSWORD       = guest
RABBITMQ_HOST           = localhost
RABBITMQ_PORT           = 5672
RABBITMQ_VHOST          = 
RABBITMQ_QUEUE_NAME     = orders //nome da fila de onde ira consumir a informaçào
````


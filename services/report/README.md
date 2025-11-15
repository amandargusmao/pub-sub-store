# Serviço de report

Este é um modelo para o nosso serviço de reportes das vendas que nossa loja ja fez até o momento. Nele temos uma estrutura de apoio com funçoes para atualizar nosso report e visualizar os resultados. 
Entretanto nosso modelo ainda não esta recebendo as mensagens da fila, está função cabe a você implementar. 

Obs: Este é um exemplo de como pode ser criado o serviço de report, sinta-se avontade para melhora-ló ou mudar de linguagm.  Fique atento apenas ao padrão da mensagem que esta sendo publicada na fila. O seu serviço ira receber um json conforme ilustrado abaixo:

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
        "state": "AL"
    }
}
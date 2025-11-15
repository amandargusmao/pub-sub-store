const RabbitMQService = require('./rabbitmq-service')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

function isValidOrder(orderData) {
    if(!orderData.products  || orderData.products.length <= 0) { //SEM PRODUTO
        return false
    }
    if(!orderData.cpf || !orderData.name) { //SEM DADOS PESSOAIS
        return false
    }
    return true
}

const RabbitMQService = require('./rabbitmq-service');

// Variável para armazenar a contagem de produtos
const salesReport = {}; 

async function processMessage(msg) {
    const orderData = JSON.parse(msg.content);

    // 1. Lógica do Relatório
    const productName = orderData.productName;
    salesReport[productName] = (salesReport[productName] || 0) + 1;

    // 2. Imprimir o Relatório
    console.log(`\n--- Venda Processada ---`);
    console.log(`Pedido de: ${orderData.name}`);
    console.log(`Produto: ${productName}`);
    console.log(`\n--- Relatório de Vendas (Acumulado) ---`);
    for (const product in salesReport) {
        console.log(`${product} = ${salesReport[product]} vendas`);
    }
    console.log(`--------------------------\n`);
}

async function consume() {
    console.log(`✔ [REPORT SERVICE] Aguardando mensagens na fila: report`);
    const rabbitMQService = await RabbitMQService.getInstance();
    
    // **A FILA CORRETA É 'report'**
    await rabbitMQService.consume('report', processMessage);
}

// Inicia o consumidor
consume();
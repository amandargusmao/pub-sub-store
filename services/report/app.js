const RabbitMQService = require('./rabbitmq-service')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

var report = {}
async function updateReport(products) {
    for(let product of products) {
        if(!product.name) {
            continue
        } else if(!report[product.name]) {
            report[product.name] = 1;
        } else {
            report[product.name]++;
        }
    }

}

async function printReport() {
    for (const [key, value] of Object.entries(report)) {
        console.log(`${key} = ${value} sales`);
      }
}

async function processMessage(msg) {
    const orderData = JSON.parse(msg.content)
    try {
        console.log(`\n--- New Order Received ---`)
        console.log(`Processing report for order from: ${orderData.name}`)
        
        // 1. Atualiza a contagem de produtos vendidos
        await updateReport(orderData.products) 

        // 2. Imprime o relatório atualizado
        await printReport()

        console.log(`--------------------------\n`)
        
    } catch (error) {
        console.log(`X ERROR TO PROCESS: ${error.message}`)
    }
}

async function consume() {
    // 1. Obtém a instância do serviço RabbitMQ
    const rabbitMQService = await RabbitMQService.getInstance(); 
    
    // 2. Assina a fila 'report' usando a função processMessage para callback
    await rabbitMQService.consume('report', processMessage); 
    
    console.log(`✔ [REPORT SERVICE] Successfully subscribed to queue: report`);
} 

consume()

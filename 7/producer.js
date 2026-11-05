const amqplib = require('amqplib')

const sendMessage = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        // delay Exchange
        await channel.assertExchange("delayExchange", "direct", {durable: true});
        
        // dead latter Exchange
        await channel.assertExchange("paymentExchange", "direct", {durable: true});

        channel.publish("delayExchange", "paymentDelay", Buffer.from("Payment Reminder Email"));

        setTimeout(() => {
            connection.close();
        }, 1000)
    }
    catch(err) {
        console.error(err);
        
    }
}

sendMessage()
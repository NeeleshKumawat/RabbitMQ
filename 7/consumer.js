const amqplib = require('amqplib')

const consumeMessage = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        // delay Exchange
        await channel.assertExchange("delayExchange", "direct", {durable: true});
        
        // dead latter Exchange
        await channel.assertExchange("paymentExchange", "direct", {durable: true});

        // delayed Queue
        await channel.assertQueue('paymentDelayQueue', {
            durable: true,
            arguments: {
                "x-message-ttl": 10000,
                "x-dead-letter-exchange": "paymentExchange",
                "x-dead-letter-routing-key": "paymentReminder"
            }
        })

        await channel.assertQueue("paymentQueue", {durable: true});

        await channel.bindQueue("paymentDelayQueue", "delayExchange", "paymentDelay")
        await channel.bindQueue("paymentQueue", "paymentExchange", "paymentReminder");

        await channel.consume("paymentQueue", (data) => {
            if(data) {
                console.log("New Message: ", data.content.toString());
                channel.ack(data);
            }
        })
    }
    catch(err) {
        console.error(err);
        
    }
}


consumeMessage()


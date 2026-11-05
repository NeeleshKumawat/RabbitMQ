const amqplib = require('amqplib')

const orderConsumer = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        
        const exchange = "notificationExchange"
        const queueName = "paymentQueue"

        await channel.assertExchange(exchange, "topic", {durable: true});
        await channel.assertQueue(queueName, {durable: true})

        await channel.bindQueue(queueName, exchange, "payment.#")

        channel.consume(queueName, (msg) => {
            if(msg !== null) {
                console.log("New Message: ", JSON.parse(msg.content.toString()));
            }
            channel.ack(msg);
        })


        // setTimeout(() => {
        //     connection.close();
        // }, 500)
    }
    catch(error) {
        console.log(error);

    }
}


orderConsumer();
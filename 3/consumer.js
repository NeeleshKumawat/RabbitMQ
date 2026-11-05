const amqplib = require('amqplib')

const receiveMessage = async() => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange_name = "email_exchange";
        const binding_key = "email";
        const queue_name = "email_queue";

        await channel.assertExchange(exchange_name, 'direct', { durable: true });

        await channel.assertQueue(queue_name, { durable: true });
        await channel.bindQueue(queue_name, exchange_name, binding_key);
        await channel.prefetch(1);
        await channel.consume(queue_name, (msg) => {
            if(msg !== null) {
                console.log("Received Message : ", JSON.parse(msg.content.toString()));
            }
            channel.ack(msg);
        });
    }
    catch(error) {
        console.error("Error sending message:", error);
    }

}


receiveMessage();
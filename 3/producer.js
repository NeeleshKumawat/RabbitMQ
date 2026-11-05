const amqplib = require('amqplib');

const sendMessage = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange_name = "email_exchange";
        const routing_key = "email";
        const queue_name = "email_queue";

        await channel.assertExchange(exchange_name, 'direct', { durable: true });

        // await channel.assertQueue(queue_name, { durable: true });
        // await channel.bindQueue(queue_name, exchange_name, routing_key);

        const message = {
            to: "abc@gmail.com",
            from: "def@gmail.com",
            subject: "Order Created Successfully"
        };

        channel.publish(
            exchange_name,
            routing_key,
            Buffer.from(JSON.stringify(message)),
            { persistent: true } // message survives broker restart
        );
        console.log("Message Sent Successfully", message);

        setTimeout(() => connection.close(), 1000);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

sendMessage();
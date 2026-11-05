const amqplib = require('amqplib')

const sendMessage = async (routingKey, message) => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        
        const exchange = "notificationExchange"

        await channel.assertExchange(exchange, "topic", {durable: true});

        channel.publish(exchange, routingKey, 
            Buffer.from(JSON.stringify(message)))

        console.log("Message Sent Successfully: ", message);

        setTimeout(() => {
            connection.close();
        }, 500)
    }
    catch(error) {
        console.log(error);

    }
}


// sendMessage("order.done", {data: "Order Created"});
sendMessage("payment.done", {data: "Payment Created"});
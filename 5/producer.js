const amqplib = require('amqplib')


const sendMessage = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = "user_events_exchange";

        await channel.assertExchange(exchange, "fanout", {durable: true});

        channel.publish(exchange, "", Buffer.from(JSON.stringify({
            data: "User Registered Successfully"
        })))
        
        setTimeout(() => {
            connection.close();
        }, 500)
    }
    catch(err) {
        console.log(err)
    }
}

sendMessage();
const amqplib = require('amqplib')

const queueName = 'analyticsQueue';

const analyticsConsumer = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = "user_events_exchange";

        await channel.assertExchange(exchange, "fanout", {durable: true});


        await channel.assertQueue(queueName, exchange, "");

        await channel.consume(queueName, (data) => {
            console.log("New Message: ", JSON.parse(data.content.toString()));
        })

        // channel.publish(exchange, "", Buffer.from(JSON.stringify({
        //     data: "User Registered Successfully"
        // })))
        
        // setTimeout(() => {
        //     connection.close();
        // }, 500)
    }
    catch(err) {
        console.log(err)
    }
}

analyticsConsumer();
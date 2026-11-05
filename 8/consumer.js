import amqplib from 'amqplib'

const consumeMessage = async() => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue('mailQueue', {durable: true})

        channel.consume('mailQueue', (msg) => {
            if(msg) {
                console.log("New Message: ", msg.content.toString());
                channel.ack(msg);
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

consumeMessage()
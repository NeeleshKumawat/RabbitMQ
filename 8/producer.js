import amqplib from 'amqplib'

const sendMessage = async() => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        channel.sendToQueue('mailQueue', Buffer.from("Hello World"));

        setTimeout(() => {
            connection.close(); 
        })

    }
    catch(err) {
        console.log(err)
    }
}

sendMessage()
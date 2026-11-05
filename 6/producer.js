import amqplib from 'amqplib'

const exchange = "mediaEventExchange"

const sendMessage = async () => {
    try {
        const connection = await amqplib.connect();
        const channel = await connection.createChannel();

        await channel.assertExchange(exchange, "headers", {durable: true});

        channel.publish(exchange, "", Buffer.from(JSON.stringify({
            msg: "Reel Uploaded"
        })),
        {
            headers: {
                accountType: 'cretor',
                visibility: 'public',
                contentType: 'reel'
            }
        }
    )

    setTimeout(() => {
        connection.close();
    }, 1000)
    }
    catch(err) {
        console.log(err);
    }
}
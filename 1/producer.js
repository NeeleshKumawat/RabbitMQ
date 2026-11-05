const amqplib = require("amqplib")

const connectionToRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost')
        const channel = await connection.createChannel();
        console.log("Connected to RabbitMQ successfully");
        return channel;
    }
    catch (error) {
        console.error("Error connecting to RabbitMQ:", error)
    }
}

connectionToRabbitMQ().then(channel => {
    const queue = 'my-queue';
    const message = 'Hello, RabbitMQ!'; 
})
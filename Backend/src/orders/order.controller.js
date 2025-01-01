const Order = require('./order.model'); // Import the Order model

const createAOrder = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request body
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).send(savedOrder);
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).send({ message: 'Failed to create order', error: error.message }); // Include error message in response
    }
}

const getOrderByEmail = async (req, res) => {
    try{
        const {email} = req.params;
        const order = await Order.find({email}).sort({createdAt: -1});
        if(!order){
            res.status(404).send({message: 'Order not found'});
        }
        res.status(200).send(order);
    }catch(error){
        console.error("Error getting order by email", error);
        res.status(500).send({ message: 'Failed to get order by email', error: error.message });
    }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

module.exports = {
    createAOrder,
    getOrderByEmail,
    getAllOrders,
    updateOrderStatus
};
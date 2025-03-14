





// async initiateTransaction(req, res) {
//     const { amount, paymentGateway } = req.body;
//     const userId = req.user.id;

//     const student = await Student.findOne({ userId });
//     studentId = student._id;
//     try {
//       if (!studentId || !amount) {
//         return res.status(400).json({
//           success: false,
//           message: "Student ID and amount are required.",
//         });
//       }
//       const purchase_order_id = `order_${Date.now()}`;
//       const purchase_order_name = "Wallet Load";
//       // Create a new transaction
//       const transaction = new Transaction({
//         studentId,
//         amount,
//         paymentGateway,
//         transactionId: purchase_order_id, // Generate a unique transaction ID
//         status: "pending",
//       });
//       console.log(transaction);
//       await transaction.save();
//       console.log(KHALTI_PUBLIC);
//       console.log(KHALTI_SECRET);
//       //   Request to Khalti
//       //   const khaltiResponse = await axios.post(
//       //     "https://dev.khalti.com/api/v2/epayment/initiate/",
//       //     {
//       //       return_url: "http://localhost:5173/account-center", // Replace with your return URL
//       //       website_url: "http://localhost:5173",
//       //       amount: amount * 100, // Convert amount to paisa
//       //       purchase_order_id,
//       //       purchase_order_name,
//       //     },
//       //     {
//       //       headers: {
//       //         Authorization: `key ${KHALTI_PUBLIC}`, // Replace with your PUBLIC KEY
//       //       },
//       //     }
//       //   );
//       console.log(typeof amount);
//       const khaltiResponse = await axios.post(
//         "https://dev.khalti.com/api/v2/epayment/initiate/",
//         {
//           return_url: "http://localhost:5173/payment-callback", 
//           website_url: "http://localhost:5173",
//           amount: amount * 100, 
//           purchase_order_id,
//           purchase_order_name,
//         },
//         {
//           headers: {
//             Authorization: `Key 59bc2858051d4983b53fd1b2033e9052`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("khalti says:(init)", khaltiResponse);
//       console.log("khalti says (init):", khaltiResponse.body);

//       const { pidx, payment_url } = khaltiResponse.data;
//       console.log("khalti says(init):", khaltiResponse.data);
//       res.status(201).json({
//         success: true,
//         pidx,
//         payment_url,
//         // message: "Transaction initiated successfully",
//         transactionId: purchase_order_id,
//       });
//     } catch (err) {
//       console.error("Error initiating transaction:", err.message);
//       res.status(500).json({
//         success: false,
//         message: "Failed to initiate transaction",
//         error: err.response?.data || err.message,
//       });
//     }
//   },

//   // Verify a transaction
//   async verifyTransaction(req, res) {
//     const { pidx, transaction_id } = req.body;

//     try {
//       console.log(
//         "Tyring to hit the khalti/lookup with token:",
//         pidx,
//         typeof pidx,
//         transaction_id
//       );
//       // Verify the transaction with Khalti
//       const khaltiResponse = await axios.post(
//         "https://dev.khalti.com/api/v2/epayment/lookup/",
//         {
//           pidx: pidx,
//         },
//         {
//           headers: {
//             Authorization: `Key 0b353ee393f14dd48743e73b7306ed14`, // Replace with your secret key
//           },
//         }
//       );
//       const { status, total_amount } = khaltiResponse.data;
//       console.log("khalti says (verify):", khaltiResponse.data);
//       if (status === "Completed" || status === "Pending") {
//         // Update the transaction status to success
//         const transaction = await Transaction.findOne({
//           transactionId: transaction_id,
//         });
//         if (!transaction || transaction.status !== "pending") {
//           return res.status(404).json({
//             success: false,
//             message: "Transaction not found or already processed",
//           });
//         }

//         transaction.status = "success";
//         await transaction.save();

//         // Increment the student's wallet balance
//         await Student.findByIdAndUpdate(transaction.studentId, {
//           $inc: { walletBalance: total_amount / 100 },
//         });

//         return res.status(200).json({
//           success: true,
//           message: "Transaction verified successfully, wallet updated",
//         });
//       } else {
//         await Transaction.findOneAndUpdate(
//           { transactionId: transaction_id },
//           { status: "failed" }
//         );

//         return res.status(400).json({
//           success: false,
//           message: `Transaction Verification failed, ${status}`,
//         });
//       }
//     } catch (err) {
//       console.error("Error verifying transaction:", err.message);

//       res.status(500).json({
//         success: false,
//         message: "Transaction verification failed",
//       });
//     }
//   },



const Payment = require("../model/payment");
const { param } = require("../route/paymentRoute");
const findAll = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const payments = new Payment(req.body);
        await payments.save();
        res.status(201).json(payments)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const payments = await Payment.findById(req.params.id);
        res.status(200).json(payments)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const payments = await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const payments = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(payments)
    } catch (e) {

        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findbyId,
    deletebyId,
    update
}


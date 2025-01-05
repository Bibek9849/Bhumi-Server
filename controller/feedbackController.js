const Feedback = require("../model/feedback");
const { param } = require("../route/feedbackRoute");
const findAll = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const feedbacks = new Feedback(req.body);
        await feedbacks.save();
        res.status(201).json(feedbacks)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const feedbacks = await Feedback.findById(req.params.id);
        res.status(200).json(feedbacks)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const feedbacks = await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const order = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(feedbacks)
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
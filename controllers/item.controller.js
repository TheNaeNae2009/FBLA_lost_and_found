import mongoose from "mongoose";

import Item from "../models/item.model.js";

export const uploadItem = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log(req.body);
    console.log(req.file);

    const { name, dateFound, location, description } = req.body;

    const imagePaths = req.files.map((file) => file.filename);

    const existingItem = await Item.findOne({ name });

    if (existingItem) {
      const error = new Error("Item already exists");
      error.statusCode = 409;
      throw error;
    }

    const newItems = await Item.create(
      [{ name, images: imagePaths, user: req.user.id, status: "pending", dateFound, location, description }],
      {
        session,
      },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: {
        item: newItems[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find().populate("user", "-password");

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getPendingItems = async (req, res, next) => {
  try {
    const items = await Item.find({ status:"pending" }).populate("user", "-password");

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};


export const getApprovedItems = async (req, res, next) => {
  try {
    const items = await Item.find({ status:"approved" }).populate("user", "-password");

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const approveItem = async (req, res, next) => {
  try{
    const item = await Item.findOneAndUpdate({ name: req.params.name }, { status: "approved" }, { new: true });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const rejectItem = async (req, res, next) => {
  try{
    const item = await Item.findOneAndUpdate({ name: req.params.name }, { status: "rejected" }, { new: true });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const claimItem = async (req, res, next) => {
  try {
    const item = await Item.findOneAndUpdate({ name: req.params.name }, { status: "claimed" }, { new: true });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({ title: req.params.title }).populate("user", "-password");

    if (!item) {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

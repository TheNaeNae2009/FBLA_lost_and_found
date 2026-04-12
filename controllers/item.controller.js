import Item from "../models/item.model.js";

export const uploadItem = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, images, dateFound, location, description } = req.body;

    // Check if a user already exists
    const existingItem = await Item.findOne({ name });

    if (existingItem) {
      const error = new Error("Item already exists");
      error.statusCode = 409;
      throw error;
    }

    const newItems = await Item.create([{ name, images, status: "pending", dateFound, location, description }], {
      session,
    });

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
    const items = await Item.find();

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({ name: req.params.name });

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

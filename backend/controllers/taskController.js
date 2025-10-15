import Task from "../models/Task.js";
import Notification from "../models/Notification.js";

export const createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  const task = new Task({ title, description, assignedTo, dueDate });
  const createdTask = await task.save();

  await Notification.create({
    user: assignedTo,
    message: `You have been assigned a new task: "${title}"`,
    link: `/tasks/${createdTask._id}`, 
  });

  res.status(201).json(createdTask);
};

export const getTasks = async (req, res) => {

  const query = req.user.role === "Admin" ? {} : { assignedTo: req.user._id };
  const tasks = await Task.find(query).populate("assignedTo", "name");
  res.json(tasks);
};

export const updateTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    task.status = req.body.status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

export const uploadMediaForTask = async (req, res) => {
  const { latitude, longitude } = req.body;
  const task = await Task.findById(req.params.id);

  if (task) {
    const newMedia = {
      url: req.file.path,
      mediaType: req.file.mimetype.startsWith("audio") ? "audio" : "image",
    };
    task.media.push(newMedia);

    if (latitude && longitude) {
      task.location = { latitude, longitude };
    }

    await task.save();
    res
      .status(201)
      .json({ message: "Media uploaded successfully", path: req.file.path });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

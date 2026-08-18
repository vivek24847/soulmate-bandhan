import Connection from "../models/connection.model.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";

const sendRequest = async (req, res) => {
  try {
    const user = req.user;
    const targetUser = req.params.userId;

    if (!user || !targetUser) {
      return handleError(res, "User is required", 400);
    }

    if (user._id.toString() === targetUser) {
      return handleError(
        res,
        "You cannot send a connection request to yourself",
        400,
      );
    }

    const existingConnection = await Connection.findOne({
      $or: [
        {
          sender: user._id,
          reciever: targetUser,
        },
        {
          sender: targetUser,
          reciever: user._id,
        },
      ],
    });

    if (existingConnection) {
      return handleError(res, "Connection request already exists", 400);
    }

    const connection = await Connection.create({
      sender: user._id,
      reciever: targetUser,
    });

    const connectionResponse = connection.toObject();

    return handleSuccess(
      res,
      "Connection request sent",
      connectionResponse,
      201,
    );
  } catch (error) {
    console.log("error", error);

    return handleError(res, error.message, 500);
  }
};

const pendingRequests = async (req, res) => {
  try {
    const user = req.user._id;

    const pendingRequests = await Connection.find({
      reciever: user,
      status: "pending",
    }).populate("sender", "-password");
    const response = pendingRequests.map((ele) => ele.toObject());
    handleSuccess(res, "Pending requests fetched successfully", response, 200);
  } catch (error) {
    handleError(res, error, 400);
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const user = req.user._id;
    const status = req.body.status;
    const connectionId = req.params.connectId;

    if (status !== "accepted" && status !== "rejected") {
      return handleError(res, "Invalid status", 400);
    }
    console.log("data ", { user, status, connectionId });
    const statusUpdate = await Connection.findOneAndUpdate(
      {
        _id: connectionId,
        reciever: user,
        status: "pending",
      },
      {
        status,
      },
      {
        new: true,
      },
    );

    if (!statusUpdate) {
      return handleError(res, "Connection request not found", 404);
    }

    handleSuccess(
      res,
      status === "accepted"
        ? "Request accepted successfully"
        : "Request declined successfully",
      {},
      200,
    );
  } catch (error) {
    console.log("whaterror", error);
    handleError(res, error, 500);
  }
};

const connecttionsListing = async (req, res) => {
  try {
    const user = req.user._id;

    const connections = await Connection.find({
      status: "accepted",
      $or: [{ sender: user }, { reciever: user }],
    })
      .populate("sender", "name email")
      .populate("reciever", "name email");


      const response = connections.map((ele) => {
        if(ele.sender._id === user){
            return ele.reciever
        }
        return ele.sender
      })

            console.log("myconnect" , response)


      handleSuccess(res, "All connections listing fetched successfully" , response , 200)
  } catch (error) {
    handleError(res, error, 500);
  }
};

export { sendRequest, updateRequestStatus, pendingRequests , connecttionsListing };

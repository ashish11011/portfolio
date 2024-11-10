import mongoose from "mongoose";

const emainSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.models.Email || mongoose.model("Email", emainSchema);

export default Email;

import mongoose from "mongoose";

const emainSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.models.Email || mongoose.model("Email", emainSchema);

export default Email;

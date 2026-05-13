import { launchLinkedIn }
from "../services/linkedinService.js";

export const searchStudents =
  async (req, res) => {

    try {

      const result =
        await launchLinkedIn();

      res.status(200).json(result);

    } catch (error) {

      console.log(
        "BACKEND ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import Api from "../base";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const options = {
        req,
        options: {
          url: `/orders/${id}`,
          method: "GET",
        },
      };
      const response = await Api(options);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const options = {
        req,
        options: {
          url: `/orders/close/${id}`,
          method: "PUT",
        },
      };
      const response = await Api(options);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import Api from "../base";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.query;
    const options = {
      req,
      options: {
        url: `/products/search/${encodeURIComponent(name as string)}`,
        method: "GET",
      },
    };
    const response = await Api(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
};

/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import Api from "../base";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const options = {
      req,
      options: {
        url: `/order-items`,
        method: "POST",
        data: req.body,
      },
    };
    const { data } = await Api(options);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

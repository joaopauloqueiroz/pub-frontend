/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Api from "../base";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body;
    const options = {
      req,
      options: {
        url: `/orders`,
        method: "POST",
        data: body,
      },
    };
    const { data } = await Api(options);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

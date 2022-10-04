/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";
import Api from "../base";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log("session");
  console.log(session);
  // const options = {
  //   req,
  //   options: {
  //     url: "/tables/all",
  //     method: "GET",
  //   },
  // };

  // const response = await Api(options);
  // res.status(200).json(response.data);
};

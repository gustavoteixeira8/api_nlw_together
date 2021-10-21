import { Request, Response } from 'express';

export class GithubCallbackController {
  public async execute(req: Request, res: Response): Promise<Response | never> {
    const { code } = req.query;

    return res.status(200).json({ code, status: 200 });
  }
}

import { userController } from "@/controllers/userController";

export async function POST(req: Request) {
    return userController.login(req);
}

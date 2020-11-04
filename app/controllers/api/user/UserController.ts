import Controller from "../../Controller";
import {Response, Request} from '../../../../node_modules/@types/express-serve-static-core/index'

export default class UserController extends Controller {

    public index(req: Request<any>, res: Response<any>) {
        res.send('userIndex');
    }
}

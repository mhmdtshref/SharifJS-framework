import { User } from '../models';
import { controllerClassGenerator } from '../classes';
export class UserController extends controllerClassGenerator(User) {}

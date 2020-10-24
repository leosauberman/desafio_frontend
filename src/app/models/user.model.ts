import * as moment from 'moment';

export class User {
  id: string;
  user: string;
  email: string;
  dtInclusion: string;
  dtModified: string;
  rules: string;
  status: string;

  static deserialize(obj: any): User{
    const model = new User();

    model.id = obj.id;
    model.user = obj.user;
    model.email = obj.email;
    model.dtInclusion = moment(obj.dtInclusion).format('DD/MM/YYYY');
    model.dtModified = moment(obj.dtModified).format('DD/MM/YYYY');
    model.rules = obj.rules.toString().padStart('0');
    model.status = obj.status;

    return model;
  }
}

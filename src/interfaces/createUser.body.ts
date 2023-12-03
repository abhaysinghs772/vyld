export interface createUserBody {
  name: string;
  userName: string;
  password: string;
  bio: string;
  age: number;
  signeUp_at?: Date;
  isDeleted?: Boolean;
}
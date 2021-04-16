import { prop, Ref } from "@typegoose/typegoose"
import { Patient } from "./patient";

class Email {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public schedule_date!: Date;

    @prop({ ref: () => Patient })
    public patient!: Ref<Patient>;
}

export {
    Email
}
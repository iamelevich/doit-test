import { prop, Ref } from "@typegoose/typegoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { Email } from "./email";

class Patient {
    @prop({ required: true })
    public program_identifier!: string;

    @prop()
    public data_source?: string;

    @prop({ required: true })
    public card_number!: string;

    @prop({ required: true })
    public member_id!: string;

    @prop()
    public first_name?: string;

    @prop()
    public last_name?: string;

    @prop()
    public date_of_birth?: string;

    @prop()
    public address_1?: string;

    @prop()
    public address_2?: string;

    @prop()
    public city?: string;

    @prop()
    public state?: string;

    @prop()
    public zip_code?: string;

    @prop()
    public telephone_number?: string;

    @prop()
    public email_address?: string;

    @prop({ required: true })
    public consent!: string;

    @prop()
    public mobile_phone?: string;

    @prop()
    public last_update!: Date;
}

export {
    Patient
};
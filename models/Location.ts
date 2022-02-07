import mongoose from "mongoose";

export default class Location extends mongoose.SchemaType {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
};
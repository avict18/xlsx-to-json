import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Person document
export interface IPerson extends Document {
  name: string;
  age: number;
}

// Create a Mongoose schema for the Person model
const PersonSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Person = mongoose.models.Person || mongoose.model<IPerson>('Person', PersonSchema);
export default Person;

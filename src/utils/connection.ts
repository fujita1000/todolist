import mongoose, { Model } from "mongoose"

const { DATABASE_URL } = process.env


export const connect = async () => {

  mongoose.set("debug", true);
  mongoose.set("strictQuery", false);
  const options = {
  strict: "throw",
  strictQuery: false
  };

  const conn = await mongoose
  .connect(DATABASE_URL as string )
  .catch(err=> console.log(err))
  console.log("Mongooseに接続完了しました")

  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  })

  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)

  return {conn, Todo ,options}
}
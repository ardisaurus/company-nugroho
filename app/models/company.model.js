module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: String,
    address: String,
    revenue: Number,
    phone_code: Number,
    phone_number: Number,
    offices: [
      {
        name: String,
        location_lat: Number,
        location_lng: Number,
        start_date: Date,
      },
    ],
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Company = mongoose.model("company", schema);
  return Company;
};

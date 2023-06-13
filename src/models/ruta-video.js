const { Schema, model } = require('mongoose')

const ruta_video_Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    episodio: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('url_anime', ruta_video_Schema)

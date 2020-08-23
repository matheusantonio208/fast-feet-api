import File from './file_repository';

class FileController {
  async store(req, res) {
    try {
      const file = await File.fileUpload(req.file);
      return res.json(file);
    } catch (error) {
      return res.status(400).json({ error_msg: "Can't upload file" });
    }
  }
}

export default new FileController();

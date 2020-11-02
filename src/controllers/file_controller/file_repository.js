import File from '../../models/File';

class FileRepository {
  async fileUpload(file) {
    const { originalname: name, filename: path } = file;

    const newFile = await File.create({
      name,
      path,
    });

    return newFile;
  }
}

export default new FileRepository();

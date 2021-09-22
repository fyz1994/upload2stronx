export default class Upload2Stronx {
  private stronxUrl: string;
  private filePath: string;
  private stronxJWT: string;

  constructor(stronxUrl: string, filePath: string, stronxJWT: string) {
    this.stronxUrl = stronxUrl;
    this.filePath = filePath;
    this.stronxJWT = stronxJWT;
  }

  setStronxUrl = (stronxUrl: string) => {
    this.stronxUrl = stronxUrl;
  };

  setFilePath = (filePath: string) => {
    this.filePath = filePath;
  };

  setStronxJWT = (stronxJWT: string) => {
    this.stronxJWT = stronxJWT;
  };

  /**
   * 将 File 转为 base64
   * @param {File} file File数据
   */
  private readAsBase64 = (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (e) => {
        const base64Url = (e.target as FileReader).result;
        const base64 = (base64Url as string).replace(
          /^data:\w+\/\w+;base64,/,
          ""
        );

        resolve(base64);
      };
      reader.readAsDataURL(file);
    });
  };

  /**
   * 向 stronx 发送上传文件请求
   * @param {string} base64
   * @param {File} file
   */
  private handleUploadRequest = (base64: string, file: File) => {
    const requestBody = {
      file: base64,
      file_privacy: true,
      file_path: `${this.filePath}${file.name}`,
      // file_type: "PDF",
    };
    return fetch(this.stronxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Mtrpc-Stronx-Token": this.stronxJWT,
      },
      body: JSON.stringify(requestBody),
    });
  };

  /**
   * 上传多个文件到 stronx
   * @param {File[]} fileList
   */
  public handleUploadFiles = (fileList: File[]) => {
    const promises: Promise<any>[] = [];
    fileList.forEach((file) => {
      promises.push(
        this.readAsBase64(file).then((base64: string) => {
          return this.handleUploadRequest(base64, file);
        })
      );
    });

    return Promise.all(promises);
  };

  /**
   * 上传单个文件到 stronx
   * @param {File} file
   */
  public handleUploadFile = (file: File) => {
    return this.readAsBase64(file).then((base64) => {
      return this.handleUploadRequest(base64, file);
    });
  };
}

const prefixes = ["B", "KB", "MB", "GB"]
const convertSize = (size: number) => {
  let i = 0
  let convertedSize = size
  while ( convertedSize / 1024 > 1 ) {
    convertedSize = convertedSize / 1024
    i += 1
  }

  const prefix : FilePrefix = prefixes[i] as FilePrefix
  return { prefix, convertedSize: Number(convertedSize.toFixed(2)) }
}

const useReadFile = (file: File | null, maxSize: number, prfx: FilePrefix) : ReadFileResponse => {
  let status: number = 404;
  let statusText: string = "File Not Found."
  let promise: Promise<string>;

  const prfxIndex = prefixes.findIndex(pr => pr === prfx)

  if ( file ) {
    const { prefix, convertedSize } = convertSize(file.size)
    const currentPrfxIndex = prefixes.findIndex(pr => pr === prefix)

    if ( currentPrfxIndex > prfxIndex || prefix === prfx && convertedSize > maxSize ) {
      status = 501;
      statusText = `Your file size is greather than our ${maxSize}${prfx} limit`
    } else {
      promise = new Promise(function (resolve, reject) {
        let fr : FileReader = new FileReader();
    
        fr.onload = function () {
          resolve(fr.result as string);
        };
    
        fr.onerror = function () {
          reject(fr);
        };
    
        fr.readAsDataURL(file);
      })

      status = 201
      statusText = "Success"
    }
  }

  return {
    status,
    statusText,
    promise
  };
};

export default useReadFile;

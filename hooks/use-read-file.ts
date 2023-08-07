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
  const response : ReadFileResponse = {
    status: 404,
    statusText: "File not found"
  }

  const prfxIndex = prefixes.findIndex(pr => pr === prfx)

  if ( file ) {
    const { prefix, convertedSize } = convertSize(file.size)
    const currentPrfxIndex = prefixes.findIndex(pr => pr === prefix)

    if ( currentPrfxIndex > prfxIndex || prefix === prfx && convertedSize > maxSize ) {
      response.status = 501;
      response.statusText = `Your file size is greather than our ${maxSize}${prfx} limit`
    } else {
      const promise : Promise<string> = new Promise(function (resolve, reject) {
        let fr : FileReader = new FileReader();
    
        fr.onload = function () {
          resolve(fr.result as string);
        };
    
        fr.onerror = function () {
          reject(fr);
        };
    
        fr.readAsDataURL(file);
      })

      response.status = 201
      response.statusText = "Success"
      response.promise = promise
    }
  }

  return response;
};

export default useReadFile;

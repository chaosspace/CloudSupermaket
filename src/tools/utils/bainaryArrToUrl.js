const Buffer = require('buffer').Buffer

const binaryArrToUrl = (file, picMimetype) => {
  //将二进制数据转成base64，然后拼成url
  if(file){
    if(typeof file === 'string'){
      return `data:${picMimetype};based64,${file}`
      
    }
    const binaryArr = file.data
    const buffer = Buffer.from(binaryArr)
    const base64 = buffer.toString('base64')
    const url = `data:${picMimetype};base64,${base64}`
    return url
  }
  return `暂无图片`
} 
export default binaryArrToUrl
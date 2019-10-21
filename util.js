function randomStr(n)
{
  let list = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let str = ''
  while(str.length < n)
  {
    str += list.charAt(Math.floor(Math.random() * list.length))
  }
  return str;
}



module.exports = { randomStr }
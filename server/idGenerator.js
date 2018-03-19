module.exports = function idGenerator(lastId){
  const type = lastId.slice(0,2).toUpperCase();
  const numb = parseInt(lastId.slice(2, lastId.length)) + 1;
  const id = type + numb;
  console.log('id ',id);
  return id;
}

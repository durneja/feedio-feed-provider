/**
 * Get average of values in a plain Array
 * @param Array
 * @returns Number
 */
 const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
  
  module.exports = {
      average,
  };
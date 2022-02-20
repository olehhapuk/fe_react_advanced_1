/**
 *
 * @param {Number} a First number
 * @param {Number} b Second number
 * @returns Sum of two values
 */
function add(a, b) {
  return Number(a) + Number(b);
}

// Unit test
test('should add two numbers', () => {
  const result = add(3, 5);
  expect(result).not.toBeNaN();
  expect(typeof result).toBe('number');
  expect(result).toBe(8);
});

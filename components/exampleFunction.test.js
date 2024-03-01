const exampleFunction = require('./exampleFunction');

test('adds 1 to 3 to equal 4', () => {
    expect(exampleFunction(3)).toBe(4);
});

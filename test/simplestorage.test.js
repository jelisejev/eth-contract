const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', () => {
  it('should be initially empty', async () => {
    const c = await SimpleStorage.deployed();
    const rs = await c.get.call();
    assert.equal(rs.toNumber(), 0);
  });

  it('should store the given value', async () => {
    const c = await SimpleStorage.deployed();
    await c.set(10);
    const rs = await c.get.call();
    assert.equal(rs.toNumber(), 10);
  });
});
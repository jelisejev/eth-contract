const Spread = artifacts.require('Spread');

contract('Spread', () => {
  it('should allow to add new addresses', async () => {
    const c = await Spread.deployed();
    await c.addRecepient('0x5c937978f2fabf0c08a1fd8bdd2155c938d78061');
    const rs = await c.getRecepients.call();
    assert.deepEqual(rs, ['0x5c937978f2fabf0c08a1fd8bdd2155c938d78061']);
  });
});
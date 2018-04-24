const Spread = artifacts.require('Spread');

contract('Spread', (accounts) => {
  let c;
  beforeEach(async () => {
    c = await Spread.new({from: accounts[0]});
  });

  it('should allow to add new addresses', async () => {
    await c.addRecepient('0x5c937978f2fabf0c08a1fd8bdd2155c938d78061');
    const rs = await c.getRecepients.call();
    assert.deepEqual(rs, ['0x5c937978f2fabf0c08a1fd8bdd2155c938d78061']);
  });

  it('should only allow the owner to add new addresses', async () => {
    let e;
    try {
      const rs = await c.addRecepient('0x5c937978f2fabf0c08a1fd8bdd2155c938d78061', {from: accounts[1]});
    } catch(error) {
      e = error;
    }
    expect(e).not.equal(undefined);
  });
});
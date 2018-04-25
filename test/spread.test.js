const Spread = artifacts.require('Spread');

contract('Spread', (accounts) => {
  let c;
  let feesAccount = accounts[9];
  beforeEach(async () => {
    c = await Spread.new(10, feesAccount, {from: accounts[0]});
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

  it('should transfer the fees to a different account', async () => {
    const initialBalance = web3.eth.getBalance(feesAccount);
    await c.sendTransaction({
      from: accounts[1],
      value: 60
    });
    const balance = web3.eth.getBalance(feesAccount);
    expect(balance.minus(initialBalance).toNumber()).to.equal(6);
  });

  it('should have a minimum amount of wei it accepts', async () => {
    let e;
    try {
      await c.sendTransaction({
        from: accounts[1],
        value: 6
      });
    } catch(error) {
      e = error;
    }
    expect(e).not.equal(undefined);
  })
});
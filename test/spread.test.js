const Spread = artifacts.require('Spread');

contract('Spread', (accounts) => {
  let c;
  const feesAccount = accounts[9];
  const recepient1 = accounts[2];
  const recepient2 = accounts[3];
  const recepient3 = accounts[4];
  const recepient4 = accounts[5];
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

  it('should spread the send ether between the recepient accounts', async () => {
    const balance1 = web3.eth.getBalance(recepient1);
    const balance2 = web3.eth.getBalance(recepient2);
    const balance3 = web3.eth.getBalance(recepient3);

    await c.addRecepient(recepient1);
    await c.addRecepient(recepient2);
    await c.addRecepient(recepient3);
    await c.sendTransaction({
      from: accounts[1],
      value: 100
    });

    expect(web3.eth.getBalance(recepient1).minus(balance1).toNumber()).to.equal(30);
    expect(web3.eth.getBalance(recepient2).minus(balance2).toNumber()).to.equal(30);
    expect(web3.eth.getBalance(recepient3).minus(balance3).toNumber()).to.equal(30);
  });

  it('should floor the spreaded values', async () => {
    const balance1 = web3.eth.getBalance(recepient1);
    const balance2 = web3.eth.getBalance(recepient2);
    const balance3 = web3.eth.getBalance(recepient3);
    const balance4 = web3.eth.getBalance(recepient4);

    await c.addRecepient(recepient1);
    await c.addRecepient(recepient2);
    await c.addRecepient(recepient3);
    await c.addRecepient(recepient4);
    await c.sendTransaction({
      from: accounts[1],
      value: 100
    });

    expect(web3.eth.getBalance(recepient1).minus(balance1).toNumber()).to.equal(22);
    expect(web3.eth.getBalance(recepient2).minus(balance2).toNumber()).to.equal(22);
    expect(web3.eth.getBalance(recepient3).minus(balance3).toNumber()).to.equal(22);
    expect(web3.eth.getBalance(recepient4).minus(balance4).toNumber()).to.equal(22);

    // remains due to rounding
    expect(web3.eth.getBalance(c.address).toNumber()).to.equal(2);
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
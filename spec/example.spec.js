describe('A suite', () => {
  it('contains spec with an expectation', () => {
    expect(true).toBe(true);
  });
});

describe('A spy', () => {
  let foo = null;
  let bar = null;

  beforeEach(() => {
    foo = {
      setBar: (value) => {
        bar = value;
      },
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });


  it('tracks that the spy was called', () => {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it('tracks that the spy was called x times', () => {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });


  it('tracks all the arguments of its calls', () => {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it('stops all execution on a function', () => {
    expect(bar).toBeNull();
  });

  it('tracks if it was called at all', () => {
    foo.setBar();

    expect(foo.setBar.calls.any()).toEqual(true);
  });
});

/// <reference types="cypress" />

it('Igualdade', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a, 'deveria ser 1').equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');
})

it('Verdadeiro', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(c).to.be.undefined;
})

it('Igualdade de objetos', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj);
    expect(obj).to.be.deep.equal({a:1, b:2})
    expect(obj).eql({a:1, b:2});
    expect(obj).include({a:1});
    expect(obj).to.have.property('b');
    expect(obj).to.have.property('b', 2);
    expect(obj).to.not.be.empty;
    expect({}).to.be.empty;
})


it('Arrays', () => {
    const array = [1, 2, 3]
    
    expect(array).to.have.members([1, 2, 3])
    expect(array).to.include.members([1, 3])

})

it('Types', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('String')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length(15)
    expect(str).to.have.contain('de')
    expect(str).to.match(/de/)
    expect(str).to.match(/^String/)
    expect(str).to.match(/teste$/)
    expect(str).to.match(/.{15}/)
    expect(str).to.match(/\w+/)
})

it('Numeros', () => {
    const number = 4
    const float = 5.123

    expect(number).to.be.equal(4) //igual 4=4
    expect(number).to.be.above(3) //maior 4>3
    expect(number).to.be.below(7) //menor 4<7
    expect(float).to.be.equal(5.123) //igual 5.123
    expect(float).to.be.closeTo(5.1, 0.1) //5.1 igual 5.123 com precisão de 0.1
    expect(float).to.be.above(5)
})
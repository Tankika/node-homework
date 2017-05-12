var expect = require('chai').expect,
    sinon = require('sinon'),
    rewire = require("rewire");

describe('createCard middleware ', () => {

    var createCardMw,
        req,
        res;

    beforeEach(() => {
        createCardMw = rewire("../../../middleware/card/createCard");

        req = {
            body : {}
        };
        res = {
            tpl: {
                error: []
            }
        };
    });

    it('model findOne should be called only once, with the correct params', (done) => {
        var mock = function() {
                        this.save = function(callback) {
                            callback()
                        };
                    };
        mock.findOne = function(param, callback) {
            callback(null, null);
        };
        var spy = sinon.spy(mock, 'findOne');

        req.body.name = "CARD";
        createCardMw.__set__('CardModel', mock);

        createCardMw()(req, res, () => {
            expect(spy).to.have.property('calledOnce', true);
            expect(spy.calledWith({name: "CARD"})).to.be.true;

            done();
        });
    });

    it('should return an error in the template, when card is found with the given name', (done) => {
        var mock = {
            findOne : function(param, callback) {
                callback(null, {name: "CARD"});
            }
        };

        createCardMw.__set__('CardModel', mock);

        createCardMw()(req, res, () => {
            expect(res.tpl.error.length).to.equal(1);
            expect(res.tpl.error[0]).to.equal('Ezzel a névvel már szerepel kártya a rendszerben!');

            done();
        });
    });

    it('should save cards, when a card is not found in the db', (done) => {
        var spy = sinon.spy(function(callback) {
                    callback()
                });

        var mock = function() {
            this.save = spy;
        };
        mock.findOne = function(param, callback) {
            callback(null, null);
        };
        
        req.body.name = "NAME";
        req.body.mana = 1;
        req.body.attack = 2;
        req.body.defense = 3;

        createCardMw.__set__('CardModel', mock);

        createCardMw()(req, res, () => {
            expect(spy).to.have.property('calledOnce', true);
            expect(spy.thisValues[0]).to.have.property('name', "NAME");
            expect(spy.thisValues[0]).to.have.property('mana', 1);
            expect(spy.thisValues[0]).to.have.property('attack', 2);
            expect(spy.thisValues[0]).to.have.property('defense', 3);

            done();
        });
    });

    it('should return validation messages from the model', (done) => {
        var mock = {
            findOne : function(param, callback) {
                callback({
                    errors: [
                        new Error('ERROR1'),
                        new Error('ERROR2'),
                        new Error('ERROR3')
                    ]
                });
            }
        };

        createCardMw.__set__('CardModel', mock);

        createCardMw()(req, res, () => {
            expect(res.tpl.error.length).to.equal(3);
            expect(res.tpl.error[0]).to.equal('ERROR1');
            expect(res.tpl.error[1]).to.equal('ERROR2');
            expect(res.tpl.error[2]).to.equal('ERROR3');

            done();
        });
    });

});
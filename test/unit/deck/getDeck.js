var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    rewire = require("rewire");

chai.use(require('chai-string'));

describe('getDeck middleware ', () => {

    var getDeckMw,
        mock,
        req,
        res;

    beforeEach(() => {
        mock = {
            findById : function() {
                return mock;
            },
            populate: function() {
                return mock;
            },
            exec: function(fn) {
                fn(null, {});
            }
        };
        getDeckMw = rewire("../../../middleware/deck/getDeck");
        getDeckMw.__set__('DeckModel', mock);

        req = {
            params : {}
        };
        res = {
            tpl: {
                error: []
            },
            sendStatus: function() {}
        };
    });

    it('deck should be found by id and its cards should be populated', (done) => {
        var findByIdSpy = sinon.spy(mock, 'findById');
        var populateSpy = sinon.spy(mock, 'populate');

        req.params.deckId = 7;
        getDeckMw.__set__('DeckModel', mock);

        getDeckMw()(req, res, () => {
            expect(findByIdSpy).to.have.property('calledOnce', true);
            expect(findByIdSpy.args[0][0]).to.equal(7);
            expect(populateSpy).to.have.property('calledOnce', true);
            expect(populateSpy.args[0][0]).to.equal('cards');

            done();
        });
    });

    it('result should be put in the response', (done) => {
        mock.exec= function(fn) {
            fn(null, {
                name: 'mock deck'
            });
        };

        getDeckMw()(req, res, () => {
            expect(res.tpl.deck).to.have.property('name', 'mock deck');

            done();
        });
    });

    it('deck not found should be logged, proper response code should be sent', (done) => {
        mock.exec= function(fn) {
            fn(null, null);
        };

        var consoleWarnSpy = sinon.spy(console, 'warn');
        var sendStatusSpy = sinon.spy(sendStatus);

        req.params.deckId = 7;
        res.sendStatus = sendStatusSpy;
        getDeckMw()(req, res);

        function sendStatus() {
            expect(consoleWarnSpy).to.have.property('calledOnce', true);
            expect(consoleWarnSpy.args[0][0]).to.endsWith('7');
            expect(sendStatusSpy).to.have.property('calledOnce', true);
            expect(sendStatusSpy.args[0][0]).to.equals(404);

            done();
            consoleWarnSpy.restore();
        }
    });

    it('any error should be logged, proper response code should be sent', (done) => {
        mock.exec= function(fn) {
            fn(new Error("ERROR1"));
        };

        var consoleWarnSpy = sinon.spy(console, 'warn');
        var sendStatusSpy = sinon.spy(sendStatus);

        res.sendStatus = sendStatusSpy;
        getDeckMw()(req, res);

        function sendStatus() {
            expect(consoleWarnSpy).to.have.property('calledOnce', true);
            expect(consoleWarnSpy.args[0][0].message).to.equals('ERROR1');
            expect(sendStatusSpy).to.have.property('calledOnce', true);
            expect(sendStatusSpy.args[0][0]).to.equals(404);

            done();
            consoleWarnSpy.restore();
        }
    });

});
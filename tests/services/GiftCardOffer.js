describe("Midway: GiftCardOfferService", function () {
    var tester;
    var auth;
    var cardOffer;
    var comment;
    var cardOfferId = '54dab21fd8c188f731cb8f34'

    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }

        tester = ngMidwayTester('MomAndPop.services');
        var $http = tester.inject('$http');
        auth = new FakeAuth($http);
    });

    it('create', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.create({
            businessId: '54c1b1a39d64e6006666aaab',
            businessName: 'name2',
            businessType: 'type2',
            businessAddress: 'address5',
            businessPicture: 'picture2',
            businessTelephone: '123-231',
            discount: 6,
            activationDateTime: new Date(),
            endDateTime: new Date(12,12,2016),
            description: 'description',
            status: 'DRAFT',
            totalQuantity: 20,
            availableQuantity: 10
        }, function (err, card) {
            expect(err).toBe(null);
            expect(card.businessId).toBe('54c1b1a39d64e6006666aaab');
            cardOffer = card;
            done();
        });
    });

    it('search', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.search({
            pageSize: 10,
            pageNumber: 1
        }, function (err, resp) {
            expect(err).toBe(null);
            done();
        });
    });

    it('get', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.get(cardOffer.id, function (err, offer) {
            expect(err).toBe(null);
            expect(cardOffer.id).toBe(offer.id);
            done();
        })
    });
    
    it('getGiftCardOffers', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.getGiftCardOffers([cardOffer.id, cardOfferId], function (err, offers) {
            expect(err).toBe(null);
            done();
        })
    });


    it('update', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.update(cardOffer, function (err, offer) {
            expect(err).toBe(null);
            done();
        })
    });

    it('cancel', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.cancel(cardOffer.id, function (err) {
            expect(err).toBe(null);
            done();
        })
    });

    it('delete', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.delete(cardOffer.id, function (err) {
            expect(err).toBe(null);
            cardOffer = null;
            done();
        })
    });

    it('getOwners', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.getOwners(cardOfferId, function (err, users) {
            expect(err).toBe(null);
            done();
        })
    });

    it('addComment', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.addComment(cardOfferId, {
            userId: auth.myId,
            giftCardOfferId: cardOfferId,
            comment: 'comment'
        }, function (err, _comment) {
            expect(err).toBe(null);
            comment = _comment;
            done();
        })
    });

    it('removeComment', function (done) {
        auth.loginAsFounder();
        var service = tester.inject('GiftCardOffer');

        service.removeComment(cardOfferId, comment.id, function (err, _comment) {
            expect(err).toBe(null);
            comment = null;
            done();
        })
    });
});

describe("Midway: GiftCardService", function () {
    var tester;
    var auth;

    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }

        tester = ngMidwayTester('MomAndPop.services');
        var $http = tester.inject('$http');
        auth = new FakeAuth($http);
    });

    it('get', function (done) {
        auth.loginAsFounder();

        var service = tester.inject('GiftCard');
        auth.loginAsFounder();

        service.get('54c1b1a39d64e6004475efdf', function (err, card) {
            expect(err).toBe(null);
            done();
        });
    });
});

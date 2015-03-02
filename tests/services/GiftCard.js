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

    it('create', function (done) {
        auth.loginAsFounder();
    });
});

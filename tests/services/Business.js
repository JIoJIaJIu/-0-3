describe("Midway: BusinessService", function () {
    var tester;

    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }

        tester = ngMidwayTester('MomAndPop.services');
        var $http = tester.inject('$http');
        var auth = new FakeAuth($http);
        auth.loginAsFounder();
    });

    it('getBusiness', function (done) {
        var service = tester.inject('Business');
        service.getBusiness('54c1b1a39d64e6006666aaab', function (err, business) {
            expect(err).toBe(null);
            expect(business.name).toBe("name2");
            expect(business.id).toBe("54c1b1a39d64e6006666aaab");
            expect(business.isTypePublic).toBe(true);
            done();
        });
    });

    it('getMyBusiness', function (done) {
        var service = tester.inject('Business');
        service.getMyBusiness(function (err, list) {
            var business = list[0];
            expect(err).toBe(null);
            expect(business.name).toBe("name2");
            expect(business.id).toBe("54c1b1a39d64e6006666aaab");
            expect(business.isTypePublic).toBe(true);
            done();
        });
    });


    it('getBusinessEmployees', function (done) {
        var service = tester.inject('Business');
        service.getBusinessEmployees(function (err, list) {
            expect(err).toBe(null);
            expect(list.items.length).toBe(2);
            var employer = list.items[0];
            expect(employer.firstName).toBe("test");
            done();
        });
    });

    var userId;

    it('addBusinessEmployee', function (done) {
        var service = tester.inject('Business');
        service.addBusinessEmployee({
            firstName: "test3",
            lastName: "Filipov",
            isFirstNamePublic: true,
            email: "mine@com.ru",
            password: 123
        }, function (err, user) {
            expect(err).toBe(null);
            userId = user._id;
            done();
        });
    });

    it('deleteBusinessEmployee', function (done) {
        var service = tester.inject('Business');
        service.deleteBusinessEmployee(userId, function (err, user) {
            expect(err).toBe(null);
            delete userId;
            done();
        });
    });
});

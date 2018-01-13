describe('Root API Route', function() {
    describe("GET /", function() {
        it('response 200 status code', function(done) {
            request.get('/')
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
        });
        it('json response', function(done) {
            request.get('/')
                .end(function(err, res) {
                    expect(res).to.be.json;
                    done(err);
                });
        });
        it('docmentation link in response', function(done) {
            request.get('/')
                .end(function(err, res) {
                    expect(res.body.apiDocumentation).to.equal("https://github.com/UWEC-ITC/parkingNotifier-API");
                    done(err);
                });
        });
        it('valid timestamp', function(done) {
            request.get('/')
                .end(function(err, res) {
                    setTimeout(function() {
                        expect(res.body.timestamp).to.be.below(new Date().valueOf());
                    }, 1000);
                    done(err);
                });
        });
    });
});
describe('HTTP ERROR TEST', function() {
    describe("GET /invalidPath", function() {
        it('sends 404 status', function(done) {
            request.get('/invalidPath')
                .expect(404)
                .end(function(err, res) {
                    done(err);
                });
        });
    });
});
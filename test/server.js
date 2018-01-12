describe('Root API Route', function() {
    describe("GET /", function() {
        it('returns the API info', function(done) {
            request.get('/')
                .expect(200)
                .end(function(err, res) {
                    expect(res).to.be.json;
                    done(err);
                });
        });
    });
});
describe('HTTP ERROR TEST', function() {
    describe("GET /invalidPath", function() {
        it('sends 404 statusa', function(done) {
            request.get('/invalidPath')
                .expect(404)
                .end(function(err, res) {
                    done(err);
                });
        });
    });
});
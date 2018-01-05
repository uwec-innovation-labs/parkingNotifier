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
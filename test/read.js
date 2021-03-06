
var objectstream = require('..'),
    path = require('path'),
    fs = require('fs');

exports['read number from object stream'] = function (test) {
    test.expect(1);
    var stream = new process.EventEmitter();
    var objst = objectstream.createStream(stream);

    objst.on('data', function (data) { test.equal(data, 4); });
    objst.on('end', function () { test.done(); });

    stream.emit('data', "4\n");
    stream.emit('end');
};

exports['read two numbers from object stream'] = function (test) {
    test.expect(2);
    var expected = 1;

    var stream = new process.EventEmitter();
    var objst = objectstream.createStream(stream);

    objst.on('data', function (data) {
        test.equal(data, expected++);
    });

    objst.on('end', function () { test.done(); });

    stream.emit('data', "1\n2\n");
    stream.emit('end');
};

exports['read string from object stream'] = function (test) {
    test.expect(1);

    var stream = new process.EventEmitter();

    var objst = objectstream.createStream(stream);

    objst.on('data', function (data) {
        test.equal(data, "foo");
    });

    objst.on('end', function () { test.done(); });

    stream.emit('data', '"foo"\n');
    stream.emit('end');
};

exports['read object from object stream'] = function (test) {
    test.expect(3);

    var stream = new process.EventEmitter();
    var objst = objectstream.createStream(stream);

    objst.on('data', function (data) {
        test.ok(data);
        test.equal(data.x, 1);
        test.equal(data.y, 2);
    });

    objst.on('end', function () { test.done(); });

    stream.emit('data', '{"x":1,');
    stream.emit('data', '"y":2}\n');
    stream.emit('end');
};

exports['read objects from file'] = function (test) {
    test.expect(9);

    var stream = fs.createReadStream(path.join(__dirname, 'objects.txt'));
    var objst = objectstream.createStream(stream);
    var expected = 1;

    objst.on('data', function (data) {
        test.ok(data);
        test.ok(data.name);
        test.equal(data.value, expected++);
    });

    objst.on('end', function () { test.done(); });
};


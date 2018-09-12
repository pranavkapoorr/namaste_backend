var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    //create
    app.post('/user', (req, res) => {
        const user =  req.body;
        db.collection('users').insert(user, (err, result) => {
            if (err) { 
                console.log(err);
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    //retreive by id
    app.get('/users/uid/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                    res.send(item!=null?item:"User doesn't exist!");
            }
        });
    });
    //retrieve by number
    app.get('/users/uphone/:phone', (req, res) => {
        const phone = req.params.phone;
        const details = { 'phone': phone };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                    res.send(item!=null?item:"User doesn't exist!");
            }
        });
    });
    //retreive all
    app.get('/users/all', (req, res) => {
        db.collection('users').find({}).toArray((err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                    res.send(item!=null?item:"User doesn't exist!");
            }
        });
    });
    //update
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = req.body;
        db.collection('users').update(details, user, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(result);
          } 
        });
      });
      //delete
      app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('user ' + id + ' deleted!');
          } 
        });
      });
      app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
      });      
};
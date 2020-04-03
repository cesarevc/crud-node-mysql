const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            // console.log(customers);
            res.render('customers', {
                data: customers
            });
        });
    });
    // res.send('hello world');
};


controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            console.log(customer);
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            res.render('customer_edit', {
                data: customer[0]
            });

        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const updateCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [updateCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id= ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};


module.exports = controller;
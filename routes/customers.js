var express = require('express');
var router = express.Router();
var models = require("../models");

router.get("/", function(req, res, next) {
    models.customer.findAll().then(function(customers) {
	res.render("customers/customers", {
	    page_title: "Customers",
	    data: customers
	});
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    sequelizeerror: errors
	});
    });
});

router.get("/:id/customercontacts", function(req, res, next) {
    models.customer.findById(req.params.id,{include: [{model: models.contact}]}).then(function(customers) {
	res.render("contacts/contacts", {
	    page_title: "Contacts working for "+customers.name,
	    contact: true,
	    data: customers.contacts,
	    customerId: customers.id
	});
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });

});


router.get("/add",function(req, res){
    res.render('customers/add_customers',{page_title:"Add Customers"});
});



router.post("/", function(req, res, next) {
    var customer = req.body;
    models.customer.create(customer).then(function(customer) {
	res.redirect('/customers');
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });
});

router.get("/edit/:id",function(req, res, next){
    models.customer.findById(req.params.id).then(function(customers) {
	res.render('customers/edit_customers',{page_title:"Edit Customers",data:customers});
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });

});

router.post("/:id", function(req, res, next) {
    var customer = req.body;
    models.customer.findById(req.params.id).then(function(oldcustomer) {
	oldcustomer.update(customer);
	res.redirect('/customers');
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });
});

router.get("/delete/:id", function(req,res,nest){    
    models.customer.destroy({ where: {id: req.params.id}}).then(function(result) {
	res.redirect('/customers');
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });

});

module.exports = router;
